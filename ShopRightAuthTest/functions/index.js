const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");
const sharp = require("sharp");

// Initialize Firebase Admin SDK
admin.initializeApp();

// Convert inches to pixels (100 pixels per inch)
function inchesToPixels(inches) {
    return Math.round(inches * 50);
}

async function getImageURLFromUPC(UPC) {
    try {
        const apiUrl = `https://api.barcodelookup.com/v3/products?barcode=${UPC}&key=f3eiuy5v6ujhiyhobj121o8241iuvf`;
        const response = await axios.get(apiUrl);
        const products = response.data.products;
        
        if (products && products.length > 0) {
            const images = products[0].images;
            if (images && images.length > 0) {
                return images[0];
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

        // Create a sharp image
        const image = sharp(response.data);

        // Try to get metadata
        let metadata;
        try {
            metadata = await image.metadata();
        } catch (metaError) {
            console.warn(`Unable to retrieve metadata for URL: ${url}`, metaError.message);
            metadata = { width: null, height: null, channels: 3 }; // Fallback
        }

        // Validate metadata dimensions
        const { width, height, channels } = metadata;
        if (!width || !height) {
            throw new Error("Invalid or unsupported image format.");
        }

        // Ensure 4 channels (RGBA)
        const rgbaImage = image.ensureAlpha();

        const { data } = await rgbaImage.raw().toBuffer({ resolveWithObject: true });
        const expectedLength = width * height * 4;

        if (data.length !== expectedLength) {
            throw new Error(
                `Buffer size mismatch: Expected ${expectedLength}, got ${data.length}.`
            );
        }

        // Make white background transparent
        const transparentData = Buffer.alloc(expectedLength);
        for (let i = 0; i < data.length; i += 4) {
            const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
            const isWhite = r > 240 && g > 240 && b > 240; // Adjust threshold as needed
            transparentData[i] = r; // Red
            transparentData[i + 1] = g; // Green
            transparentData[i + 2] = b; // Blue
            transparentData[i + 3] = isWhite ? 0 : a; // Alpha
        }

        return sharp(transparentData, {
            raw: {
                width,
                height,
                channels: 4,
            },
        }).png();
    } catch (error) {
        console.error(`Error processing image from URL: ${url}`, error.message);
        return null;
    }
}

async function uploadImageToStorage(imageBuffer, fileName) {
    const bucket = admin.storage().bucket();
    const file = bucket.file(fileName);

    // Save the file
    await file.save(imageBuffer, {
        contentType: 'image/png',
        metadata: {
            cacheControl: 'public, max-age=31536000', 
        },
    });
    await file.makePublic();
    return `https://storage.googleapis.com/${bucket.name}/${file.name}`;
}

exports.createPlanogram_Test_2 = functions.https.onRequest(async (req, res) => {
    try {
        if (req.method !== "POST") {
            return res.status(405).send("Only POST method is allowed");
        }

        const data = req.body;
        const { name, department, shelfHeight, shelfWidth, allRowsData } = data;

        if (!name || !department) {
            return res.status(400).send("Name and department fields are required");
        }

        const canvasWidth = inchesToPixels(shelfWidth);
        const canvasHeight = inchesToPixels(shelfHeight);
        const background = createCanvas(canvasWidth, canvasHeight);

        const composites = [];
        let currentPosition = { x: 0, y: 0 };

        for (const row of allRowsData) {
            const rowHeight = Math.max(...row.map(p => p.productHeight));

            for (const product of row) {
                const { productWidth, productHeight, numberFacing, UPC } = product;

                const imageUrl = await getImageURLFromUPC(UPC);
                if (!imageUrl) continue;

                const productImage = await openImageFromURL(imageUrl);
                if (!productImage) continue;

                const resizedImage = await productImage
                    .resize(inchesToPixels(productWidth), inchesToPixels(productHeight))
                    .toBuffer();

                for (let i = 0; i < numberFacing; i++) {
                    composites.push({
                        input: resizedImage,
                        top: currentPosition.y,
                        left: currentPosition.x,
                    });

                    currentPosition.x += inchesToPixels(productWidth);
                }
            }

            currentPosition.y += inchesToPixels(rowHeight);
            currentPosition.x = 0;
        }

        // Generate the final planogram image
        const outputImageBuffer = await background.composite(composites).png().toBuffer();

        // Debugging: Save locally
        const fs = require("fs");
        fs.writeFileSync("/tmp/debug-image.png", outputImageBuffer);

        // Upload the image to Firebase Storage
        const fileName = `planogram-${name}-${department}.png`;
        const imageUrl = await uploadImageToStorage(outputImageBuffer, fileName);

        return res.status(200).json({ imageUrl });
    } catch (error) {
        console.error("Error in function:", error.message);
        return res.status(500).send("Internal Server Error");
    }
});
