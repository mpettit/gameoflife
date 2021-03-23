import { AnyAction } from 'redux';
import { GameOfLifeSettings } from '../../models/game-of-life-settings';

export enum GameOfLifeSettingsActionType {
    SetSettings = 'Set Settings',
    ChangeSetting = 'Change Setting',
}

export function setGameOfLifeSettings(settings: GameOfLifeSettings): AnyAction {
    return { type: GameOfLifeSettingsActionType.SetSettings, payload: settings };
}

export function changeSetting(change: { [setting: string]: any}): AnyAction {
    return { type: GameOfLifeSettingsActionType.ChangeSetting, payload: change };
}

