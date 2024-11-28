import React, { useState, useEffect } from 'react';
import { Handle, Position, useEdges, useNodes } from '@xyflow/react';
import styles from "../../../styles/LogicComponents/outputs/LedOutput.module.css";

const LedOutput = ({ data, isConnectable, id }) => {
    const [isLit, setIsLit] = useState(null);
    const edges = useEdges();
    const nodes = useNodes();

    useEffect(() => {
        // Find edges connected to this node
        const incomingEdge = edges.find(edge => edge.target === id);
        
        if (incomingEdge) {
            // Find the source node using the edge's source id
            const sourceNode = nodes.find(node => node.id === incomingEdge.source);
            console.log('Source node:', sourceNode);
            
            // Access the source node's state
            const inputValue = sourceNode?.data?.value;
            if (data.setValue) {
                data.setValue(inputValue);
            }
            console.log('Input Value:', inputValue);
            
            setIsLit(inputValue);
        } else {
            // Set isLit to false if no incoming edge is found
            setIsLit(false);
        }
    }, [edges, nodes, id]);

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