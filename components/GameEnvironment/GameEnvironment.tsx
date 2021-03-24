import React, { useEffect, useRef, useState } from 'react';
import styles from './GameEnvironment.module.scss';
import { GameOfLifeEnvironment } from '../../models/game-of-life-environment';
import { useSelector, useDispatch } from 'react-redux';
import { getSettings } from '../../store/settings/settingsSelectors';
import { resetGame, startGameSuccess, stopGame, stopGameSuccess } from '../../store/controls/controlsAction';
import { getGameStatus } from '../../store/controls/controlsSelectors';
import { GameStatus } from '../../store/controls/controlsReducer';

export default function GameEnvironment(): JSX.Element {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const canvasRef = useRef<HTMLCanvasElement>() as any;
    const dispatch = useDispatch();
    const gameStatus = useSelector(getGameStatus);
    const gameSettings = useSelector(getSettings);
    const [gameEnvironment, setGameEnvironment] = useState<GameOfLifeEnvironment | undefined>(undefined);
    // const [runningIntervalId, setRunningIntervalId] = useState(undefined);
    const canvasHeight = gameSettings.environmentHeight * gameSettings.cellSettings.cellSize;
    const canvasWidth = gameSettings.environmentWidth * gameSettings.cellSettings.cellSize;

    useEffect(() => {
        //handle any new game statuses
        const runningInterval = handleGameStatusChange();

        return () => {
            if (runningInterval !== undefined) {
                clearInterval(runningInterval);
            }
        };
    }, [gameStatus]);

    useEffect(() => {
        if (gameStatus != GameStatus.Resetting) {
            dispatch(resetGame());
        }
    }, [gameSettings]);

    function handleGameStatusChange(): number | undefined {
        console.log('new game status: ' + gameStatus);
        let timeoutId = undefined;
        switch (gameStatus) {
            case GameStatus.Resetting:
                handleGameResetting();
                break
            case GameStatus.Starting:
                handleGameStarting();
                break;
            case GameStatus.Running:
                timeoutId = handleGameRunning();
                break;
            case GameStatus.Stopping:
                handleGameStopping();
                break;
            case GameStatus.Stopped:
                //do nothing
                break;
            default:
                dispatch(stopGame());
        }
        return timeoutId;
    }

    function handleGameStarting(): void {
        console.log('starting');
        dispatch(startGameSuccess());
    }

    function handleGameRunning(): number {
        console.log('running');
        return window.setInterval(() => {
            if (gameEnvironment !== undefined) {
                gameEnvironment?.evolve(true);
            }
        }, gameSettings.evolutionInterval);
    }

    function handleGameStopping(): void {
        console.log('stopping');
        dispatch(stopGameSuccess());
    }

    function handleGameResetting(): void {
        console.log('resetting');
        prepareCanvas();
        const newEnvironment = new GameOfLifeEnvironment(gameSettings, getCanvasContext());
        newEnvironment.draw();
        setGameEnvironment(newEnvironment);
        dispatch(stopGame());
    }

    function getCanvasContext(): CanvasRenderingContext2D | undefined {
        const canvas = canvasRef.current;
        if (canvas !== undefined) {
            return canvas.getContext('2d') as CanvasRenderingContext2D;
        }
        return undefined;
    }

    function prepareCanvas(): void {
        const canvasContext = getCanvasContext();
        if (canvasContext !== undefined) {
            canvasContext.fillStyle = gameSettings.cellSettings.deadColor;
            canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);
        }
    }

    return (
        <div className={styles.boardContainer}>
            <canvas ref={canvasRef} id="gameoflife" height={canvasHeight} width={canvasWidth} />
        </div>
    );
}
