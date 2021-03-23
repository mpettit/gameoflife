import { GameOfLifeCellSettings } from './game-of-life-settings';

export type EnvironmentCoordinate = [number, number];

export class GameofLifeCell {
    private _isAlive: boolean;
    private _nextIsAlive: boolean;
    private _isVisited: boolean;
    private _requiresRedraw: boolean;
    private _cellSettings: GameOfLifeCellSettings;
    private readonly _coordinates: EnvironmentCoordinate;
    private readonly _neighbors: EnvironmentCoordinate[];

    constructor(
        coordinates: EnvironmentCoordinate,
        environmentDimensions: EnvironmentCoordinate,
        cellSettings: GameOfLifeCellSettings
    ) {
        this._isAlive = false;
        this._nextIsAlive = false;
        this._isVisited = false;
        this._requiresRedraw = false;
        this._cellSettings = cellSettings;
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

    setNextIsAlive(nextIsAlive: boolean): void {    //wont take effect until next evolution cycle triggered via .evolve()
        this._nextIsAlive = nextIsAlive;
    }

    evolve(): void {
        this._requiresRedraw = this._nextIsAlive !== this._isAlive;
        this._isAlive = this._nextIsAlive;
        this._isVisited = this._isVisited || this._nextIsAlive;
    }

    isVisited(): boolean {
        return this._isVisited;
    }

    getNeighborCoordinates(): EnvironmentCoordinate[] {
        return this._neighbors;
    }

    draw(context: CanvasRenderingContext2D): void {
        const [row, column] = this._coordinates;
        if (this._requiresRedraw) {             // only draw differences
            const cellSize = this._cellSettings.cellSize;
            context.fillStyle = this.getCellColor();
            context.fillRect(row * cellSize, column * cellSize, cellSize, cellSize);
        }
    }

    private getCellColor(): string {
        if (this._isAlive) {
            return this._cellSettings.aliveColor;
        } else if (this._cellSettings.showVisited && this._isVisited) {
            return this._cellSettings.visitedColor;
        }
        return this._cellSettings.deadColor;
    }
}
