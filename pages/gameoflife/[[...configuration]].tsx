import React, { useEffect } from 'react';
import { GameOfLifeSettings } from '../../models/game-of-life-settings';
import PageLayout from '../../components/PageLayout/PageLayout';
import { Drawer } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { changeSetting } from '../../store/settings/settingsActions';
import GameSettingsForm from '../../components/GameSettingsForm/GameSettingsForm';
import { setShowSettingsDrawer } from '../../store/controls/controlsAction';
import { getSettings } from '../../store/settings/settingsSelectors';
import { getShowSettingsDrawer } from '../../store/controls/controlsSelectors';
import GameEnvironmentCard from '../../components/GameEnvironmentCard/GameEnvironmentCard';
import styles from './[[...configuration]].module.scss';

export default function GameOfLife(): JSX.Element {
    const dispatch = useDispatch();
    const gameSettings = useSelector(getSettings);
    const showSettingsDrawer = useSelector(getShowSettingsDrawer);

    useEffect(() => {
        //TODO: replace with alive from configuration
        if (gameSettings.initialAliveCoordinates.length === 0) {
            const initialAliveCoordinates = [];
            for (let i = 0; i < gameSettings.environmentHeight; i++) {
                for (let j = 0; j < gameSettings.environmentWidth; j++) {
                    if (Math.random() < 0.15) {
                        initialAliveCoordinates.push([i, j]);
                    }
                }
            }
            dispatch(changeSetting({ initialAliveCoordinates }));
        }
    }, []);

    function closeDrawer() {
        dispatch(setShowSettingsDrawer(false));
    }

    function closeDrawerAndApplySettings(newSettings: GameOfLifeSettings) {
        dispatch(changeSetting(newSettings));
        closeDrawer();
    }

    return (
        <PageLayout>
            <Drawer
                title="Settings"
                placement="right"
                width="40%"
                closable={true}
                onClose={() => closeDrawer()}
                visible={showSettingsDrawer}
                getContainer={false}
            >
                <GameSettingsForm
                    applyText="Apply"
                    onApply={(settings) => closeDrawerAndApplySettings(settings)}
                    cancelText="Cancel"
                    onCancel={() => closeDrawer()}
                />
            </Drawer>
            <div className={styles.pageLayout}>
                <GameEnvironmentCard />
            </div>
        </PageLayout>
    );
}
