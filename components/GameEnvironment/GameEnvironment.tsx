import React, { useEffect,  useRef } from 'react';
import styles from './GameEnvironment.module.scss';
import { GameOfLifeEnvironment } from '../../models/game-of-life-environment';
import { GameOfLifeSettings } from '../../models/game-of-life-settings';
import { useSelector } from 'react-redux';
import { getSettings } from '../../store/settings/settingsSelectors';

export default function GameEnvironment(): JSX.Element {
  
    const canvasRef = useRef()
    const gameSettings = useSelector(getSettings);
    const [height, width] = gameSettings.environmentDimensions;

    useEffect(() => {

        const canvas = canvasRef.current
        const canvasContext = canvas.getContext('2d')

        const gameEnvironment = new GameOfLifeEnvironment(canvasContext, gameSettings);
        gameEnvironment.draw();

        const intervalId = setInterval(() => {
            gameEnvironment.evolve(true);
        }, gameSettings.evolutionInterval);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={styles.boardContainer}>
            <canvas ref={canvasRef} id="gameoflife" height={height * gameSettings.cellSettings.cellSize} width={width * gameSettings.cellSettings.cellSize} />
        </div>
    );
}
