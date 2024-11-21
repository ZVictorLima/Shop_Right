const axios = require("axios");
const sharp = require("sharp");
const fs = require("fs");

// Convert inches to pixels (100 pixels per inch)
function inchesToPixels(inches) {
    return Math.round(inches * 100);
}

async function getImageURLFromUPC(UPC) {
    try {
        const apiUrl = `https://api.upcitemdb.com/prod/trial/lookup?upc=${UPC}`;
        const response = await axios.get(apiUrl);

        if (response.data.code === "OK" && response.data.items.length > 0) {
            const images = response.data.items[0].images;
            if (images && images.length > 0) {
                return images[0]; // Return the first image URL
            }
        }
        console.warn(`No images found for UPC: ${UPC}`);
        return null;
    } catch (error) {
        console.error(`Error fetching data for UPC ${UPC}:`, error.message);
        return null;
    }
}

function createCanvas(width, height) {
    return sharp({
        create: {
            width: width,
            height: height,
            channels: 4,
            background: { r: 0, g: 0, b: 0, alpha: 0 }, // Transparent background
        },
    });
}

// Download and process an image from a URL
async function openImageFromURL(url) {
    try {
        const response = await axios({ url, responseType: "arraybuffer" });
        return sharp(response.data); // Create a sharp image from the response data
    } catch (error) {
        console.error(`Error loading image from URL: ${url}`, error.message);
        return null;
    }
}

async function main() {
    const jsonFile = "sodaExample.json";
    const data = JSON.parse(fs.readFileSync(jsonFile, "utf8"));

    const totalHeight = data.totalHeight;
    const totalWidth = data.totalWidth;
    const shelfArray = data.shelfArray;

    const canvasWidth = inchesToPixels(totalWidth);
    const canvasHeight = inchesToPixels(totalHeight);

    let background = createCanvas(canvasWidth, canvasHeight);

    const composites = []; // Store all the composite operations
    let currentPosition = { x: 0, y: 0 };

    for (const row of shelfArray) {
        const rowHeight = row.shelfHeight;
        const products = row.products;

        for (const product of products) {
            const productAmount = product.productAmount;
            const prodWidth = product.prodWidth;
            const prodHeight = product.prodHeight;
            const UPC = product.UPC;

            const imageUrl = await getImageURLFromUPC(UPC);
            if (!imageUrl) {
                console.warn(`Skipping product with missing image for UPC: ${UPC}`);
                continue;
            }

            const productImage = await openImageFromURL(imageUrl);
            if (!productImage) {
                console.warn(`Skipping product with invalid image for UPC: ${UPC}`);
                continue;
            }

            const resizedImage = await productImage
                .resize(inchesToPixels(prodWidth), inchesToPixels(prodHeight))
                .toBuffer();

            for (let i = 0; i < productAmount; i++) {
                composites.push({
                    input: resizedImage,
                    top: currentPosition.y,
                    left: currentPosition.x,
                });

                currentPosition.x += inchesToPixels(prodWidth);
            }
        }

        currentPosition.y += inchesToPixels(rowHeight);
        currentPosition.x = 0; // Reset x position at the end of each row
    }

    await background.composite(composites).toFile("output.png");
    console.log("Planogram saved as output.png");
}

main().catch((error) => console.error("Error in main function:", error.message));
