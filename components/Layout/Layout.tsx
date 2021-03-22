import React from 'react';
import Head from '../Head/Head';
import PageHeader from '../PageHeader/PageHeader';
import styles from './Layout.module.scss';

export default function Layout({ children }: { children: JSX.Element[] | JSX.Element }): JSX.Element {
    return (
        <>
            <Head />
            <PageHeader />
            <div className={styles.childContainer}>{children}</div>
        </>
    );
}
