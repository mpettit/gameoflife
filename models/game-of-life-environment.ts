import { GameofLifeCell } from './game-of-life-cell';
import { GameOfLifeSettings } from './game-of-life-settings';

export class GameOfLifeEnvironment {
    private _cells: GameofLifeCell[];
    private readonly _context: CanvasRenderingContext2D;
    private readonly _dimensions: [number, number];
    private readonly _canvasDimensions: [number, number];
    private readonly _generation: number;

    constructor(context: CanvasRenderingContext2D, environmentSettings: GameOfLifeSettings) {
        const [height, width] = environmentSettings.environmentDimensions;
        const cellSize = environmentSettings.cellSettings.cellSize;
        this._context = context;
        this._dimensions = environmentSettings.environmentDimensions;
        this._canvasDimensions = [height * cellSize, width * cellSize];
        this._generation = 0;
        this._cells = [];

        for (let rowIndex = 0; rowIndex < height; rowIndex++) {
            for (let colIndex = 0; colIndex < width; colIndex++) {
                this._cells.push(new GameofLifeCell([rowIndex, colIndex], [height, width], environmentSettings.cellSettings));
            }
        }
        this.applyAliveCoordinates(environmentSettings.initialAliveCongiguration, height, width);
    }

    getGeneration(): number {
        return this._generation;
    }

    evolve(redraw?: boolean): void {
        this._cells = this._cells.map((cell) => {
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
        .map(cell => {
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
            const [canvasHeight, canvasWidth] = this._canvasDimensions;
            const preRenderCanvas = document.createElement('canvas');
            preRenderCanvas.height = canvasHeight;
            preRenderCanvas.width = canvasWidth;
            const preRenderContext = preRenderCanvas.getContext('2d');
            this._cells.forEach((cell) => cell.draw(preRenderContext));
            this._context.drawImage(preRenderCanvas, 0, 0);
        });
    }

    private getCell(row: number, column: number): GameofLifeCell | undefined {
        const [height, width] = this._dimensions;
        if (row < height && column < width) {
            return this._cells[row * width + column];
        }
        return undefined;
    }

    private applyAliveCoordinates(initialAliveCoordinates: EnvironmentCoordinate[], height: number, width: number): void {
        const validAliveCoords = initialAliveCoordinates.filter((aliveCoord) => {
            // filter out coords that aren't valid in environment
            const [row, column] = aliveCoord;
            return row >= 0 && row < height && column >= 0 && column < width;
        });

        validAliveCoords.forEach((aliveCoord: EnvironmentCoordinate) => {
            const [row, column] = aliveCoord;
            const cell = this.getCell(row, column);
            if (cell) {
                cell.setNextIsAlive(true);
                cell.evolve();
            }
        });
    }
}
