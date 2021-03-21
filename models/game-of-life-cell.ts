export type GameBoardCoordinate = [number, number];

export class GameofLifeCell {

    private _isAlive: boolean;
    private _neighbors: GameBoardCoordinate[];

    constructor(isAlive: boolean, coordinates: GameBoardCoordinate, boardDimensions: GameBoardCoordinate) {

        this._isAlive = isAlive;

        const [row, column] = coordinates;
        const [rowSize, columnSize] = boardDimensions;

        const rowGreaterThanZero = row > 0;
        const rowLessThanMax = row < rowSize - 1;
        const columnGreaterThanZero = column > 0;
        const columnLessThanMax = column < columnSize - 1;

        this._neighbors = [
            (rowGreaterThanZero && columnGreaterThanZero) ? [row-1, column-1] : undefined,
            rowGreaterThanZero ? [row-1, column] : undefined,
            (rowGreaterThanZero && columnLessThanMax) ? [row-1, column+1] : undefined,
            columnLessThanMax ? [row, column+1] : undefined,
            (rowLessThanMax && columnLessThanMax) ? [row+1, column+1] : undefined,
            rowLessThanMax ? [row+1, column] : undefined,
            (rowLessThanMax && columnGreaterThanZero) ? [row+1, column-1] : undefined,
            columnGreaterThanZero ? [row, column-1] : undefined,
        ].filter(coordinate => coordinate !== undefined);
    }

    isAlive(): boolean {
        return this._isAlive;
    }

    setIsAlive(isAlive: boolean): void {
        this._isAlive = isAlive;
    }

    getNeighborCoordinates(): GameBoardCoordinate[] {
        return this._neighbors;
    }


}