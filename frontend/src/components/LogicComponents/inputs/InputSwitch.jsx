import React, { useState, memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import styles from "../../../styles/LogicComponents/inputs/InputSwitch.module.css";

const InputSwitch = ({ data, isConnectable, id }) => {
    const [isOn, setIsOn] = useState(false);

    const handleClick = () => {
        const newValue = !isOn;
        setIsOn(newValue);
        if (data.setValue) {
            data.setValue(newValue);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.switchWrapper}>
                <div className={styles.baseBorder}>
                    <div className={styles.mainBase}>
                        <div
                            onClick={handleClick}
                            className={`${styles.toggleLever} ${isOn ? styles.on : styles.off}`}
                        >
                            {[...Array(3)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`${styles.leverLine} ${isOn ? styles.on : styles.off}`}
                                    style={{ top: `${30 + i * 20}%` }}
                                />
                            ))}
                        </div>

                        <div 
                            className={`${styles.label} ${styles.labelOn}`}
                            style={{ color: isOn ? '#ffffff' : '#666666' }}
                        >
                            ON
                        </div>

                        <div 
                            className={`${styles.label} ${styles.labelOff}`}
                            style={{ color: !isOn ? '#ffffff' : '#666666' }}
                        >
                            OFF
                        </div>
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

export default memo(InputSwitch); 