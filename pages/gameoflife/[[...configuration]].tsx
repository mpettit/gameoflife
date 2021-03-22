import React from 'react';
import GameEnvironment from '../../components/GameEnvironment/GameEnvironment';
import { GameOfLifeOptions } from '../../models/game-of-life-options';
import Layout from '../../components/Layout/Layout';

const CELL_DIMENSION = 3;
const CANVAS_DIMENSION = 50;
const EVOLUTION_INTERVAL = 50;

interface GameOfLifeProps {
    initialAlive?: GameBoardCoordinate[];
    height?: number;
    width?: number;
}

export default function GameOfLife({ initialAlive, height, width }: GameOfLifeProps): JSX.Element {
    const gameOptions: GameOfLifeOptions = {
        environmentDimensions: [height || CANVAS_DIMENSION, width || CANVAS_DIMENSION],
        evolutionInterval: EVOLUTION_INTERVAL,
        initialAliveCongiguration: initialAlive,
        cellOptions: {
            aliveColor: '#FFA101',
            visitedColor: '#FAE6B1',
            deadColor: 'white',
            showVisited: false,
            cellSize: CELL_DIMENSION,
        },
    };

    return (
        <Layout>
            <GameEnvironment gameOptions={gameOptions} />
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const _configuration = params.configuration;

    // TODO: get board for configuration instead of faking here
    const initialAlive = [];
    for (let i = 0; i < CANVAS_DIMENSION; i++) {
        for (let j = 0; j < CANVAS_DIMENSION; j++) {
            if (Math.random() < 0.33) {
                initialAlive.push([i, j]);
            }
        }
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
