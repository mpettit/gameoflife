import { EnvironmentCoordinate } from "./game-of-life-cell";

export interface GameOfLifeSettings {
    environmentDimensions?: EnvironmentCoordinate,
    evolutionInterval?: number,
    initialAliveCongiguration?: EnvironmentCoordinate[],
    cellSettings: GameOfLifeCellSettings,
}

export interface GameOfLifeCellSettings {
    aliveColor?: string,
    visitedColor?: string,
    deadColor?: string,
    showVisited?: boolean,
    cellSize?: number,
}