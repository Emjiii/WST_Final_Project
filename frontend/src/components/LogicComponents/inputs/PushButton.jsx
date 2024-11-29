import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {memo} from 'react';
import { Handle, Position } from '@xyflow/react';
import styles from "../../../styles/LogicComponents/inputs/PushButton.module.css";

export const PushButton = ({ data, isConnectable, id }) => {
    const [isPressed, setIsPressed] = useState(false);

    useEffect(() => {
        const fetchInitialState = async () => {
            try{
                const response = await axios.get(`/api/power-switch/${id}`);
                setIsPressed(response.data.state);
                console.log(response.data.state)
            } catch (error) {
                console.error('Error fetching initial state:', error);
            }

        };

        fetchInitialState();
    }, [id]);

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