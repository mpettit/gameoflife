import React, { useState } from 'react';
import { Input, Popover } from 'antd';
import { HexColorPicker } from 'react-colorful';
import styles from './ColorInput.module.scss';

interface ColorInputProps {
    initialColor?: string;
    onColorChange: () => void;
}

export default function ColorInput({ initialColor, onColorChange }: ColorInputProps): JSX.Element {
    const [color, setColor] = useState(initialColor);

    function onColorInputChange(color: string) {
        setColor(color);
        onColorChange(color);
    }

    const colorTitle = color ? color.toLowerCase() : 'none selected';

    return (
        <>
            <Popover
                content={<ColorInputMenu color={color} onChange={(color) => onColorInputChange(color)} />}
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
