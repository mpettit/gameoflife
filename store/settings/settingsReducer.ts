import { GameOfLifeSettings } from '../../models/game-of-life-settings';
import { AnyAction } from 'redux';
import { GameOfLifeSettingsAction } from './settingsActions';

export interface GameOfLifeSettingsState extends GameOfLifeSettings {
    isLoaded: boolean;
}

const initialState: GameOfLifeSettingsState = {
    cellSettings: {},
    isLoaded: false,
};

export default function settingsReducer(state = initialState, action: AnyAction): GameOfLifeSettingsState {
    switch (action.type) {
        case GameOfLifeSettingsAction.SetSettings:
            return {
                ...state,
                ...action.payload,
                isLoaded: true,
            };
        case GameOfLifeSettingsAction.ChangeSetting:
            return {
                ...state,
                ...action.payload,
            };
        case GameOfLifeSettingsAction.ChangeCellSetting:
            return {
                ...state,
                cellSettings: {
                    ...state.cellSettings,
                    ...action.payload,
                },
            };
        case GameOfLifeSettingsAction.SetIsLoaded:
            return {
                ...state,
                isLoaded: action.payload,
            };
        default:
            return state;
    }
}