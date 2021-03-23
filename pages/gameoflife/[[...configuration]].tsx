import React, { useState, useEffect } from 'react';
import GameEnvironment from '../../components/GameEnvironment/GameEnvironment';
import { GameOfLifeCellSettings, GameOfLifeSettings } from '../../models/game-of-life-settings';
import PageLayout from '../../components/PageLayout/PageLayout';
import { Button, Drawer, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getSettings } from '../../store/settings/settingsSelectors';
import { setGameOfLifeSettings } from '../../store/settings/settingsActions';
import GameOptionForm from '../../components/GameOptionForm/GameOptionForm';

const CELL_DIMENSION = 2;
const CANVAS_DIMENSION = 200;
const EVOLUTION_INTERVAL = 50;

interface GameOfLifeProps {
    initialGameSettings?: GameOfLifeSettings[];
}

export default function GameOfLife({ initialGameSettings }: GameOfLifeProps): JSX.Element {
    const dispatch = useDispatch();
    const gameSettings = useSelector(getSettings);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);

    useEffect(() => {
        if (initialGameSettings !== undefined) {
            dispatch(setGameOfLifeSettings(initialGameSettings));
        } else {
            // open settings modal if no settings
            setIsModalVisible(true);
        }
    }, []);

    return (
        <PageLayout>
            <Modal
                title="Settings"
                visible={isModalVisible}
                onOk={() => setIsModalVisible(false)} //TODO: start game
                okText="Continue"
                onCancel={() => setIsModalVisible(false)}
                closable={false}
            >
                <p>Show text here</p>
            </Modal>
            <Drawer
                title="Settings"
                placement="right"
                width="50%"
                closable={true}
                onClose={() => {
                    setIsDrawerVisible(false);
                }}
                visible={isDrawerVisible}
                getContainer={false}
            >
                <p>Some contents...</p>
            </Drawer>

            {gameSettings.isLoaded && <GameEnvironment />}
            <Button type="primary" shape="round" onClick={() => setIsDrawerVisible(true)}>
                open drawer
            </Button>
            <GameOptionForm />
        </PageLayout>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const _configuration = params.configuration;

    // TODO: get board for configuration instead of faking here
    const initialAlive = [];
    for (let i = 0; i < CANVAS_DIMENSION; i++) {
        for (let j = 0; j < CANVAS_DIMENSION; j++) {
            if (Math.random() < 0.15) {
            // if (i==j){
                initialAlive.push([i, j]);
            }
        }
    }

    const initialGameSettings: GameOfLifeSettings = {
        environmentDimensions: [CANVAS_DIMENSION, CANVAS_DIMENSION],
        evolutionInterval: EVOLUTION_INTERVAL,
        initialAliveCongiguration: initialAlive,
        cellSettings: {
            aliveColor: '#FFA101',
            visitedColor: '#FAE6B1',
            deadColor: 'white',
            showVisited: true,
            cellSize: CELL_DIMENSION,
        },
    };

    return {
        props: {
            initialGameSettings,
        },
    };
};
