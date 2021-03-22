import React, { useEffect } from 'react';
import { Form } from 'antd';

export default function GameOptionForm() {
    // environmentDimensions: EnvironmentCoordinate,
    // evolutionInterval: number,
    // initialAliveCongiguration: EnvironmentCoordinate[],
    // cellOptions: GameOfLifeCellOptions,
    // aliveColor: string,
    // visitedColor: string,
    // deadColor: string,
    // showVisited: boolean,
    // cellSize: number,

    return (
        <div>
            <Form
                {...formItemLayout}
                layout={formLayout}
                form={form}
                initialValues={{ layout: formLayout }}
                onValuesChange={onFormLayoutChange}
            ></Form>
            <Form.Item label="InputNumber">
                <Form.Item name="input-number" noStyle>
                    <InputNumber min={1} max={10} />
                </Form.Item>
                <span className="ant-form-text"> machines</span>
            </Form.Item>
        </div>
    );
}
