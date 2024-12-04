import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {memo} from 'react';
import { Handle, Position } from '@xyflow/react';
import styles from "../../../styles/LogicComponents/inputs/PushButton.module.css";

const PushButton = ({ data, isConnectable, id }) => {
    const [isPressed, setIsPressed] = useState(data.value || false);

    useEffect(() => {
       if (data.value !== undefined) {
        setIsPressed(data.value);
       }
    }, [data.value]);

    const handleClick = (e) => {
        e.stopPropagation();
        const newState = !isPressed;
        setIsPressed(newState);
        if (data.setValue) {
            data.setValue(newState);
        }
    };

    return (
        <div className={styles.container}>
            <label className={styles.label}>Button</label>
            
            {/* Outer metallic ring */}
            <div className={styles.outerRing}>
                {/* Inner metallic ring */}
                <div className={styles.innerRing}>
                    {/* Button itself */}
                    <div
                        onClick={handleClick}
                        className={`${styles.button} ${isPressed ? styles.pressed : styles.unpressed}`}
                    >
                        <span className={`${styles.buttonText} ${isPressed ? styles.pressed : styles.unpressed}`}>
                            {isPressed ? '1' : '0'}
                        </span>
                    </div>
                </div>
            </div>

            <Handle
                type="source"
                position={Position.Right}
                id={`${id}-output`}
                isConnectable={isConnectable}
                className={styles.handle}
            />
        </div>
    );
};

export default memo(PushButton); 