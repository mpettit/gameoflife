import React from 'react';
import { Popover } from 'antd';
import { HexColorPicker } from 'react-colorful';
import styles from './ColorInput.module.scss';

interface ColorInputProps {
    color?: string;
    onChange: (color: string) => void;
}

//TODO: make this tab-able
export default function ColorInput({ color, onChange }: ColorInputProps): JSX.Element {

    const colorTitle = color ? color.toLowerCase() : 'none selected';

    return (
        <>
            <Popover
                content={<ColorInputMenu color={color} onChange={(newColor) => onChange(newColor)} />}
                placement="bottomLeft"
                trigger={["click","focus"]}
            >
                <div className={styles.colorInputContainer}>
                    <div className={styles.colorInput} style={{ backgroundColor: color }}></div>
                    <div className={styles.colorInputTitle}>{colorTitle}</div>
                </div>
            </Popover>
        </>
    );
}

interface ColorInputMenuProps {
    color?: string;
    onChange: (color: string) => void;
}

function ColorInputMenu({ color, onChange }: ColorInputMenuProps) {
    return (
        <div className={styles.colorInputMenu}>
            <HexColorPicker className={styles.responsive} color={color} onChange={onChange} />
        </div>
    );
}
