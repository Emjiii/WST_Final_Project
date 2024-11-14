import React, { useState, useEffect } from 'react';
import { Handle, Position } from '@xyflow/react';
import styles from '../../styles/components/outputs/LedOutput.module.css';

const LedOutput = ({ data, isConnectable, id }) => {
    const [isLit, setIsLit] = useState(false);

    //modify here
    useEffect(() => {
        setIsLit(Boolean(data?.value));
    }, [data?.value]);

    return (
        <div className={styles.container}>
            {/* Main Bulb Body */}
            <div className={`${styles.bulbBody} ${isLit ? styles.lit : styles.unlit}`}>
                {/* Main Highlight */}
                <div className={styles.mainHighlight} />

                {/* Secondary Highlight */}
                <div className={styles.secondaryHighlight} />

                {/* Modern Filament Design */}
                <div className={`${styles.filament} ${isLit ? styles.lit : styles.unlit}`} />
            </div>

            {/* Modern Base Section */}
            <div className={styles.base}>
                {/* Modern Base Ridges */}
                {[...Array(3)].map((_, i) => (
                    <div key={i} className={styles.baseRidge} />
                ))}
            </div>

            {/* Connection Point */}
            <div className={styles.connectionPoint} />

            {/* Hidden Handle */}
            <Handle
                type="target"
                position={Position.Bottom}
                id={`${id}-input`}
                isConnectable={isConnectable}
                className={styles.handle}
            />
        </div>
    );
};

export default LedOutput; 