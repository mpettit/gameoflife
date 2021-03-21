import { GameofLifeCell } from "./game-of-life-cell";
import { GameOfLifeOptions } from "./game-of-life-options";

export class GameOfLifeEnvironment {
    private _cells: GameofLifeCell[];
    private readonly _context: fabric.StaticCanvas;
    private readonly _dimensions: [number, number];
    private readonly _generation: number;

    constructor(
        context: fabric.StaticCanvas,
        environmentOptions: GameOfLifeOptions
    ) {
        this._context = context;
        this._dimensions = environmentOptions.environmentDimensions;
        this._generation = 0;
        this._cells = [];

        const [height, width] = this._dimensions;
        for(let rowIndex = 0; rowIndex < height; rowIndex++) {
            for(let colIndex = 0; colIndex < width; colIndex++) {
                this._cells.push(new GameofLifeCell(context, false, [rowIndex, colIndex], [height, width], environmentOptions.cellOptions));
            }
        }
        this.applyAliveCoordinates(environmentOptions.initialAliveCongiguration, height, width);
    }

    getDimensions(): [number, number] {
        return this._dimensions;
    }

    getGeneration(): number {
        return this._generation;
    }

    isCellAlive(row: number, column: number): boolean {
        return this.getCell(row, column)?.isAlive() || false;
    }

    evolve(redraw?: boolean): void {

        this._cells = this._cells.map(cell => {

            const aliveNeighbors = cell.getNeighborCoordinates()
                .filter(([neighborRow, neighborColumn]) => this.getCell(neighborRow, neighborColumn)?.isAlive() || false)
                .length;

            if ((cell.isAlive() && aliveNeighbors === 2) || aliveNeighbors === 3) {

                // alive cells with 2 or 3 alive neighbors survive
                // other alive cells die from either underpopulation or overpopulation
                // dead cells with 3 neighbors become alive through reproduction
                cell.setIsAlive(true);
            } else {
                cell.setIsAlive(false);
            }
            return cell;
        });
        this._generation++;

        if (redraw){
            this.draw();
        }
    }

    isExtinct(): boolean {
        return this._cells.filter(cell => cell.isAlive()).length > 0;
    }

    draw(): void {
        //TODO: optimize?
        requestAnimationFrame(() => {
            this._context.clear();
            this._cells.forEach(cell => cell.draw());
            this._context.renderAll();
        });
    }

    private getCell(row: number, column: number): GameofLifeCell | undefined {
        const [height, width] = this.getDimensions();

        if (row < height && column < width) {
            return this._cells[(row * width + column)];
        }
        return undefined;
    }

    private applyAliveCoordinates(initialAliveCoordinates: EnvironmentCoordinate[], height: number, width: number): void {

        const validAliveCoords = initialAliveCoordinates.filter(
            (aliveCoord) => {
                // filter out coords that aren't on board
                const [row, column] = aliveCoord;
                return (
                    row >= 0 && row < height && column >= 0 && column < width
                );
            }
        );

        validAliveCoords.forEach((aliveCoord: EnvironmentCoordinate) => {
            const [row, column] = aliveCoord;
            this.getCell(row, column)?.setIsAlive(true);
        });
    }
}
