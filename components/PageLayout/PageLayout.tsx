import React from 'react';
import Head from '../Head/Head';
import PageHeader from '../PageHeader/PageHeader';
import styles from './PageLayout.module.scss';
import { Affix } from 'antd';

export default function PageLayout({ children }: { children: JSX.Element[] | JSX.Element }): JSX.Element {
    return (
        <>
            <Head />
            <Affix>
                <PageHeader />
            </Affix>

            <div className={styles.childContainer}>{children}</div>
        </>
    );
}
