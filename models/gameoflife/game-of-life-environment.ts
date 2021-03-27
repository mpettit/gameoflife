import { GameofLifeCell } from './game-of-life-cell';
import { GameOfLifeSettings } from './game-of-life-settings';
import { EnvironmentCoordinate } from '../models/game-of-life-cell';

export class GameOfLifeEnvironment {
    private _cells: GameofLifeCell[];
    private _generation: number;
    private readonly _context: CanvasRenderingContext2D | undefined;
    private readonly _height: number;
    private readonly _width: number;
    private readonly _canvasHeight: number;
    private readonly _canvasWidth: number;

    constructor(environmentSettings: GameOfLifeSettings, context?: CanvasRenderingContext2D) {
        const height = environmentSettings.environmentHeight;
        const width = environmentSettings.environmentWidth;
        const cellSize = environmentSettings.cellSettings.cellSize;
        this._context = context;
        this._height = height;
        this._width = width;
        this._canvasHeight = height * cellSize;
        this._canvasWidth = width * cellSize;
        this._generation = 0;
        this._cells = [];

        for (let rowIndex = 0; rowIndex < height; rowIndex++) {
            for (let colIndex = 0; colIndex < width; colIndex++) {
                this._cells.push(new GameofLifeCell(rowIndex, colIndex, height, width, environmentSettings.cellSettings));
            }
        }
        this.applyInitialCoordinates(environmentSettings.initialAliveCoordinates, environmentSettings.initialVisitedCoordinates);
    }

    getGeneration(): number {
        return this._generation;
    }

    evolve(redraw?: boolean): void {
        this._cells = this._cells
            .map((cell) => {
                const aliveNeighbors = cell
                    .getNeighborCoordinates()
                    .filter(([neighborRow, neighborColumn]) => this.getCell(neighborRow, neighborColumn)?.isAlive() || false).length;

                if ((cell.isAlive() && aliveNeighbors === 2) || aliveNeighbors === 3) {
                    // alive cells with 2 or 3 alive neighbors survive
                    // other alive cells die from either underpopulation or overpopulation
                    // dead cells with 3 neighbors become alive through reproduction
                    cell.setNextIsAlive(true);
                } else {
                    cell.setNextIsAlive(false);
                }
                return cell;
            })
            .map((cell) => {
                cell.evolve();
                return cell;
            });
        this._generation++;

        if (redraw) {
            this.draw();
        }
    }

    draw(): void {
        // prerender differences from last generation then apply
        requestAnimationFrame(() => {
            const preRenderCanvas = document.createElement('canvas');
            preRenderCanvas.height = this._canvasHeight;
            preRenderCanvas.width = this._canvasWidth;
            const preRenderContext = preRenderCanvas.getContext('2d');
            this._cells.forEach((cell) => cell.draw(preRenderContext));
            if (this._context !== undefined) {
                this._context.drawImage(preRenderCanvas, 0, 0);
            }
        });
    }

    private getCell(row: number, column: number): GameofLifeCell | undefined {
        if (row < this._height && column < this._width) {
            return this._cells[row * this._width + column];
        }
        return undefined;
    }

    private applyInitialCoordinates(
        initialAliveCoordinates: EnvironmentCoordinate[],
        initialVisitedCoordinates: EnvironmentCoordinate[]
    ): void {
        // filter out coords that aren't valid in environment
        const validAliveCoords = initialAliveCoordinates.filter((aliveCoord) => {
            return this.isValidCoordinate(aliveCoord);
        });
        const validVisitedCoords = initialVisitedCoordinates.filter((visitedCoord) => {
            return this.isValidCoordinate(visitedCoord);
        });

        validAliveCoords.forEach((aliveCoord: EnvironmentCoordinate) => {
            const [row, column] = aliveCoord;
            const cell = this.getCell(row, column);
            if (cell) {
                cell.setNextIsAlive(true);
                cell.evolve();
            }
        });

        validVisitedCoords.forEach((visitedCoord: EnvironmentCoordinate) => {
            const [row, column] = visitedCoord;
            const cell = this.getCell(row, column);
            if (cell) {
                cell.setIsVisited(true);
            }
        });
    }

    private isValidCoordinate(coordinate: EnvironmentCoordinate): boolean {
        const [row, column] = coordinate;
        return row >= 0 && row < this._height && column >= 0 && column < this._width;
    }
}
