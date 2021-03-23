import React from 'react';
import { useRouter } from 'next/router';
import { Result, Button } from 'antd';
import { FrownTwoTone } from '@ant-design/icons';
import PageLayout from '../components/PageLayout/PageLayout';

export default function FourOhFour(): React.FC {
    const router = useRouter();

    function navigateToLanding() {
        router.push('/');
    }

    return (
        <PageLayout>
            <Result
                icon={<FrownTwoTone />}
                title="404"
                subTitle="Oh no! Looks like we're lost."
                extra={
                    <Button type="primary" shape="round" onClick={navigateToLanding}>
                        Return to safety!
                    </Button>
                }
            />
        </PageLayout>
    );
}
