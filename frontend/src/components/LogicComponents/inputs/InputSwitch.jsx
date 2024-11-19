import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Handle, Position } from '@xyflow/react';
import styles from '../../styles/components/inputs/InputSwitch.module.css';

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
        try {
            await axios.post('http://localhost:3000/api/input-switch', {
                id,
                state: newState
            });
        } catch (error) {
            console.error('Error updating switch state:', error);
        }
    };

    // const handleConnect = async (params) => {
    //     // Create connection data with state
    //     const connectionWithState = {
    //         ...params,
    //         data: { state: isOn }  // Include the current switch state
    //     };

    //     console.log('Connection made with state: ', connectionWithState);

    //     // Update local state with new connection
    //     setConnections(prevConnections => [...prevConnections, connectionWithState]);

    //     // Make API call to save the connection with state
    //     try {
    //         const response = await axios.post('http://localhost:3000/api/connections', connectionWithState);
    //         console.log('Connection saved:', response.data);
    //     } catch (error) {
    //         console.error('Error saving connection:', error);
    //     }
    // };

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
                //onConnect={handleConnect}
            />
        </div>
    );
};

export default InputSwitch; 