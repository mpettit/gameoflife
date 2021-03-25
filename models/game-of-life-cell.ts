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

        const rowGreaterThanZero = cellRow > 0;
        const rowLessThanMax = cellRow < environmentHeight - 1;
        const columnGreaterThanZero = cellColumn > 0;
        const columnLessThanMax = cellColumn < environmentWidth - 1;

        this._neighbors = [
            rowGreaterThanZero && columnGreaterThanZero ? [this._row - 1, this._column - 1] : undefined,
            rowGreaterThanZero ? [this._row - 1, this._column] : undefined,
            rowGreaterThanZero && columnLessThanMax ? [this._row - 1, this._column + 1] : undefined,
            columnLessThanMax ? [this._row, this._column + 1] : undefined,
            rowLessThanMax && columnLessThanMax ? [this._row + 1, this._column + 1] : undefined,
            rowLessThanMax ? [this._row + 1, this._column] : undefined,
            rowLessThanMax && columnGreaterThanZero ? [this._row + 1, this._column - 1] : undefined,
            columnGreaterThanZero ? [this._row, this._column - 1] : undefined,
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
