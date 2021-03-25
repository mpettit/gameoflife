import { RootState } from '../store';
import { GameOfLifeControlState, GameStatus } from './controlsReducer';

export function getControls(state: RootState): GameOfLifeControlState {
    return state.controls;
}

export function getGameStatus(state: RootState): GameStatus {
    return getControls(state).status;
}

export function getShowSettingsDrawer(state: RootState): boolean {
    return getControls(state).showSettingsDrawer;
}
