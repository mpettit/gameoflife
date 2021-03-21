import { GameOfLifeCellOptions } from './game-of-life-options';

export type EnvironmentCoordinate = [number, number];

export class GameofLifeCell {
    private _isAlive: boolean;
    private _prevIsAlive: boolean;
    private _isVisited: boolean;
    private _cellOptions: GameOfLifeCellOptions;
    private readonly _coordinates: EnvironmentCoordinate;
    private readonly _neighbors: EnvironmentCoordinate[];

    constructor(
        isAlive: boolean,
        coordinates: EnvironmentCoordinate,
        environmentDimensions: EnvironmentCoordinate,
        cellOptions: GameOfLifeCellOptions
    ) {
        this._isAlive = isAlive;
        this._prevIsAlive = false;
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
            rowGreaterThanZero && columnGreaterThanZero ? [row - 1, column - 1] : undefined,
            rowGreaterThanZero ? [row - 1, column] : undefined,
            rowGreaterThanZero && columnLessThanMax ? [row - 1, column + 1] : undefined,
            columnLessThanMax ? [row, column + 1] : undefined,
            rowLessThanMax && columnLessThanMax ? [row + 1, column + 1] : undefined,
            rowLessThanMax ? [row + 1, column] : undefined,
            rowLessThanMax && columnGreaterThanZero ? [row + 1, column - 1] : undefined,
            columnGreaterThanZero ? [row, column - 1] : undefined,
        ].filter((coordinate) => coordinate !== undefined);
    }

    isAlive(): boolean {
        return this._isAlive;
    }

    setIsAlive(isAlive: boolean): void {
        this._prevIsAlive = this._isAlive;
        this._isAlive = isAlive;
        this._isVisited = this._isVisited || isAlive;
    }

    isVisited(): boolean {
        return this._isVisited;
    }

    getNeighborCoordinates(): EnvironmentCoordinate[] {
        return this._neighbors;
    }

    draw(context: CanvasRenderingContext2D): void {
        const [row, column] = this._coordinates;
        if (this._isAlive != this._prevIsAlive) {
            // only draw differences
            const cellSize = this._cellOptions.cellSize;
            context.fillStyle = this.getCellColor();
            context.fillRect(row * cellSize, column * cellSize, cellSize, cellSize);
            this._prevIsAlive = this._isAlive;
        }
    }

    private getCellColor(): string {
        if (this._isAlive) {
            return this._cellOptions.aliveColor;
        } else if (this._cellOptions.showVisited && this._isVisited) {
            return this._cellOptions.visitedColor;
        }
        return this._cellOptions.deadColor;
    }
}
