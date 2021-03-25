import { EnvironmentCoordinate } from '../../models/game-of-life-cell';

const RED_GREYSCALE_WEIGHT = 0.299;
const GREEN_GREYSCALE_WEIGHT = 0.587;
const BLUE_GREYSCALE_WEIGHT = 0.114;

export function convertImageToCoordinateArray(
    imageFile: File,
    targetHeight: number,
    targetWidth: number
): Promise<{ initialAliveCoordinates: EnvironmentCoordinate[]; initialVisitedCoordinates: EnvironmentCoordinate[] }> {
    return getImageData(imageFile, targetHeight, targetWidth).then((imageData: ImageData) => {
        const aliveCoords: EnvironmentCoordinate[] = [];
        const visitedCoords: EnvironmentCoordinate[] = [];
        const greyScaleValues = Array.from(Array(targetHeight), () => Array(targetWidth).fill(0));
        for (let i = 0; i < imageData.data.length; i += 4) {
            const row = Math.floor(i / (imageData.width * 4));
            const column = Math.floor((i % (imageData.width * 4)) / 4);
            const greyScaleValue =
                RED_GREYSCALE_WEIGHT * imageData.data[i] +
                GREEN_GREYSCALE_WEIGHT * imageData.data[i + 1] +
                BLUE_GREYSCALE_WEIGHT * imageData.data[i + 2];

            if (greyScaleValue < 125) {
                // consider darkest pixels alive
                aliveCoords.push([row, column]);
            } else if (greyScaleValue < 170) {
                //consider medium dark pixels visited
                visitedCoords.push([row, column]);
            }
            // all other pixels will be considered dead

            if (row < targetHeight && column < targetWidth) {
                greyScaleValues[row][column] = greyScaleValue;
            }
        }

        return { initialAliveCoordinates: aliveCoords, initialVisitedCoordinates: visitedCoords };
    });
}

function getImage(file: File): Promise<HTMLImageElement> {
    const reader = new FileReader();
    const image = new Image();
    return new Promise((resolve, reject) => {
        try {
            reader.onload = function () {
                // file is loaded
                image.src = reader.result as string;
                image.onload = function () {
                    resolve(image);
                };
            };
            reader.readAsDataURL(file);
        } catch (e) {
            reject(e);
        }
    });
}

function getImageData(file: File, targetHeight: number, targetWidth: number): Promise<ImageData> {
    return getImage(file).then((image: HTMLImageElement) => {
        // set up a canvas for image
        const tempCanvas = document.createElement('canvas');
        tempCanvas.height = targetHeight;
        tempCanvas.width = targetWidth;

        //convert to image data array
        const tempContext = tempCanvas.getContext('2d');
        if (tempContext) {
            const widthScalar = targetWidth / image.width;
            const heightScalar = targetHeight / image.height;

            tempContext.scale(widthScalar, heightScalar);
            tempContext.drawImage(image, 0, 0);
            tempContext.scale(widthScalar, heightScalar);

            return tempContext.getImageData(0, 0, targetWidth, targetHeight);
        }

        throw Error('Can not convert image!');
    });
}
