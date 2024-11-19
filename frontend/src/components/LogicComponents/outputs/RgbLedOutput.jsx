import React, { useState, useEffect } from 'react';
import { Handle } from '@xyflow/react';
import styles from '../../styles/components/outputs/RgbLedOutput.module.css';

const RgbLedOutput = ({ data, isConnectable, id }) => {
    const [isLit, setIsLit] = useState(true);

    //modify hereee
    useEffect(() => {
        setIsLit(Boolean(data?.value));
    }, [data?.value]);

    return (
        <div className={styles.container}>
            <div className={styles.mainContainer}>
                {/* LED Dome */}
                <div className={`${styles.ledDome} ${isLit ? styles.lit : styles.unlit}`}>
                    {/* Inner angular pattern */}
                    <div className={`${styles.innerPattern} ${isLit ? styles.lit : styles.unlit}`} />
                </div>

                {/* Base Ring */}
                <div className={`${styles.baseRing} ${isLit ? styles.lit : styles.unlit}`} />

                {/* LED Legs with Handles */}
                <div className={styles.legsContainer}>
                    {/* Left Leg */}
                    <div className={styles.leg}>
                        <div className={styles.legLine} />
                        <Handle
                            type="target"
                            position="bottom"
                            id="left"
                            className={styles.handle}
                            isConnectable={isConnectable}
                        />
                    </div>

                    {/* Right Leg */}
                    <div className={styles.leg}>
                        <div className={styles.legLine} />
                        <Handle
                            type="target"
                            position="bottom"
                            id="right"
                            className={styles.handle}
                            isConnectable={isConnectable}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RgbLedOutput; 