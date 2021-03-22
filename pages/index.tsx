import React from 'react';
import { useRouter } from 'next/router';
import { Button } from 'antd';
import Image from 'next/image';
import LandingLayout from '../components/LandingLayout/LandingLayout';
import styles from './index.module.scss';

export default function StartMenu(): JSX.Element {
    return <LandingLayout titleChildren={<StartMenuTitle />} bodyChildren={<StartMenuBody />} />;
}

function StartMenuTitle(): JSX.Element {
    return (
        <div className={styles.titleContainer}>
            <div className={styles.titleLogoContainer}>
                <Image src="/images/logo.png" width={100} height={100} />
            </div>
            <div className={styles.titleTextContainer}>
                <div className={styles.titleText}>game of life</div>
                <div className={styles.subtitleText}>a cellular automaton.</div>
            </div>
        </div>
    );
}

function StartMenuBody(): JSX.Element {
    const router = useRouter();

    return (
        <div className={styles.bodyContainer}>
            <div className={styles.text}>live cells with 2 or 3 live neighbors survive.</div>
            <div className={styles.text}>dead cells with 3 live neighbors are reborn.</div>
            <div className={styles.text}>...all other cells die.</div>

            <div className={styles.buttonContainer}>
            
                <Button type="ghost" shape="round" size="large" className={styles.actionButton}>
                    more info
                </Button>

                <Button
                    type="primary"
                    shape="round"
                    size="large"
                    className={styles.actionButton}
                    onClick={() => router.push('/gameoflife')}
                >
                    let&apos;s play
                </Button>
            </div>
        </div>
    );
}
