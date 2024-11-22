import React, { useState, useEffect } from 'react';
import { Handle, Position, useEdges, useNodes } from '@xyflow/react';
import styles from "../../../styles/LogicComponents/outputs/SpeakerOutput.module.css";

const SpeakerOutput = ({ data, isConnectable, id }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const edges = useEdges();
    const nodes = useNodes();

    useEffect(() => {
        const incomingEdge = edges.find(edge => edge.target === id);
        
        if (incomingEdge) {
            const sourceNode = nodes.find(node => node.id === incomingEdge.source);
            const inputValue = sourceNode?.data?.value;
            setIsPlaying(inputValue);
        } else {
            setIsPlaying(false);
        }
    }, [edges, nodes, id]);

    return (
        <div className={styles.container}>
            <div className={styles.chassis} />
            <div className={styles.frame}>
                <div className={styles.screwTopLeft}></div>
                <div className={styles.screwTopRight}></div>
                <div className={styles.tweeterAssembly}>
                    <div className={styles.tweeterDome}></div>
                </div>
                <div className={styles.speakerCone}>
                    <div className={styles.suspensionRing}></div>
                    <div className={styles.dustCap}></div>
                </div>
                <div className={styles.bassPort}></div>
                <div className={styles.screwBottomLeft}></div>
                <div className={styles.screwBottomRight}></div>
            </div>
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

export default SpeakerOutput;
