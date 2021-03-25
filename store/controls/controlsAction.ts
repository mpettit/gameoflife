import { AnyAction } from 'redux';
import { GameStatus } from './controlsReducer';

export enum GameOfLifeControlActionType {
    SetGameStatus = 'Set Game Status',
    SetShowSettingsDrawer = 'Set Show Settings Drawer',
}

export function setGameStatus(status: GameStatus): AnyAction {
    return { type: GameOfLifeControlActionType.SetGameStatus, payload: status };
}

export function startGame(): AnyAction {
    return setGameStatus(GameStatus.Starting);
}

export function startGameSuccess(): AnyAction {
    return setGameStatus(GameStatus.Running);
}

export function stopGame(): AnyAction {
    return setGameStatus(GameStatus.Stopping);
}

export function stopGameSuccess(): AnyAction {
    return setGameStatus(GameStatus.Stopped);
}

export function resetGame(): AnyAction {
    return setGameStatus(GameStatus.Resetting);
}

export function setShowSettingsDrawer(showSettingsDrawer: boolean): AnyAction {
    return { type: GameOfLifeControlActionType.SetShowSettingsDrawer, payload: showSettingsDrawer };
}
