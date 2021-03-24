import { AnyAction } from 'redux';

export enum GameOfLifeSettingsActionType {
    ChangeSetting = 'Change Setting',
}

export function changeSetting(change: { [setting: string]: any}): AnyAction {
    return { type: GameOfLifeSettingsActionType.ChangeSetting, payload: change };
}

