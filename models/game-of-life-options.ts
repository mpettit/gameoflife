import { EnvironmentCoordinate } from "./game-of-life-cell";

export interface GameOfLifeOptions {
    environmentDimensions: EnvironmentCoordinate,
    evolutionInterval: number,
    initialAliveCongiguration: EnvironmentCoordinate[],
    cellOptions: GameOfLifeCellOptions,
}

export interface GameOfLifeCellOptions {
    aliveColor: string,
    visitedColor: string,
    deadColor: string,
    showVisited: boolean,
    cellSize: number,
}