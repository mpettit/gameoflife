import React from 'react';
import Head from '../Head/Head';
import PageHeader from '../PageHeader/PageHeader';
import { Affix } from 'antd';

interface PageLayoutProps {
    children: React.ReactNode;
    headerRightIcon: React.ReactNode;
}

export default function PageLayout({ children, headerRightIcon }: PageLayoutProps): React.FC {
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
