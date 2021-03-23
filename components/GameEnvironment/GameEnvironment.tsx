import React, { useEffect, useRef } from 'react';
import styles from './GameEnvironment.module.scss';
import { GameOfLifeEnvironment } from '../../models/game-of-life-environment';
import { GameOfLifeSettings } from '../../models/game-of-life-settings';
import { useSelector } from 'react-redux';
import { getSettings } from '../../store/settings/settingsSelectors';

export default function GameEnvironment(): React.FC {
    const canvasRef = useRef();
    const gameSettings = useSelector(getSettings);

    const canvasHeight = gameSettings.environmentHeight * gameSettings.cellSettings.cellSize;
    const canvasWidth = gameSettings.environmentWidth * gameSettings.cellSettings.cellSize;

    useEffect(() => {
        const canvas = canvasRef.current;
        const canvasContext = canvas.getContext('2d');
        canvasContext.fillStyle = gameSettings.cellSettings.deadColor;
        canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);

        const gameEnvironment = new GameOfLifeEnvironment(canvasContext, gameSettings);
        gameEnvironment.draw();

        const intervalId = setInterval(() => {
            //TODO: can we add pause + auto pause on tab unfocused
            gameEnvironment.evolve(true);
        }, gameSettings.evolutionInterval);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={styles.boardContainer}>
            <canvas
                ref={canvasRef}
                id="gameoflife"
                height={canvasHeight}
                width={canvasWidth}
            />
        </div>
    );
}
