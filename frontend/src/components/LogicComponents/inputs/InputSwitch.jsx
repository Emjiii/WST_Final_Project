import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { memo } from 'react';   
import { Handle, Position } from '@xyflow/react';
import styles from "../../../styles/LogicComponents/inputs/InputSwitch.module.css";

const InputSwitch = ({ data, isConnectable, id }) => {
    const [isOn, setIsOn] = useState(false);

    //Fetch the initial state from the backend
    useEffect(() => {
        const fetchInitialState = async () => {
            try {
                const response = await axios.get(`/api/power-switch/${id}`);
                setIsOn(response.data.state);
                console.log(response.data.state);
            } catch (error) {
                console.error('Error fetching initial state:', error);
            }
        };

        fetchInitialState();
    }, [id]);

    const handleClick = async () => {
        const newState = !isOn;
        setIsOn(newState);
        if (data.setValue) {
            data.setValue(newState);
        }
        // try {
        //     await axios.post('http://localhost:3000/api/input-switch', {
        //         id,
        //         state: newState
        //     });
        // } catch (error) {
        //     console.error('Error updating switch state:', error);
        // }
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
