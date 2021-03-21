import React, { useEffect, useState } from 'react';
import styles from './GameBoard.module.scss';
import { fabric } from 'fabric';
import { GameOfLifeBoard } from '../../models/game-of-life-board';

export default function GameBoard({
    gameOfLifeBoard,
    cellDimension
}: {
    gameOfLifeBoard: GameOfLifeBoard,
    cellDimension: number
}): JSX.Element {
    const [height, width] = gameOfLifeBoard.getDimensions();
    const [canvas, setCanvas] = useState(undefined);
  
    useEffect(() => {

        const staticCanvas = new fabric.StaticCanvas('gameoflife', {
            renderOnAddRemove: false,
        })
        updateCanvas(staticCanvas, gameOfLifeBoard)
        setCanvas(staticCanvas);
    }, []);

    useEffect(() => {
        // update canvas on every game board change
        if (canvas) {
            updateCanvas(canvas, gameOfLifeBoard)
        }
    }, [gameOfLifeBoard]);

    function updateCanvas(
        canvas: fabric.StaticCanvas,
        gameBoard: GameOfLifeBoard
    ) {
        canvas.clear();
        for (let rowIndex = 0; rowIndex < height; rowIndex++) {
            for (let colIndex = 0; colIndex < width; colIndex++) {
                if (gameBoard.isCellAlive(rowIndex, colIndex)) {
                    const rect = new fabric.Rect({
                        top: cellDimension * rowIndex,
                        left: cellDimension * colIndex,
                        fill: 'red',
                        width: cellDimension,
                        height: cellDimension,
                        objectCaching: false,
                    });
                    canvas.add(rect);
                }
            }
        }
        canvas.renderAll();
    }

    return (
        <div className={styles.boardContainer}>
            <canvas id="gameoflife" height={height * cellDimension} width={width * cellDimension}/>
        </div>
    );
}
