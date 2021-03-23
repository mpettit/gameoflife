import { AnyAction } from 'redux';
import { GameOfLifeSettings } from '../../models/game-of-life-settings';

export enum GameOfLifeSettingsActionType {
    ChangeSetting = 'Change Setting',
}

export function changeSetting(change: { [setting: string]: any}): AnyAction {
    return { type: GameOfLifeSettingsActionType.ChangeSetting, payload: change };
}

