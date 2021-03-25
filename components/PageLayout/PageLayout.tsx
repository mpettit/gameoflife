import React from 'react';
import Head from '../Head/Head';
import PageHeader from '../PageHeader/PageHeader';
import { Affix } from 'antd';
import styles from './PageLayout.module.scss';

interface PageLayoutProps {
    children: JSX.Element | JSX.Element[];
}

export default function PageLayout({ children }: PageLayoutProps): JSX.Element {
    return (
        <>
            <Head />
            <Affix>
                <PageHeader />
            </Affix>
            <div className={styles.childrenContainer}>{children}</div>
        </>
    );
}
