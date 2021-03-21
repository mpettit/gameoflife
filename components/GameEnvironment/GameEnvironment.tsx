import React, { useEffect } from 'react';
import styles from './GameEnvironment.module.scss';
import { fabric } from 'fabric';
import { GameOfLifeEnvironment } from '../../models/game-of-life-environment';
import { GameOfLifeOptions } from '../../models/game-of-life-options';

export default function GameEnvironment({ gameOptions }: { gameOptions: GameOfLifeOptions }): JSX.Element {
  
    const [height, width] = gameOptions.environmentDimensions;
    const transformCanvas = { transformOrigin: '0 0', transform: `scale(${gameOptions.cellOptions.cellSize})`}

    useEffect(() => {

        const staticCanvas = new fabric.StaticCanvas('gameoflife', {
            renderOnAddRemove: false,
        })

        const gameEnvironment = new GameOfLifeEnvironment(staticCanvas, gameOptions);
        gameEnvironment.draw();

        const intervalId = setInterval(() => {
            gameEnvironment.evolve(true);
        }, gameOptions.evolutionInterval);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={styles.boardContainer}>
            <canvas id="gameoflife" height={height * gameOptions.cellOptions.cellSize} width={width * gameOptions.cellOptions.cellSize} style={transformCanvas} />
        </div>
    );
}
