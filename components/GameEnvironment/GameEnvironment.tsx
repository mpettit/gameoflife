import React, { useEffect, useRef, useState } from 'react';
import styles from './GameEnvironment.module.scss';
import { GameOfLifeEnvironment } from '../../models/game-of-life-environment';
import { GameOfLifeSettings } from '../../models/game-of-life-settings';
import { useSelector, useDispatch } from 'react-redux';
import { getSettings } from '../../store/settings/settingsSelectors';
import { resetGame, startGame, startGameSuccess, stopGame, stopGameSuccess } from '../../store/controls/controlsAction';
import { getGameStatus } from '../../store/controls/controlsSelectors';
import { GameStatus } from '../../store/controls/controlsReducer';

export default function GameEnvironment(): React.FC {
    const canvasRef = useRef();
    const dispatch = useDispatch();
    const gameStatus = useSelector<GameStatus>(getGameStatus);
    const gameSettings = useSelector<GameOfLifeSettings>(getSettings);
    const [gameEnvironment, setGameEnvironment] = useState(undefined);
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
        //TODO: canvas blank when changing cell size or dimensions
        if (gameStatus != GameStatus.Resetting) {
            dispatch(resetGame());
        }
    }, [gameSettings]);

    function handleGameStatusChange(): number | undefined {
        console.log('new game status: ' + gameStatus);
        switch (gameStatus) {
            case GameStatus.Resetting:
                return handleGameResetting();
            case GameStatus.Starting:
                return handleGameStarting();
            case GameStatus.Running:
                return handleGameRunning();
            case GameStatus.Stopping:
                return handleGameStopping();
            case GameStatus.Stopped:
                //do nothing
                return;
            default:
                dispatch(stopGame());
        }
        return;
    }

    function handleGameStarting(): void {
        console.log('starting');
        dispatch(startGameSuccess());
    }

    function handleGameRunning(): void {
        console.log('running');
        return setInterval(() => {
            gameEnvironment.evolve(true);
        }, gameSettings.evolutionInterval);
        // setRunningIntervalId(newIntervalId);
    }

    function handleGameStopping(): void {
        console.log('stopping');
        dispatch(stopGameSuccess());
    }

    function handleGameResetting(): void {
        console.log(gameSettings);
        console.log(canvasHeight + " " + canvasWidth);

        prepareCanvas();
        const newEnvironment = new GameOfLifeEnvironment(getCanvasContext(), gameSettings);
        newEnvironment.draw();
        setGameEnvironment(newEnvironment);
        dispatch(startGame());
    }

    function getCanvasContext(): CanvasRenderingContext2D {
        const canvas = canvasRef.current;
        return canvas.getContext('2d');
    }

    function prepareCanvas(): void {
        const canvasContext = getCanvasContext();
        canvasContext.fillStyle = gameSettings.cellSettings.deadColor;
        canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    return (
        <div className={styles.boardContainer}>
            <canvas ref={canvasRef} id="gameoflife" height={canvasHeight} width={canvasWidth} />
            {gameStatus}
        </div>
    );
}
