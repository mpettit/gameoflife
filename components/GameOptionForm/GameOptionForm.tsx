import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ColorInput from './ColorInput/ColorInput';
import { getSettings } from '../../store/settings/settingsSelectors';
import { changeCellSetting, changeSetting } from '../../store/settings/settingsActions';
import { Form, Switch, InputNumber, Input } from 'antd';

export default function GameOptionForm(): JSX.Element {
    // environmentDimensions: EnvironmentCoordinate,        --> Double Number input
    // evolutionInterval: number,                           --> Number  input
    // initialAliveCongiguration: EnvironmentCoordinate[],  --> MORE
    // aliveColor: string,                                  --> color picker
    // visitedColor: string,                                --> color picker
    // deadColor: string,                                   --> color picker
    // showVisited: boolean,                                --> slider switch
    // cellSize: number,                                    --> number input

    const settings = useSelector(getSettings);
    const dispatch = useDispatch();

    const [showVisitedColorInput, setShowVisitedColorInput] = useState(false);

    return (
        <div>
            {/* <Form requiredMark="false">
                <Form.Item label="Environment Dimentions">
                    <Input.Group compact>
                        <Form.Item name={['dimensions', 'height']} noStyle rules={[{ required: true, message: 'Please provide an environment height!' }]}>
                            <InputNumber placeholder="height" />
                        </Form.Item>
                        <Form.Item name={['dimensions', 'width']} noStyle rules={[{ required: true, message: 'Please provide an environment width!' }]}>
                            <InputNumber placeholder="width" />
                        </Form.Item>
                    </Input.Group>
                </Form.Item>
                <Form.Item
                    label="Evolution Interval"
                    name="interval"
                    rules={[{ required: true, message: 'Please enter an evolution interval!' }]}
                >
                    <InputNumber placeholder="interval" />
                </Form.Item>
                <Form.Item
                    label="Cell Dimensions"
                    name="cellDimensions"
                    rules={[{ required: true, message: 'Please enter a dimensions for the cells!' }]}
                >
                    <InputNumber placeholder="dimension" />
                </Form.Item>

                <Form.Item
                    label="Alive Cell Color"
                    name="aliveColor"
                    valuePropName="color"
                    rules={[{ required: true, message: 'Please choose a color for alive cells!' }]}
                >
                    <ColorInput //TODO: is valuePropName correct?
                        initialColor={settings.cellSettings.aliveColor}
                        onColorChange={(color) => dispatch(changeCellSetting({ aliveColor: color }))}
                    />
                </Form.Item>
                <Form.Item
                    label="Dead Cell Color"
                    name="deadColor"
                    valuePropName="color"
                    rules={[{ required: true, message: 'Please choose a color for dead cells!' }]}
                >
                    <ColorInput
                        initialColor={settings.cellSettings.deadColor}
                        onColorChange={(color) => dispatch(changeCellSetting({ deadColor: color }))}
                    />
                </Form.Item>
                <Form.Item label="Show Visited Cells" name="showVisited">
                    <Switch onChange={(checked) => setShowVisitedColorInput(checked)} />
                </Form.Item>
                {showVisitedColorInput && (
                    <Form.Item
                        label="Visited Cell Color"
                        name="visitedColor"
                        valuePropName="color"
                        rules={[{ required: true, message: 'Please choose a color for visited cells!' }]}
                    >
                        <ColorInput
                            initialColor={settings.cellSettings.visitedColor}
                            onColorChange={(color) => dispatch(changeCellSetting({ visitedColor: color }))}
                        />
                    </Form.Item>
                )}
            </Form> */}
        </div>
    );
}
