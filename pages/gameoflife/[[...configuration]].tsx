import React, { useState, useEffect } from 'react';
import GameEnvironment from '../../components/GameEnvironment/GameEnvironment';
import { GameOfLifeSettings } from '../../models/game-of-life-settings';
import PageLayout from '../../components/PageLayout/PageLayout';
import { Drawer, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { changeSetting } from '../../store/settings/settingsActions';
import GameSettingsForm from '../../components/GameSettingsForm/GameSettingsForm';
import { SettingOutlined } from '@ant-design/icons';
import styles from './gameoflife.module.scss';
import { startGame, stopGame } from '../../store/controls/controlsAction';
import GameControlMenu from '../../components/GameControlMenu/GameControlMenu';
import { getSettings } from '../../store/settings/settingsSelectors';

export default function GameOfLife(): JSX.Element {
    const layoutSpan = { environment: 16, menu: 8 };
    const dispatch = useDispatch();
    const gameSettings = useSelector(getSettings);

    const [isDrawerVisible, setIsDrawerVisible] = useState(false);

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

    function openDrawer(): void {
        dispatch(stopGame());
        setIsDrawerVisible((prev) => !prev);
    }

    function closeDrawerAndApplySettings(newSettings: GameOfLifeSettings) {
        dispatch(changeSetting(newSettings));
        setIsDrawerVisible(false);
    }

    function closeDrawer() {
        dispatch(startGame());
        setIsDrawerVisible(false);
    }

    return (
        <PageLayout headerRightIcon={<SettingOutlined className={styles.headerIcon} onClick={() => openDrawer()} />}>
            <Drawer
                title="Settings"
                placement="right"
                width="35%"
                closable={true}
                onClose={() => closeDrawer()}
                visible={isDrawerVisible}
                getContainer={false}
            >
                <GameSettingsForm
                    applyText="Apply"
                    onApply={(settings) => closeDrawerAndApplySettings(settings)}
                    cancelText="Cancel"
                    onCancel={() => closeDrawer()}
                />
            </Drawer>

            <Row>
                <Col span={layoutSpan.environment} className={styles.environmentContainer}>
                    <GameEnvironment />
                </Col>
                <Col span={layoutSpan.menu} className={styles.menuContainer}>
                    <GameControlMenu />
                </Col>
            </Row>
        </PageLayout>
    );
}
