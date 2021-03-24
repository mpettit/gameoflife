import React from 'react';
import Head from '../Head/Head';
import PageHeader from '../PageHeader/PageHeader';
import { Affix } from 'antd';

interface PageLayoutProps {
    children: JSX.Element | JSX.Element[];
    headerRightIcon?: JSX.Element;
}

export default function PageLayout({ children, headerRightIcon }: PageLayoutProps): JSX.Element {
    return (
        <>
            <Head />
            <Affix>
                <PageHeader headerRightIcon={headerRightIcon} />
            </Affix>
            <div>{children}</div>
        </>
    );
}
