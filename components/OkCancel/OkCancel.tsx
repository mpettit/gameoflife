import React from 'react';
import { Button } from 'antd';
import styles from './OkCancel.module.scss';

export interface OkCancelProps {
    okText: string;
    onOk: () => void;
    okDisabled: boolean;
    cancelText: string;
    onCancel: () => void;
}

export default function OkCancel({ okText, onOk, okDisabled, cancelText, onCancel }: OkCancelProps): JSX.Element {
    return (
        <div className={styles.buttonContainer}>
            <Button className={styles.button} shape="round" onClick={() => onCancel()}>
                {cancelText}
            </Button>
            <Button className={styles.button} type="primary" shape="round" disabled={okDisabled} onClick={() => onOk()}>
                {okText}
            </Button>
        </div>
    );
}
