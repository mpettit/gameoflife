import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ColorInput from '../ColorInput/ColorInput';
import { getSettings } from '../../store/settings/settingsSelectors';
import { Row, Col, Button, Checkbox, InputNumber, Upload, Spin, Typography } from 'antd';
import styles from './GameSettingsForm.module.scss';
import { GameOfLifeSettings } from '../../models/game-of-life-settings';
import OkCancel from '../OkCancel/OkCancel';
import * as yup from 'yup';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import { convertImageToCoordinateArray } from '../../lib/images/image-processor';

const { Title } = Typography;
interface GameSettingsFormProps {
    applyText: string;
    onApply: (settings: GameOfLifeSettings) => void;
    cancelText: string;
    onCancel: () => void;
}

const hexColorRegex = new RegExp('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$');
const formSchema = yup
    .object()
    .shape({
        environmentHeight: yup.number().label('Environment height').min(0).max(1000).required(),
        environmentWidth: yup.number().label('Environment width').min(0).max(1000).required(),
        evolutionInterval: yup.number().label('Environment interval').min(30).required(),
        cellSettings: yup
            .object()
            .shape({
                aliveColor: yup.string().label('Alive color').matches(hexColorRegex).required(),
                visitedColor: yup.string().label('Visited color').matches(hexColorRegex).required(),
                deadColor: yup.string().label('Dead color').matches(hexColorRegex).required(),
                showVisited: yup.boolean().label('Show visited toggle'),
                cellSize: yup.number().label('Cell size').min(0).max(50).required(),
            })
            .noUnknown(false),
    })
    .noUnknown(false);

const sectionLevel = 5;
const fullRow = 24;
const formLayoutSpan = { label: 5, input: 19, inputWithCheckbox: 12, checkbox: 7 };

export default function GameSettingsForm({ applyText, onApply, cancelText, onCancel }: GameSettingsFormProps): JSX.Element {
    const settings = useSelector(getSettings);
    const [error, setError] = useState<string | undefined>(undefined);
    const [isImageProcessing, setIsImageProcessing] = useState(false);
    const [formValues, setFormValues] = useState(settings);

    useEffect(() => {
        // update form values whenever state settings change
        setFormValues((prev) => ({
            ...prev,
            ...settings,
        }));
    }, [settings]);

    function calculateImageToCoordinateArray(file: File, height: number, width: number, matchImageAspectRatio = false): void {
        setIsImageProcessing(true);
        convertImageToCoordinateArray(file, height, width, matchImageAspectRatio)
            .then((coordinateData) => {
                const { initialAliveCoordinates, initialVisitedCoordinates, height } = coordinateData;
                setFormValues((prev) => ({
                    ...prev,
                    environmentHeight: height,
                    initialAliveCoordinates,
                    initialVisitedCoordinates,
                }));
            })
            .catch((e) => {
                setError((prev) => prev + ' ' + e);
            })
            .finally(() => {
                setIsImageProcessing(false);
            });
    }

    function onFileUpload(file: File, height: number, width: number): boolean {
        setFormValues((prev) => ({ ...prev, uploadFile: file }));
        calculateImageToCoordinateArray(file, height, width, true);
        return false;
    }

    function onFileRemove(): void {
        setFormValues((prev) => ({ ...prev, initialAliveCoordinates: settings.initialAliveCoordinates, uploadFile: undefined }));
    }

    function validateAndApply(): void {
        if (isImageProcessing) {
            setError('Image is still processing');
            return;
        }

        formSchema
            .validate(formValues)
            .then(() => {
                //success
                onApply(formValues);
            })
            .catch((err) => {
                setError(err.errors.join('. '));
            });
    }

    return (
        <>
            {error && <div className={styles.errorMessage}>{error}</div>}

            <Title level={sectionLevel}>Environment</Title>
            <Row className={styles.formElement}>
                <Col span={formLayoutSpan.label} className={styles.formLabel}>
                    dimensions:
                </Col>
                <Col span={formLayoutSpan.input} className={styles.formInput}>
                    <InputNumber
                        placeholder="height"
                        value={formValues.environmentHeight}
                        onChange={(environmentHeight) => {
                            if (environmentHeight > 0 && formValues.uploadFile !== undefined) {
                                calculateImageToCoordinateArray(formValues.uploadFile, environmentHeight, formValues.environmentWidth);
                            }
                            setFormValues((prev) => ({ ...prev, environmentHeight }));
                        }}
                    />
                    <div>x</div>
                    <InputNumber
                        placeholder="width"
                        value={formValues.environmentWidth}
                        onChange={(environmentWidth) => {
                            if (environmentWidth > 0 && formValues.uploadFile !== undefined) {
                                calculateImageToCoordinateArray(formValues.uploadFile, formValues.environmentHeight, environmentWidth);
                            }
                            setFormValues((prev) => ({ ...prev, environmentWidth }));
                        }}
                    />
                    <Checkbox
                        className={styles.marginLeft25}
                        checked={formValues.cellSettings?.wrapBorders}
                        onChange={(e) =>
                            setFormValues((prev) => ({
                                ...prev,
                                cellSettings: { ...prev.cellSettings, wrapBorders: e.target.checked },
                            }))
                        }
                    >
                        wrap borders
                    </Checkbox>
                </Col>
            </Row>
            <Row className={styles.formElement}>
                <Col span={formLayoutSpan.label} className={styles.formLabel}>
                    interval:
                </Col>
                <Col span={formLayoutSpan.input} className={styles.formInput}>
                    <InputNumber
                        placeholder="interval"
                        value={formValues.evolutionInterval}
                        onChange={(evolutionInterval) => setFormValues((prev) => ({ ...prev, evolutionInterval }))}
                    />{' '}
                    <div>ms</div>
                </Col>
            </Row>
            <Row className={styles.formElement}>
                <Col span={formLayoutSpan.label} className={styles.formLabel}>
                    cell Size:
                </Col>
                <Col span={formLayoutSpan.input} className={styles.formInput}>
                    <InputNumber
                        placeholder="dimension"
                        value={formValues.cellSettings?.cellSize}
                        onChange={(cellSize) => setFormValues((prev) => ({ ...prev, cellSettings: { ...prev.cellSettings, cellSize } }))}
                    />{' '}
                    <div>px</div>
                </Col>
            </Row>
            <Title level={sectionLevel}>Colors</Title>
            <Row className={styles.formElement}>
                <Col span={formLayoutSpan.label} className={styles.formLabel}>
                    alive cell:
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
                    visited cell:
                </Col>
                <Col span={formLayoutSpan.input} className={styles.formInput}>
                    <ColorInput
                        color={formValues.cellSettings?.visitedColor}
                        onChange={(visitedColor) =>
                            setFormValues((prev) => ({ ...prev, cellSettings: { ...prev.cellSettings, visitedColor } }))
                        }
                    />
                    <Checkbox
                        className={styles.marginLeft25}
                        checked={formValues.cellSettings?.showVisited}
                        onChange={(e) =>
                            setFormValues((prev) => ({
                                ...prev,
                                cellSettings: { ...prev.cellSettings, showVisited: e.target.checked },
                            }))
                        }
                    >
                        show visited
                    </Checkbox>
                </Col>
            </Row>
            <Title level={sectionLevel}>Starting State</Title>
            <Row className={styles.formElement}>
                <Col span={formLayoutSpan.label} className={styles.formLabel}>
                    image:
                </Col>
                <Col span={formLayoutSpan.input} className={styles.formInput}>
                    <Spin spinning={isImageProcessing} indicator={<LoadingOutlined spin />}>
                        <Upload
                            accept="image/png, image/jpeg"
                            onRemove={() => onFileRemove()}
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            defaultFileList={settings.uploadFile !== undefined ? ([settings.uploadFile] as any[]) : []}
                            beforeUpload={(file) => onFileUpload(file, formValues.environmentHeight, formValues.environmentWidth)}
                        >
                            <Button disabled={formValues.uploadFile !== undefined} icon={<UploadOutlined />}>
                                Select File
                            </Button>
                        </Upload>
                    </Spin>
                </Col>
            </Row>

            <div className={styles.buttonContainer}>
                <OkCancel applyText={applyText} onApply={() => validateAndApply()} cancelText={cancelText} onCancel={onCancel} />
            </div>
        </>
    );
}
