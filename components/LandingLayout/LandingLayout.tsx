import React from 'react';
import Head from '../Head/Head';
import styles from './LandingLayout.module.scss';

export default function LandingLayout({ children }: { children: JSX.Element | JSX.Element[] }): JSX.Element {
    return (
        <>
            <Head />
            <div className={styles.container}>
                { children }
            </div>
        </>
    );
}
