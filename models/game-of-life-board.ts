import { GameofLifeCell } from "./game-of-life-cell";

export class GameOfLifeBoard {
    private _board: GameofLifeCell[][];
    private _isBoardExtinct: boolean;
    private readonly _generation: number;
    private readonly _initialAliveCoordinates: GameBoardCoordinate[];

    constructor(
        height: number,
        width: number,
        initialAliveCoordinates: GameBoardCoordinate[],
        generation? = 0
    ) {
        this._board = this.initializeEmptyBoard(height, width);
        this._isBoardExtinct = true;
        this._generation = generation;

        const validAliveCoords = initialAliveCoordinates.filter(
            (aliveCoord) => {
                // filter out coords that aren't on board
                const [row, column] = aliveCoord;
                return (
                    row >= 0 && row < height && column >= 0 && column < width
                );
            }
        );
        this._initialAliveCoordinates = validAliveCoords;

        // set inital values as alive
        this.applyAliveCoordinates(validAliveCoords);
    }

    getDimensions(): [number, number] {
        return [this._board.length, this._board[0].length];
    }

    getGeneration(): number {
        return this._generation;
    }

    isCellAlive(row: number, column: number): boolean {
        return this._board[row][column].isAlive();
    }

    reset(): void {
        this._board = this.initializeEmptyBoard(
            this._board.length,
            this._board[0].length
        );
        this.applyAliveCoordinates(this._initialAliveCoordinates);
    }

    getNextGenerationBoard(): GameOfLifeBoard {
        const [height, width] = this.getDimensions();

        const nextGenerationAliveCells = [];

        for (let rowIndex = 0; rowIndex < height; rowIndex++) {
            for (let columnIndex = 0; columnIndex < width; columnIndex++) {

                const currentCell = this._board[rowIndex][columnIndex]
                const aliveNeighbors = currentCell.getNeighborCoordinates()
                    .filter(([neighborRow, neighborColumn]) => this._board[neighborRow][neighborColumn].isAlive())
                    .length;

                if ((currentCell.isAlive() && aliveNeighbors === 2) || aliveNeighbors === 3) {

                    // alive cells with 2 or 3 alive neighbors survive
                    // other alive cells die from either underpopulation or overpopulation
                    // dead cells with 3 neighbors become alive through reproduction
                    nextGenerationAliveCells.push([rowIndex, columnIndex]);
                }
            }
        }

        return new GameOfLifeBoard(height, width, nextGenerationAliveCells, this.getGeneration() + 1);
    }

    isExtinct(): boolean {
        return this._isBoardExtinct;
    }

    private initializeEmptyBoard(height: number, width: number): GameofLifeCell[][] {

        const rows = [];
        for(let rowIndex = 0; rowIndex < height; rowIndex++) {
            const row = [];
            for (let colIndex = 0; colIndex < width; colIndex++) {
                row.push(new GameofLifeCell(false, [rowIndex, colIndex], [height, width]))
            }
            rows.push(row);
        }
        return rows;
    }

    private applyAliveCoordinates(
        aliveCoordinates: GameBoardCoordinate[]
    ): void {
        aliveCoordinates.forEach((aliveCoord: GameBoardCoordinate) => {
            const [row, column] = aliveCoord;
            this._board[row][column].setIsAlive(true);
        });
        this._isBoardExtinct = aliveCoordinates.length > 0;
    }
}
