import React from 'react';
import { PageHeader as AntPageHeader } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './PageHeader.module.scss';

export default function PageHeader(): JSX.Element {
    return <AntPageHeader title={<PageHeaderLogo />} className={styles.pageHeader} backIcon="false"></AntPageHeader>;
}

function PageHeaderLogo(): JSX.Element {
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
