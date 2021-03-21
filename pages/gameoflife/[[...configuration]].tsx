import React, { useState, useEffect } from 'react';
import GameBoard from '../../components/GameBoard/GameBoard';
import { GameOfLifeBoard } from '../../models/game-of-life-board';

interface GameOfLifeProps {
    initialAlive?: GameBoardCoordinate[];
    height?: number;
    width?: number;
}

const DEFAULT_HEIGHT = 100;
const DEFAULT_WIDTH = 100;

export default function GameOfLife({
    initialAlive,
    height,
    width,
}: GameOfLifeProps): JSX.Element {
    const initialGameBoard = new GameOfLifeBoard(
        height || DEFAULT_HEIGHT,
        width || DEFAULT_WIDTH,
        initialAlive
    );
    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    useEffect(() => {
        const intervalId = setInterval(() => {
            // process next generation on every new interval
            setGameBoard((prev) => prev.getNextGenerationBoard());
        }, 1000); //TODO: add optional speeds in a menu?

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div>
            <h1>Game of Life!</h1>
            <div>Generation: {gameBoard.getGeneration()}</div>
            <GameBoard gameOfLifeBoard={gameBoard} />
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const _configuration = params.configuration;

    // TODO: get board for configuration instead of faking here
    const initialAlive = [];
    for (let i = 0; i < 5000; i++) {
        initialAlive.push([
            randomNumber(0, DEFAULT_HEIGHT),
            randomNumber(0, DEFAULT_WIDTH),
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
