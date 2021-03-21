import React from 'react';
import GameBoardCell from '../GameBoardCell/GameBoardCell';
import styles from './GameBoard.module.scss';


export default function GameBoard({
    gameOfLifeBoard,
}: {
    gameOfLifeBoard: GameOfLifeBoard;
}): JSX.Element {

    const [height, width] = gameOfLifeBoard.getDimensions();
    const rows = [];
    for (let rowIndex = 0; rowIndex < height; rowIndex++) {
        const row = [];
        for (let columnIndex = 0; columnIndex < width; columnIndex++) {
            row.push(
                <GameBoardCell key={columnIndex} isAlive={gameOfLifeBoard.isCellAlive(rowIndex, columnIndex)} />
            );
        }
        rows.push(<div key={rowIndex} className={styles.boardRow}>{row}</div>);
    }

    return <div className={styles.boardContainer}>{rows}</div>;
}
