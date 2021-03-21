import React, { useEffect,  useRef } from 'react';
import styles from './GameEnvironment.module.scss';
import { GameOfLifeEnvironment } from '../../models/game-of-life-environment';
import { GameOfLifeOptions } from '../../models/game-of-life-options';

export default function GameEnvironment({ gameOptions }: { gameOptions: GameOfLifeOptions }): JSX.Element {
  
    const canvasRef = useRef()
    const [height, width] = gameOptions.environmentDimensions;

    useEffect(() => {

        const canvas = canvasRef.current
        const canvasContext = canvas.getContext('2d')

        const gameEnvironment = new GameOfLifeEnvironment(canvasContext, gameOptions);
        gameEnvironment.draw();

        const intervalId = setInterval(() => {
            gameEnvironment.evolve(true);
        }, gameOptions.evolutionInterval);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={styles.boardContainer}>
            <canvas ref={canvasRef} id="gameoflife" height={height * gameOptions.cellOptions.cellSize} width={width * gameOptions.cellOptions.cellSize} />
        </div>
    );
}
