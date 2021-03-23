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
}

const initialState: GameOfLifeControlState = {
    status: GameStatus.Stopped,
};

export default function controlsReducer(state = initialState, action: AnyAction): GameOfLifeControlState {
    switch (action.type) {
        case GameOfLifeControlActionType.SetGameStatus:
            return {
                ...state,
                status: action.payload,
            };
        default:
            return state;
    }
}
