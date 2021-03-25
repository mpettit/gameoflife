import { GameOfLifeCellSettings } from './game-of-life-settings';

export type EnvironmentCoordinate = [number, number];

export class GameofLifeCell {
    private _isAlive: boolean;
    private _nextIsAlive: boolean;
    private _isVisited: boolean;
    private _requiresRedraw: boolean;
    private _cellSettings: GameOfLifeCellSettings;
    private readonly _row: number;
    private readonly _column: number;
    private readonly _neighbors: EnvironmentCoordinate[];

    constructor(
        cellRow: number,
        cellColumn: number,
        environmentHeight: number,
        environmentWidth: number,
        cellSettings: GameOfLifeCellSettings
    ) {
        this._isAlive = false;
        this._nextIsAlive = false;
        this._isVisited = false;
        this._requiresRedraw = true;
        this._cellSettings = cellSettings;
        this._row = cellRow;
        this._column = cellColumn;

        const { wrapBorders } = cellSettings;
        const rowMinusOne = wrapBorders ? (this._row + environmentHeight - 1) % environmentHeight : this._row - 1;
        const rowPlusOne = wrapBorders ? (this._row + 1) % environmentHeight : this._row + 1;
        const columnMinusOne = wrapBorders ? (this._column + environmentWidth - 1) % environmentWidth : this._column - 1;
        const columnPlusOne = wrapBorders ? (this._column + 1) % environmentWidth : this._column + 1;

        const rowGreaterThanZero = rowMinusOne >= 0;
        const rowLessThanMax = rowPlusOne < environmentHeight;
        const columnGreaterThanZero = columnMinusOne >= 0;
        const columnLessThanMax = columnPlusOne < environmentWidth;

        this._neighbors = [
            rowGreaterThanZero && columnGreaterThanZero ? [rowMinusOne, columnMinusOne] : undefined, // top left
            rowGreaterThanZero ? [rowMinusOne, this._column] : undefined, // top
            rowGreaterThanZero && columnLessThanMax ? [rowMinusOne, columnPlusOne] : undefined, // top right
            columnLessThanMax ? [this._row, columnPlusOne] : undefined, // right
            rowLessThanMax && columnLessThanMax ? [rowPlusOne, columnPlusOne] : undefined, // bottom right
            rowLessThanMax ? [rowPlusOne, this._column] : undefined, // bottom
            rowLessThanMax && columnGreaterThanZero ? [rowPlusOne, columnMinusOne] : undefined, // bottom left
            columnGreaterThanZero ? [this._row, columnMinusOne] : undefined, // left
        ].filter((coordinate) => coordinate !== undefined) as EnvironmentCoordinate[];
    }

    isAlive(): boolean {
        return this._isAlive;
    }

    setNextIsAlive(nextIsAlive: boolean): void {
        //wont take effect until next evolution cycle triggered via .evolve()
        this._nextIsAlive = nextIsAlive;
    }

    setIsVisited(isVisited: boolean): void {
        this._isVisited = isVisited;
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

    draw(context: CanvasRenderingContext2D | null): void {
        // only draw differences
        if (context && this._requiresRedraw) {
            const cellSize = this._cellSettings.cellSize;
            context.fillStyle = this.getCellColor();
            context.fillRect(this._column * cellSize, this._row * cellSize, cellSize, cellSize);
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
