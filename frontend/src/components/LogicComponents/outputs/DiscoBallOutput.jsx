import React, { useState, useEffect, useRef } from 'react';
import { Handle } from '@xyflow/react';
import styles from "../../../styles/LogicComponents/outputs/DiscoBallOutput.module.css";

const DiscoBallOutput = ({ data, isConnectable, id }) => {
    const [isLit, setIsLit] = useState(true);
    const [color, setColor] = useState('#ff0000'); // Initial color
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']; // Array of colors

    useEffect(() => {
        const interval = setInterval(() => {
            setColor(prevColor => {
                const currentIndex = colors.indexOf(prevColor);
                const nextIndex = (currentIndex + 1) % colors.length;
                return colors[nextIndex];
            });
        }, 2000); // Change color every 2 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.mainContainer}>

                <div className={styles.lampShade} style={{ backgroundColor: color }}>
                    <div className={styles.innerPattern} style={{ backgroundColor: color }} />
                </div>

                <div className={styles.base} />

                <div className={styles.legsContainer}>
                    {/* Single Leg */}
                    <div className={styles.leg}>
                        <div className={styles.legLine} />
                        <Handle
                            type="target"
                            position="bottom"
                            id="single"
                            className={styles.hiddenHandle}
                            isConnectable={isConnectable}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiscoBallOutput;