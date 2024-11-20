import React, { useState, useEffect } from 'react';
import { Handle } from '@xyflow/react';
import styles from "../../../styles/LogicComponents/outputs/RgbLedOutput.module.css";

const RgbLedOutput = ({ data, isConnectable, id }) => {
    const [isLit, setIsLit] = useState(true);

    useEffect(() => {
        setIsLit(Boolean(data?.value));
    }, [data?.value]);

    return (
        <div className={styles.container}>
            <div className={styles.mainContainer}>

                <div className={`${styles.ledDome} ${isLit ? styles.lit : styles.unlit}`}>
                    <div className={`${styles.innerPattern} ${isLit ? styles.lit : styles.unlit}`} />
                </div>

                <div className={`${styles.baseRing} ${isLit ? styles.lit : styles.unlit}`} />

                <div className={styles.legsContainer}>
                    {/* Left Leg */}
                    <div className={styles.leg}>
                        <div className={styles.legLine} />
                        <Handle
                            type="target"
                            position="bottom"
                            id="left"

                            className={styles.hiddenHandle}
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

                            className={styles.hiddenHandle}
                            isConnectable={isConnectable}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RgbLedOutput; 