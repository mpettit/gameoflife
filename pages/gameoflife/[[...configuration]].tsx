import React, { useState, useEffect } from 'react';
import GameEnvironment from '../../components/GameEnvironment/GameEnvironment';
import { GameOfLifeCellSettings, GameOfLifeSettings } from '../../models/game-of-life-settings';
import PageLayout from '../../components/PageLayout/PageLayout';
import { Button, Drawer, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getSettings } from '../../store/settings/settingsSelectors';
import { setGameOfLifeSettings, setIsLoaded } from '../../store/settings/settingsActions';
import GameSettingsForm from '../../components/GameSettingsForm/GameSettingsForm';
import { useRouter } from 'next/router';
import OkCancel from '../../components/OkCancel/OkCancel';

//TODO: remove these
const CELL_DIMENSION = 2;
const CANVAS_DIMENSION = 100;
const EVOLUTION_INTERVAL = 50;

interface GameOfLifeProps {
    initialGameSettings?: GameOfLifeSettings;
}

export default function GameOfLife({ initialGameSettings }: GameOfLifeProps): JSX.Element {
    const router = useRouter();
    const dispatch = useDispatch();
    const gameSettings = useSelector(getSettings);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);

    useEffect(() => {
        dispatch(setGameOfLifeSettings(initialGameSettings));   //TODO: this needs major cleanup
        setIsModalVisible(true);
    }, []);

    function navigateToLanding() {
        router.push('/');
    }

    function applySettings(newSettings: GameOfLifeSettings) {
        dispatch(setGameOfLifeSettings(newSettings));
        dispatch(setIsLoaded(true));
        setIsDrawerVisible(false);
        setIsModalVisible(false); //TODO: smarter way to do this
    }

    return (
        <PageLayout>
            <Modal title="Settings" visible={isModalVisible} closable={false} footer={null}>
                <GameSettingsForm
                    applyText="Continue"
                    onApply={(settings) => applySettings(settings)}
                    cancelText="Cancel"
                    onCancel={() => navigateToLanding()}
                />
            </Modal>
            <Drawer
                title="Settings"
                placement="right"
                width="35%"
                closable={true}
                onClose={() => setIsDrawerVisible(false)}
                visible={isDrawerVisible}
                getContainer={false}
            >
                <GameSettingsForm
                    applyText="Apply"
                    onApply={(settings) => applySettings(settings)}
                    cancelText="Cancel"
                    onCancel={() => setIsDrawerVisible(false)}
                />
            </Drawer>

            {gameSettings.isLoaded && <GameEnvironment />}
            <Button type="primary" shape="round" onClick={() => setIsDrawerVisible(true)}>
                open drawer
            </Button>
        </PageLayout>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
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

    const initialGameSettings: Partial<GameOfLifeSettings> = {
        initialAliveConfiguration: initialAlive,
        cellSettings: {
            aliveColor: '#FFA101',
            visitedColor: '#FAE6B1',
            deadColor: '#FFFFFF',
            showVisited: true,
        },
    };

    return {
        props: {
            initialGameSettings,
        },
    };
};
