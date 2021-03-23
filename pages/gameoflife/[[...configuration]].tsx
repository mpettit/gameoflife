import React, { useState, useEffect } from 'react';
import GameEnvironment from '../../components/GameEnvironment/GameEnvironment';
import { GameOfLifeCellSettings, GameOfLifeSettings } from '../../models/game-of-life-settings';
import PageLayout from '../../components/PageLayout/PageLayout';
import { Drawer } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getSettings } from '../../store/settings/settingsSelectors';
import { setGameOfLifeSettings, setIsLoaded } from '../../store/settings/settingsActions';
import GameSettingsForm from '../../components/GameSettingsForm/GameSettingsForm';
import { SettingOutlined } from '@ant-design/icons';
import styles from './gameoflife.module.scss';

//TODO: remove these
const CANVAS_DIMENSION = 100;

//TODO: add ability to skip generations

interface GameOfLifeProps {
    initialGameSettings?: GameOfLifeSettings;
}

export default function GameOfLife({ initialGameSettings }: GameOfLifeProps): React.FC {
    const dispatch = useDispatch();
    const gameSettings = useSelector(getSettings);

    const [isDrawerVisible, setIsDrawerVisible] = useState(false);

    useEffect(() => {
        dispatch(setGameOfLifeSettings(initialGameSettings)); 
        dispatch(setIsLoaded(true)); //TODO: this needs major cleanup
    }, []);

    function applySettings(newSettings: GameOfLifeSettings) {
        dispatch(setGameOfLifeSettings(newSettings));
        dispatch(setIsLoaded(true));
        setIsDrawerVisible(false);
    }

    return (
        <PageLayout headerRightIcon={<SettingOutlined className={styles.headerIcon} onClick={() => setIsDrawerVisible((prev) => !prev)} />}>
          
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
    };

    return {
        props: {
            initialGameSettings,
        },
    };
};
