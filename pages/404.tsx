import React from 'react';
import { useRouter } from 'next/router';
import { Result, Button } from 'antd';
import { FrownTwoTone } from '@ant-design/icons';
import PageLayout from '../components/PageLayout/PageLayout';

export default function FourOhFour(): JSX.Element {
    const router = useRouter();

    function returnToLanding() {
        router.push('/');
    }

    return (
        <PageLayout>
            <Result
                icon={<FrownTwoTone />}
                title="404"
                subTitle="Oh no! Looks like we're lost."
                extra={
                    <Button type="primary" shape="round" onClick={returnToLanding}>
                        Return to safety!
                    </Button>
                }
            />
        </PageLayout>
    );
}
