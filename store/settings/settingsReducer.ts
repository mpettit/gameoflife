import { GameOfLifeSettings } from '../../models/game-of-life-settings';
import { AnyAction } from 'redux';
import { GameOfLifeSettingsAction } from './settingsActions';

export interface GameOfLifeSettingsState extends GameOfLifeSettings {
    isLoaded: boolean;
}

const initialState: GameOfLifeSettingsState = {
    cellSettings: {
        cellSize: 3,
        aliveColor: '#FFA101',
        deadColor: '#FFFFFF',
        visitedColor: '#FAE6B1',
        showVisited: true,
    },
    environmentHeight: 100,
    environmentWidth: 100,
    evolutionInterval: 100,
    initialAliveConfiguration: [],
    isLoaded: false,
};

export default function settingsReducer(state = initialState, action: AnyAction): GameOfLifeSettingsState {
    console.log(action);
    switch (action.type) {
        case GameOfLifeSettingsAction.SetSettings:
            return {
                ...state,
                ...action.payload,
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
