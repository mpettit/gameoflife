import React, { useEffect, useRef, useState } from 'react';
import styles from './GameEnvironment.module.scss';
import { GameOfLifeEnvironment } from '../../models/game-of-life-environment';
import { useSelector, useDispatch } from 'react-redux';
import { getSettings } from '../../store/settings/settingsSelectors';
import { resetGame, startGame, startGameSuccess, stopGame, stopGameSuccess } from '../../store/controls/controlsAction';
import { getGameStatus } from '../../store/controls/controlsSelectors';
import { GameStatus } from '../../store/controls/controlsReducer';
import { Spin } from 'antd';
import { PlayCircleTwoTone, PauseCircleTwoTone } from '@ant-design/icons';

export default function GameEnvironment(): JSX.Element {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const canvasRef = useRef<HTMLCanvasElement>() as any;
    const dispatch = useDispatch();
    const gameStatus = useSelector(getGameStatus);
    const gameSettings = useSelector(getSettings);
    const [showCanvasOverlay, setShowCanvasOverlay] = useState(false);
    const [gameEnvironment, setGameEnvironment] = useState<GameOfLifeEnvironment | undefined>(undefined);
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
        let timeoutId = undefined;
        switch (gameStatus) {
            case GameStatus.Resetting:
                handleGameResetting();
                break;
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
        dispatch(startGameSuccess());
    }

    function handleGameRunning(): number {
        return window.setInterval(() => {
            if (gameEnvironment !== undefined) {
                gameEnvironment?.evolve(true);
            }
        }, gameSettings.evolutionInterval);
    }

    function handleGameStopping(): void {
        dispatch(stopGameSuccess());
    }

    function handleGameResetting(): void {
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
        <div
            className={styles.boardContainer}
            onClick={() => {
                if (gameStatus === GameStatus.Running) {
                    dispatch(stopGame());
                } else {
                    dispatch(startGame());
                }
            }}
            onMouseEnter={() => setShowCanvasOverlay(true)}
            onMouseLeave={() => setShowCanvasOverlay(false)}
        >
            <Spin
                spinning={showCanvasOverlay}
                indicator={gameStatus !== GameStatus.Running ? <PlayCircleTwoTone /> : <PauseCircleTwoTone />}
                size="large"
            >
                <canvas ref={canvasRef} id="gameoflife" height={canvasHeight} width={canvasWidth} />
            </Spin>
        </div>
    );
}
