import { EnvironmentCoordinate } from "./game-of-life-cell";

export interface GameOfLifeSettings {   //TODO: add setting for wrapped borders
    environmentHeight: number,
    environmentWidth: number,
    evolutionInterval: number,
    initialAliveCoordinates: EnvironmentCoordinate[],
    cellSettings: GameOfLifeCellSettings,
}

export interface GameOfLifeCellSettings {
    aliveColor: string,
    visitedColor: string,
    deadColor: string,
    showVisited: boolean,
    cellSize: number,
}