import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import styles from '../../styles/components/inputs/InputSwitch.module.css';

const InputSwitch = ({ data, isConnectable, id }) => {
    const [isOn, setIsOn] = useState(false);

    //MOdify here 
    const handleClick = () => {
        setIsOn(!isOn);
        if (data.setValue) {
            data.setValue(!isOn);
        }
    };

    
    return (
        <div className={styles.container}>
            {/* Base Border */}
            <div className={styles.baseBorder} />

            {/* Main Base */}
            <div className={styles.mainBase}>
                {/* Toggle Lever */}
                <div
                    onClick={handleClick}
                    className={`${styles.toggleLever} ${isOn ? styles.on : styles.off}`}
                >
                    {/* Lever Handle Lines */}
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className={`${styles.leverLine} ${isOn ? styles.on : styles.off}`}
                            style={{ top: `${30 + i * 20}%` }}
                        />
                    ))}
                </div>

                {/* Labels */}
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

            {/* Output Handle */}
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

export default InputSwitch; 