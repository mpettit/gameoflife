import { GameOfLifeCellOptions } from "./game-of-life-options";

export type EnvironmentCoordinate = [number, number];

export class GameofLifeCell {

    private _isAlive: boolean;
    private _isVisited: boolean;
    private _cellOptions: GameOfLifeCellOptions;
    private readonly _context: fabric.StaticCanvas[];
    private readonly _coordinates: EnvironmentCoordinate;
    private readonly _neighbors: EnvironmentCoordinate[];

    constructor(context: fabric.StaticCanvas, isAlive: boolean, coordinates: EnvironmentCoordinate, environmentDimensions: EnvironmentCoordinate, cellOptions: GameOfLifeCellOptions) {

        this._context = context
        this._isAlive = isAlive;
        this._isVisited = isAlive;
        this._cellOptions = cellOptions;
        this._coordinates = coordinates;

        const [row, column] = coordinates;
        const [rowSize, columnSize] = environmentDimensions;

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
        this._isVisited = this._isVisited || isAlive;
    }

    isVisited(): boolean {
        return this._isVisited;
    }

    getNeighborCoordinates(): EnvironmentCoordinate[] {
        return this._neighbors;
    }

    draw(): void {
        //TODO: need to clear canvas or render??

        const [row, column] = this._coordinates;
        if (this.isAlive() || this.isVisited()) {

            const cellColor = this.isAlive() ? this._cellOptions.aliveColor : this._cellOptions.visitedColor;
            const rect = new fabric.Rect({
                top: row,
                left: column,
                fill: cellColor,
                width: 1,
                height: 1,
                objectCaching: false,
            });
            this._context.add(rect);
        }
    }


}