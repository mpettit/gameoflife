import React, { useEffect, useState } from 'react';
import GameEnvironment from '../../components/GameEnvironment/GameEnvironment';
import { GameOfLifeEnvironment } from '../../models/game-of-life-environment';
import { GameOfLifeOptions } from '../../models/game-of-life-options';


const CELL_DIMENSION = 3;
const CANVAS_DIMENSION = 200;
const EVOLUTION_INTERVAL = 100;

interface GameOfLifeProps {
    initialAlive?: GameBoardCoordinate[];
    height?: number;
    width?: number;
}

export default function GameOfLife({
    initialAlive,
    height,
    width,
}: GameOfLifeProps): JSX.Element {

    const gameOptions: GameOfLifeOptions = {
        environmentDimensions: [height || CANVAS_DIMENSION, width || CANVAS_DIMENSION],
        evolutionInterval: EVOLUTION_INTERVAL,
        initialAliveCongiguration: initialAlive,
        cellOptions: {
            aliveColor: 'red',
            visitedColor: 'pink',
            cellSize: CELL_DIMENSION,
        }
    }

    return (
        <div>
            <h1>Game of Life!</h1>
            <GameEnvironment gameOptions={gameOptions}/>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const _configuration = params.configuration;

    // TODO: get board for configuration instead of faking here
    const initialAlive = [];
    for (let i = 0; i < (CANVAS_DIMENSION * CANVAS_DIMENSION); i++) {
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
