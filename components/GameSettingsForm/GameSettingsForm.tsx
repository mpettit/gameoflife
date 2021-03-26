import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ColorInput from '../ColorInput/ColorInput';
import { getSettings } from '../../store/settings/settingsSelectors';
import { Row, Col, Checkbox, InputNumber } from 'antd';
import styles from './GameSettingsForm.module.scss';
import { GameOfLifeSettings } from '../../models/game-of-life-settings';
import OkCancel from '../OkCancel/OkCancel';
import * as yup from 'yup';
import { Button, Upload, Spin } from 'antd';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import { convertImageToCoordinateArray } from '../../lib/images/image-processor';
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

export default function GameSettingsForm({ applyText, onApply, cancelText, onCancel }: GameSettingsFormProps): JSX.Element {
    const settings = useSelector(getSettings);
    const formLayoutSpan = { label: 8, input: 16 };
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
            <Row className={styles.formElement}>
                <Col span={formLayoutSpan.label} className={styles.formLabel}>
                    Environment Dimensions:
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
                    {' x '}
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
                </Col>
            </Row>
            <Row className={styles.formElement}>
                <Col span={formLayoutSpan.label} className={styles.formLabel}>
                    Wrap Borders:
                </Col>
                <Col span={formLayoutSpan.input} className={styles.formInput}>
                    <Checkbox
                        checked={formValues.cellSettings?.wrapBorders}
                        onChange={(e) =>
                            setFormValues((prev) => ({ ...prev, cellSettings: { ...prev.cellSettings, wrapBorders: e.target.checked } }))
                        }
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
                    />{' '}
                    ms
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
                    />{' '}
                    px
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
                    <Checkbox
                        checked={formValues.cellSettings?.showVisited}
                        onChange={(e) =>
                            setFormValues((prev) => ({ ...prev, cellSettings: { ...prev.cellSettings, showVisited: e.target.checked } }))
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
            <Row className={styles.formElement}>
                <Col span={formLayoutSpan.label} className={styles.formLabel}>
                    Image:
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
