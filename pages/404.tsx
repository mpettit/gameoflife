import React from 'react';
import { useRouter } from 'next/router';
import { Result, Button } from 'antd';
import { FrownTwoTone } from '@ant-design/icons';
import PageLayout from '../components/PageLayout/PageLayout';

export default function FourOhFour(): JSX.Element {
    const router = useRouter();

    function navigateToLanding() {
        router.push('/');
    }

    return (
        <PageLayout>
            <Result
                icon={<FrownTwoTone />}
                title="Oh no!"
                subTitle="No signs of life here."
                extra={
                    <Button type="primary" shape="round" onClick={navigateToLanding}>
                        Return to safety!
                    </Button>
                }
            />
        </PageLayout>
    );
}
