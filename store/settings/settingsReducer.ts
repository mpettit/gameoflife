import { GameOfLifeSettings } from '../../models/game-of-life-settings';
import { AnyAction } from 'redux';
import { GameOfLifeSettingsActionType } from './settingsActions';

export type GameOfLifeSettingsState = GameOfLifeSettings;

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
    evolutionInterval: 5000,
    initialAliveCoordinates: [],
};

export default function settingsReducer(state = initialState, action: AnyAction): GameOfLifeSettingsState {
    switch (action.type) {
        case GameOfLifeSettingsActionType.SetSettings:
            return {
                ...state,
                ...action.payload,
            };
        case GameOfLifeSettingsActionType.ChangeSetting:
            return {
                ...state,
                ...action.payload,
                cellSettings: {
                    ...state.cellSettings,
                    ...action.payload.cellSettings,
                },
            };
        default:
            return state;
    }
}
