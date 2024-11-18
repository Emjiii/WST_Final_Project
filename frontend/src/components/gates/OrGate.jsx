import React, { useState, useEffect } from 'react';
import { Handle, Position, useEdges, useNodes } from '@xyflow/react';
import axios from 'axios';
import styles from '../../styles/components/gates/OrGate.module.css';
import gateStyles from '../../styles/components/gates/GateStyles.module.css';

export const OrGate = ({ isConnectable, id, data }) => {

    const [input1, setInput1] = useState(null); 
    const [input2, setInput2] = useState(null); 
    const [output, setOutput] = useState(null); 
    const edges = useEdges();
    const nodes = useNodes();   

    useEffect(() => {

        const incomingEdge1 = edges.find(edge => edge.target === id && edge.targetHandle === `${id}-input-1`);
        const incomingEdge2 = edges.find(edge => edge.target === id && edge.targetHandle === `${id}-input-2`);  

        if (incomingEdge1) {
            const sourceNode1 = nodes.find(node => node.id === incomingEdge1.source);
            const inputValue1 = sourceNode1?.data?.value ?? false;
            setInput1(inputValue1);
        } else {
            setInput1(false);
        }

        if (incomingEdge2) {
            const sourceNode2 = nodes.find(node => node.id === incomingEdge2.source);
            const inputValue2 = sourceNode2?.data?.value ?? false;
            setInput2(inputValue2);
        } else {
            setInput2(false);
        }
    }, [edges, nodes, id]);

    useEffect(() => {
        const newOutput = Boolean(input1) || Boolean(input2);
        if (data) {
            data.value = newOutput;
            data.onChange?.(newOutput);
        }

        const timeoutId = setTimeout(() => {
            const orGateState = async () => {
                try {
                    await axios.post('http://localhost:3000/gates/or', {
                        input1: Boolean(input1),
                        input2: Boolean(input2),
                        output: newOutput
                    });
                } catch (error) {
                    console.error('Error updating OR gate state:', error);
                }
            };
            orGateState();
        }, 1000);
    }, [input1, input2, data]);

    return (
        <div className={gateStyles.gateContainer}>
            {/* Input Connection Lines */}
            <div className={styles.inputLine1} />
            <div className={styles.inputLine2} />

            {/* Main Gate Body - Border Background */}
            <div className={styles.gateBorderBackground} />

            {/* Main Gate Body */}
            <div className={styles.gateBody}>
                {/* Gate Label */}
                <span className={gateStyles.gateLabel}>
                    OR
                </span>
            </div>

            {/* Output Connection Line */}
            <div className={styles.outputLine} />

            {/* Input Handles */}
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input-1`}
                isConnectable={isConnectable}
                className={`${gateStyles.handle} ${styles.input1Handle}`}
            />
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input-2`}
                isConnectable={isConnectable}
                className={`${gateStyles.handle} ${styles.input2Handle}`}
            />

            {/* Output Handle */}
            <Handle
                type="source"
                position={Position.Right}
                id={`${id}-output`}
                isConnectable={isConnectable}
                className={`${gateStyles.handle} ${styles.outputHandle}`}
            />
        </div>
    );
};

export default OrGate;
