import React from 'react';
import { Button } from 'antd';
import styles from './OkCancel.module.scss';

export interface OkCancelProps {
    applyText: string;
    onApply: () => void;
    cancelText: string;
    onCancel: () => void;
}

export default function OkCancel({ applyText, onApply, cancelText, onCancel }: OkCancelProps): JSX.Element {
    return (
        <div className={styles.buttonContainer}>
            <Button className={styles.button} shape="round" onClick={() => onCancel()}>
                {cancelText}
            </Button>
            <Button className={styles.button} type="primary" shape="round" onClick={() => onApply()}>
                {applyText}
            </Button>
        </div>
    );
}
