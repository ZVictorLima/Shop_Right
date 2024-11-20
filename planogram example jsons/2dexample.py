# Very hacky 2d projection alogrith proof of concept. Opens an image of a 2d planogram on your screen.
# rn just reads the plan from sodaExample.json

import requests
import json
from PIL import Image
from bs4 import BeautifulSoup

jsonFile = 'sodaExample.json'

def inchesToPixels(inches):
    return int(inches*100)

def getImageURLFromUPC(UPC: int):
    upcString = str(UPC)
    r = requests.get("https://www.upcitemdb.com/upc/" + upcString)
    soup = BeautifulSoup(r.content, 'html.parser')
    s = soup.find('img', class_='product')
    return s['src']

def openImageFromURL(url):
    response = requests.get(url, stream=True)
    response.raise_for_status()  # Raise an exception for bad status codes

    img = Image.open(response.raw)
    return img

def fuzz_trim(image, fuzz_percent=10):
    """
    Trims an image by removing borders that are similar to the top-left pixel's color,
    with a specified fuzziness percentage.
    """
    # Open the image
    image = image.convert("RGBA")
    
    # Get the background color (top-left pixel)
    bg_color = image.getpixel((0, 0))
    
    # Calculate the fuzz threshold
    fuzz_threshold = int(fuzz_percent / 100 * 255)

    def is_within_fuzz(pixel, reference, threshold):
        # Compare each channel's value to determine if within the fuzz range
        return all(abs(pixel[i] - reference[i]) <= threshold for i in range(3))  # Ignore alpha channel

    # Create a mask where non-background pixels are highlighted
    mask = Image.new("1", image.size)  # Binary image (1 bit per pixel)
    for x in range(image.width):
        for y in range(image.height):
            if not is_within_fuzz(image.getpixel((x, y)), bg_color, fuzz_threshold):
                mask.putpixel((x, y), 1)  # Non-background pixels set to 1 (white in mask)

    # Find the bounding box of the mask
    bbox = mask.getbbox()
    if bbox:
        # Crop the original image to this bounding box
        image = image.crop(bbox)

    # Save the result
    return image

with open(jsonFile, 'r') as file:
    data = json.load(file)

totalHeight = data["totalHeight"]
totalWidth = data["totalWidth"]
shelfArray = data["shelfArray"]
numOfRows = len(shelfArray)

background = Image.new("RGB", (inchesToPixels(totalWidth), inchesToPixels(totalHeight)), (255, 255, 255))
#background.show()

currentPosition = (0,0)

for row in shelfArray:
    rowHeight = row["shelfHeight"]
    products = row["products"]


    for product in products:
        productAmount = product["productAmount"]
        prodWidth = product["prodWidth"]
        prodHeight = product["prodHeight"]
        UPC = product["UPC"]
        
        imageUrl = getImageURLFromUPC(UPC)
        prodImage = openImageFromURL(imageUrl)
        prodImage = fuzz_trim(prodImage)
        prodImage = prodImage.resize((inchesToPixels(prodWidth), inchesToPixels(prodHeight)))  # Fix: Assign resized image

        for i in range(0, productAmount):
            background.paste(prodImage, currentPosition, mask = prodImage)
            currentPosition = (currentPosition[0] + inchesToPixels(prodWidth), currentPosition[1])
            print(f"Current position: {currentPosition}")

    currentPosition = (0, currentPosition[1] + inchesToPixels(rowHeight))

background.show()