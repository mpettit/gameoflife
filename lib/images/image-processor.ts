import { EnvironmentCoordinate } from '../../models/gameoflife/game-of-life-cell';

const RED_GREYSCALE_WEIGHT = 0.299;
const GREEN_GREYSCALE_WEIGHT = 0.587;
const BLUE_GREYSCALE_WEIGHT = 0.114;
const ALLOWED_SRC_TYPES = ['jpg', 'jpeg', 'png'];

export interface ImageCoordinateArrayData {
    initialAliveCoordinates: EnvironmentCoordinate[];
    initialVisitedCoordinates: EnvironmentCoordinate[];
    height: number;
    width: number;
}

export function convertImageToCoordinateArray(
    srcOrFile: string | File,
    targetHeight: number,
    targetWidth: number,
    matchImageAspectRatio = false
): Promise<ImageCoordinateArrayData> {
    return getImageData(srcOrFile, targetHeight, targetWidth, matchImageAspectRatio).then(
        (loadedImageData: { imageData: ImageData; height: number; width: number }) => {
            const { imageData, width, height } = loadedImageData;
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

            return { initialAliveCoordinates: aliveCoords, initialVisitedCoordinates: visitedCoords, height, width };
        }
    );
}

function getImageData(
    srcOrFile: string | File,
    targetHeight: number,
    targetWidth: number,
    matchImageAspectRatio: boolean
): Promise<{ imageData: ImageData; height: number; width: number }> {
    return getImage(srcOrFile).then((image: HTMLImageElement) => {
        const originalHeight = image.height;
        const originalWidth = image.width;
        const adjustedTargetHeight = matchImageAspectRatio ? Math.round((originalHeight / originalWidth) * targetWidth) : targetHeight;

        // set up a canvas for image
        const tempCanvas = document.createElement('canvas');
        tempCanvas.height = adjustedTargetHeight;
        tempCanvas.width = targetWidth;

        //convert to image data array
        const tempContext = tempCanvas.getContext('2d');
        if (tempContext) {
            const widthScalar = targetWidth / originalWidth;
            const heightScalar = adjustedTargetHeight / originalHeight;

            tempContext.scale(widthScalar, heightScalar);
            tempContext.drawImage(image, 0, 0);
            const imageData = tempContext.getImageData(0, 0, targetWidth, adjustedTargetHeight);

            return { imageData, height: adjustedTargetHeight, width: targetWidth };
        }

        throw Error('Can not convert image!');
    });
}

function getImage(srcOrFile: string | File): Promise<HTMLImageElement> {
    if (typeof srcOrFile === 'string') {
        return getImageFromSrc(srcOrFile);
    } else {
        return getImageFromFile(srcOrFile);
    }
}

function getImageFromFile(file: File): Promise<HTMLImageElement> {
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

function getImageFromSrc(src: string): Promise<HTMLImageElement> {
    const image = new Image();
    const splitSrc = src.split('.');
    const fileExtension = splitSrc.length > 0 ? splitSrc[splitSrc.length - 1] : '';
    if (ALLOWED_SRC_TYPES.includes(fileExtension)) {
        image.crossOrigin = 'anonymous';
    }
    return new Promise((resolve, reject) => {
        try {
            image.src = src;
            image.onload = function () {
                resolve(image);
            };
            image.onerror = function () {
                reject('Cannot load image');
            };
        } catch (e) {
            reject(e);
        }
    });
}
