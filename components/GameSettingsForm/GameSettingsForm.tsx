import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ColorInput from '../ColorInput/ColorInput';
import { getSettings } from '../../store/settings/settingsSelectors';
import { Row, Col, Switch, InputNumber } from 'antd';
import styles from './GameSettingsForm.module.scss';
import { GameOfLifeSettings } from '../../models/game-of-life-settings';
import OkCancel from '../OkCancel/OkCancel';

interface GameSettingsFormProps {
    applyText: string;
    onApply: (settings: GameOfLifeSettings) => void;
    cancelText: string;
    onCancel: () => void;
}

export default function GameSettingsForm({ applyText, onApply, cancelText, onCancel }: GameSettingsFormProps): JSX.Element {
    const settings = useSelector(getSettings);
    const [formValues, setFormValues] = useState(settings);

    useEffect(()=>{
        // update form values whenever state settings change
        setFormValues(prev => ({
            ...prev,
            ...settings,
        }))
    }, [settings])

    const formLayoutSpan = { label: 8, input: 16 };

    //TODO: add validation
    return (
        <>
            <Row className={styles.formElement}>
                <Col span={formLayoutSpan.label} className={styles.formLabel}>
                    Environment Dimensions:
                </Col>
                <Col span={formLayoutSpan.input} className={styles.formInput}>
                    <InputNumber
                        placeholder="height"
                        value={formValues.environmentHeight}
                        onChange={(environmentHeight) => setFormValues((prev) => ({ ...prev, environmentHeight }))}
                    />
                    {' x '}
                    <InputNumber
                        placeholder="width"
                        value={formValues.environmentWidth}
                        onChange={(environmentWidth) => setFormValues((prev) => ({ ...prev, environmentWidth }))}
                    />
                </Col>
            </Row>
            <Row className={styles.formElement}>
                <Col span={formLayoutSpan.label} className={styles.formLabel}>
                    Environment Interval:
                </Col>
                <Col span={formLayoutSpan.input} className={styles.formInput}>
                    <InputNumber
                        placeholder="interval"
                        value={formValues.evolutionInterval}
                        onChange={(evolutionInterval) => setFormValues((prev) => ({ ...prev, evolutionInterval }))}
                    />
                </Col>
            </Row>
            <Row className={styles.formElement}>
                <Col span={formLayoutSpan.label} className={styles.formLabel}>
                    Cell Size:
                </Col>
                <Col span={formLayoutSpan.input} className={styles.formInput}>
                    <InputNumber
                        placeholder="dimension"
                        value={formValues.cellSettings?.cellSize}
                        onChange={(cellSize) => setFormValues((prev) => ({ ...prev, cellSettings: { ...prev.cellSettings, cellSize } }))}
                    />
                </Col>
            </Row>
            <Row className={styles.formElement}>
                <Col span={formLayoutSpan.label} className={styles.formLabel}>
                    Alive Cell Color:
                </Col>
                <Col span={formLayoutSpan.input} className={styles.formInput}>
                    <ColorInput
                        color={formValues.cellSettings?.aliveColor}
                        onChange={(aliveColor) =>
                            setFormValues((prev) => ({ ...prev, cellSettings: { ...prev.cellSettings, aliveColor } }))
                        }
                    />
                </Col>
            </Row>
            <Row className={styles.formElement}>
                <Col span={formLayoutSpan.label} className={styles.formLabel}>
                    Show Visited Cells:
                </Col>
                <Col span={formLayoutSpan.input} className={styles.formInput}>
                    <Switch
                        checked={formValues.cellSettings?.showVisited}
                        onChange={(showVisited) =>
                            setFormValues((prev) => ({ ...prev, cellSettings: { ...prev.cellSettings, showVisited } }))
                        }
                    />
                </Col>
            </Row>
            {formValues.cellSettings?.showVisited && (
                <Row className={styles.formElement}>
                    <Col span={formLayoutSpan.label} className={styles.formLabel}>
                        Visited Cell Color:
                    </Col>
                    <Col span={formLayoutSpan.input} className={styles.formInput}>
                        <ColorInput
                            color={formValues.cellSettings?.visitedColor}
                            onChange={(visitedColor) =>
                                setFormValues((prev) => ({ ...prev, cellSettings: { ...prev.cellSettings, visitedColor } }))
                            }
                        />
                    </Col>
                </Row>
            )}
            <OkCancel applyText={applyText} onApply={() => onApply(formValues)} cancelText={cancelText} onCancel={onCancel} />
        </>
    );
}
