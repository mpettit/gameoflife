import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetGame, startGame, stopGame } from '../../store/controls/controlsAction';
import { GameStatus } from '../../store/controls/controlsReducer';
import { getGameStatus } from '../../store/controls/controlsSelectors';
import { Button } from 'antd';
import styles from './GameControlMenu.module.scss';

const startButtonStatuses = [GameStatus.Stopped];
const stopButtonStatuses = [GameStatus.Starting, GameStatus.Running];

export default function GameControlMenu(): JSX.Element {
    const dispatch = useDispatch();
    const gameStatus = useSelector(getGameStatus);

    const showStartButton = startButtonStatuses.includes(gameStatus);
    const showStopButton = stopButtonStatuses.includes(gameStatus);

    return (
        <div>
            <Button shape="round" onClick={() => dispatch(resetGame())}>
                Reset
            </Button>
            {showStartButton && (
                <Button type="primary" shape="round" className={styles.button} onClick={() => dispatch(startGame())}>
                    Start
                </Button>
            )}
            {showStopButton && (
                <Button type="primary" shape="round" className={styles.button} onClick={() => dispatch(stopGame())}>
                    Pause
                </Button>
            )}
        </div>
    );
}
