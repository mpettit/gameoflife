import React from 'react';
import Head from '../Head/Head';
import styles from './LandingLayout.module.scss';

export default function LandingLayout({ children }: { children: React.ReactNode }): React.FC {
    return (
        <>
            <Head />
            <div className={styles.container}>
                { children }
            </div>
        </>
    );
}
