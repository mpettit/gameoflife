import React from 'react';
import PageHeader from '../PageHeader/PageHeader'
import styles from './Layout.module.scss';

export default function Layout({ children }: { children: JSX.Element[] | JSX.Element }): JSX.Element {
    return (
        <div>
            <PageHeader />
            <div className={styles.childContainer}>{children}</div>
        </div>
    );
}
