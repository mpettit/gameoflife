import { AnyAction } from 'redux';
import { GameOfLifeControlActionType } from './controlsAction';

export enum GameStatus {
    Starting = 'Starting',
    Running = 'Running',
    Stopping = 'Stopping',
    Stopped = 'Stopped',
    Resetting = 'Resetting',
}

export interface GameOfLifeControlState {
    status: GameStatus;
    showSettingsDrawer: boolean;
}

const initialState: GameOfLifeControlState = {
    status: GameStatus.Stopped,
    showSettingsDrawer: false,
};

export default function controlsReducer(state = initialState, action: AnyAction): GameOfLifeControlState {
    switch (action.type) {
        case GameOfLifeControlActionType.SetGameStatus:
            return {
                ...state,
                status: action.payload,
            };
        case GameOfLifeControlActionType.SetShowSettingsDrawer:
            return {
                ...state,
                showSettingsDrawer: action.payload,
            };
        default:
            return state;
    }
}
