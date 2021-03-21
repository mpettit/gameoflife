import React, { useEffect, useState } from 'react';
import GameBoard from '../../components/GameBoard/GameBoard';
import { GameOfLifeBoard } from '../../models/game-of-life-board';

interface GameOfLifeProps {
    initialAlive?: GameBoardCoordinate[];
    height?: number;
    width?: number;
}

const CELL_DIMENSION = 3;
const CANVAS_DIMENSION = 200;

export default function GameOfLife({
    initialAlive,
    height,
    width,
}: GameOfLifeProps): JSX.Element {
    const initialGameBoard = new GameOfLifeBoard(
        height || CANVAS_DIMENSION,
        width || CANVAS_DIMENSION,
        initialAlive
    );
    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    useEffect(() => {
        const intervalId = setInterval(() => {
            // process next generation on every new interval
            setGameBoard((prev) => prev.getNextGenerationBoard());
        }, 500); //TODO: add optional speeds in a menu?

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div>
            <h1>Game of Life!</h1>
            <div>Generation: {gameBoard.getGeneration()}</div>
            <GameBoard gameOfLifeBoard={gameBoard} cellDimension={CELL_DIMENSION}/>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const _configuration = params.configuration;

    // TODO: get board for configuration instead of faking here
    const initialAlive = [];
    for (let i = 0; i < 5000; i++) {
        initialAlive.push([
            randomNumber(0, CANVAS_DIMENSION),
            randomNumber(0, CANVAS_DIMENSION),
        ]);
    }

    const height = null;
    const width = null;

    return {
        props: {
            initialAlive,
            height,
            width,
        },
    };
};

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
