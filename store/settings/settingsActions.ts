import { AnyAction } from 'redux';
import { GameOfLifeSettings } from '../../models/game-of-life-settings';

export enum GameOfLifeSettingsAction {
    SetSettings = 'Set Settings',
    ChangeSetting = 'Change Setting',
    ChangeCellSetting = 'ChangeCell Setting',
    SetIsLoaded = 'Set Is Loaded',
}

export function setGameOfLifeSettings(settings: GameOfLifeSettings): AnyAction {
    return { type: GameOfLifeSettingsAction.SetSettings, payload: settings };
}

export function changeSetting(change: { [setting: string]: any}): AnyAction {
    return { type: GameOfLifeSettingsAction.ChangeSetting, payload: change };
}

export function changeCellSetting(change: { [setting: string]: any}): AnyAction {
    return { type: GameOfLifeSettingsAction.ChangeCellSetting, payload: change };
}

export function setIsLoaded(isLoaded: boolean): AnyAction {
    return { type: GameOfLifeSettingsAction.SetIsLoaded, payload: isLoaded };
}
