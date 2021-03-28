import { GameOfLifeSettings } from '../../models/gameoflife/game-of-life-settings';
import { AnyAction } from 'redux';
import { GameOfLifeSettingsActionType } from './settingsActions';
import { MovieSearchResult } from '../../models/movie/movie-search-result';

export interface GameOfLifeSettingsState extends GameOfLifeSettings {
    uploadFile?: File,
    selectedMovie?: MovieSearchResult,
};

const initialState: GameOfLifeSettingsState = {
    cellSettings: {
        cellSize: 3,
        aliveColor: '#FFA101',
        deadColor: '#FFFFFF',
        visitedColor: '#FAE6B1',
        showVisited: true,
        wrapBorders: true,
    },
    environmentHeight: 100,
    environmentWidth: 100,
    evolutionInterval: 100,
    initialAliveCoordinates: [],
    initialVisitedCoordinates: [],
};

export default function settingsReducer(state = initialState, action: AnyAction): GameOfLifeSettingsState {
    switch (action.type) {
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
