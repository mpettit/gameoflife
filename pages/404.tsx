import React from 'react';
import { useRouter } from 'next/router';
import { Result, Button } from 'antd';
import { FrownTwoTone } from '@ant-design/icons';
import Layout from '../components/Layout/Layout';

export default function FourOhFour(): JSX.Element {
    const router = useRouter();

    function returnToLanding() {
        router.push('/');
    }

    return (
        <Layout>
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
        </Layout>
    );
}
