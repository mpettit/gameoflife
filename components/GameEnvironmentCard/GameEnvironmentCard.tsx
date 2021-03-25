import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GameEnvironment from '../GameEnvironment/GameEnvironment';
import { Card } from 'antd';
import { SettingOutlined, RedoOutlined, PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';
import { resetGame, setShowSettingsDrawer, startGame, stopGame } from '../../store/controls/controlsAction';
import { getGameStatus } from '../../store/controls/controlsSelectors';
import { GameStatus } from '../../store/controls/controlsReducer';

const startButtonStatuses = [GameStatus.Stopped];
const pauseButtonStatuses = [GameStatus.Starting, GameStatus.Running];

export default function GameEnvironmentCard(): JSX.Element {
    const dispatch = useDispatch();
    const gameStatus = useSelector(getGameStatus);
    const showStartButton = startButtonStatuses.includes(gameStatus);
    const showPauseButton = pauseButtonStatuses.includes(gameStatus);
    const actions = [
        <SettingOutlined
            key="settings"
            onClick={() => {
                dispatch(stopGame());
                dispatch(setShowSettingsDrawer(true));
            }}
        />,
        showStartButton ? (
            <PlayCircleOutlined
                key="play"
                onClick={() => {
                    dispatch(startGame());
                }}
            />
        ) : undefined,
        showPauseButton ? (
            <PauseCircleOutlined
                key="pause"
                onClick={() => {
                    dispatch(stopGame());
                }}
            />
        ) : undefined,
        <RedoOutlined
            key="reset"
            onClick={() => {
                dispatch(resetGame());
            }}
        />,
    ].filter((action) => action !== undefined);

    return (
        <Card actions={actions}>
            <GameEnvironment />
        </Card>
    );
}
