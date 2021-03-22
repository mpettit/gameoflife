import React from 'react';
import styles from './LandingLayout.module.scss';

interface LandingLayoutProps {
    titleChildren: JSX.Element | JSX.Element[];
    bodyChildren: JSX.Element | JSX.Element[];
}

export default function LandingLayout({ titleChildren, bodyChildren }: LandingLayoutProps): JSX.Element {
    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>{titleChildren}</div>
            <div className={styles.bodyContainer}>{bodyChildren}</div>
        </div>
    );
}
