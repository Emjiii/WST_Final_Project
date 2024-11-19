import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import styles from '../../styles/components/inputs/PushButton.module.css';

export const PushButton = ({ isConnectable, id }) => {
    const [isPressed, setIsPressed] = useState(false);

    //modify hereeee
    const handleClick = (e) => {
        e.stopPropagation();
        setIsPressed(!isPressed);
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

export default PushButton; 