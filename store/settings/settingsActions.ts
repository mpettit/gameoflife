import { AnyAction } from "redux";
import { GameOfLifeSettings } from "../../models/game-of-life-settings";

export enum GameOfLifeSettingsAction {
    SetSettings = 'Set Settings',
}

export function setGameOfLifeSettings(settings: GameOfLifeSettings): AnyAction {
    return { type: GameOfLifeSettingsAction.SetSettings, payload: settings };
}