import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Handle, Position } from '@xyflow/react';
import styles from '../../styles/components/inputs/InputSwitch.module.css';

const InputSwitch = ({ data, isConnectable, id }) => {
    const [isOn, setIsOn] = useState(false);

    // Fetch the initial state from the backend
    useEffect(() => {
        const fetchInitialState = async () => {
            try {
                const response = await axios.get(`/api/power-switch/${id}`);
                setIsOn(response.data.state);
            } catch (error) {
                console.error('Error fetching initial state:', error);
            }
        };

        fetchInitialState();
    }, [id]);

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