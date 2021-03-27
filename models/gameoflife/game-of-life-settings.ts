import { EnvironmentCoordinate } from "./game-of-life-cell";

export interface GameOfLifeSettings {
    environmentHeight: number,
    environmentWidth: number,
    evolutionInterval: number,
    initialAliveCoordinates: EnvironmentCoordinate[],
    initialVisitedCoordinates: EnvironmentCoordinate[],
    cellSettings: GameOfLifeCellSettings,
}

export interface GameOfLifeCellSettings {
    aliveColor: string,
    visitedColor: string,
    deadColor: string,
    showVisited: boolean,
    cellSize: number,
    wrapBorders: boolean,
}