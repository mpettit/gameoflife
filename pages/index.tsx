import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { setGameOfLifeSettings, setIsLoaded } from '../store/settings/settingsActions';
import Image from 'next/image';
import LandingLayout from '../components/LandingLayout/LandingLayout';
import GameSettingsForm from '../components/GameSettingsForm/GameSettingsForm';
import styles from './index.module.scss';

export default function StartMenu(): React.FC {
    const router = useRouter();
    const dispatch = useDispatch();

    const [isModalVisible, setIsModalVisible] = useState(false);

    function applySettingsAndContinue(newSettings: GameOfLifeSettings) {
        dispatch(setGameOfLifeSettings(newSettings));
        router.push('/gameoflife');
    }

    return (
        <LandingLayout>
            <div className={styles.titleContainer}>
                <div className={styles.titleLogo}>
                    <Image src="/images/logo.png" width={100} height={100} />
                </div>
                <div className={styles.titleLogoTextContainer}>
                    <div className={styles.titleText}>game of life</div>
                    <div className={styles.subtitleText}>a cellular automaton.</div>
                </div>
            </div>
            <div className={styles.descriptionContainer}>
                <div className={styles.text}>
                    live cells with 2 or 3 live neighbors survive. dead cells with 3 live neighbors are reborn.
                </div>
                <div className={styles.text}>...all other cells die.</div>
            </div>
            <div className={styles.buttonContainer}>
                <div className={styles.actionButton}>
                    <Button block ghost shape="round" href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">
                        more info
                    </Button>
                </div>

                <div className={styles.actionButton}>
                    <Button block shape="round" onClick={() => setIsModalVisible(true)}>
                        let&apos;s play
                    </Button>
                </div>
            </div>
            <Modal title="Settings" visible={isModalVisible} closable={false} footer={null}>
                <GameSettingsForm
                    applyText="Continue" //TODO: is there a way to move buttons outside
                    onApply={(settings) => applySettingsAndContinue(settings)}
                    cancelText="Cancel"
                    onCancel={() => setIsModalVisible(false)}
                />
            </Modal>
        </LandingLayout>
    );
}
