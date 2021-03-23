import React from 'react';
import { PageHeader as AntPageHeader } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './PageHeader.module.scss';


export default function PageHeader({ headerRightIcon }: { headerRightIcon: React.ReactNode }): React.FC {
    return (
        <AntPageHeader
            title={<PageHeaderLogo />}
            extra={<div>{headerRightIcon}</div>}
            className={styles.pageHeader}
            backIcon="false"
        ></AntPageHeader>
    );
}

function PageHeaderLogo(): React.FC {
    const router = useRouter();

    function navigateToLanding() {
        router.push('/');
    }

    return (
        <div className={styles.pageHeaderLogoContainer} onClick={() => navigateToLanding()}>
            <Image src="/images/logo.png" width={30} height={30} />
            <div className={styles.pageHeaderLogoText}>game of life</div>
            <div className={styles.pageHeaderLogoSubText}>a cellular automaton.</div>
        </div>
    );
}
