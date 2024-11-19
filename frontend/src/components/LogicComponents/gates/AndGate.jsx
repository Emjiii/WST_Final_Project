import React, { useState, useEffect } from 'react';
import { Handle, Position, useEdges, useNodes } from '@xyflow/react';
import axios from 'axios';
import styles from '../../styles/components/gates/GateStyles.module.css';
import andStyles from '../../styles/components/gates/AndGate.module.css';

export const AndGate = ({ isConnectable, id, data }) => {

    const [input1, setInput1] = useState(null);
    const [input2, setInput2] = useState(null);
    const edges = useEdges();
    const nodes = useNodes();

    // First useEffect to handle input updates
    useEffect(() => {
        // Find edges connected to this node
        const incomingEdge1 = edges.find(edge => edge.target === id && edge.targetHandle === `${id}-input-1`);
        const incomingEdge2 = edges.find(edge => edge.target === id && edge.targetHandle === `${id}-input-2`);

        if (incomingEdge1) {
            const sourceNode1 = nodes.find(node => node.id === incomingEdge1.source);
            const inputValue1 = sourceNode1?.data?.value ?? null;
            setInput1(inputValue1);
        } else {
            setInput1(null);
        }

        if (incomingEdge2) {
            const sourceNode2 = nodes.find(node => node.id === incomingEdge2.source);
            const inputValue2 = sourceNode2?.data?.value ?? null;
            setInput2(inputValue2);
        } else {
            setInput2(null);
        }
    }, [edges, nodes, id]);

    // Separate useEffect for output calculation
    useEffect(() => {
        // Convert inputs to boolean and calculate output
        const newOutput = input1 !== null && input2 !== null ? Boolean(input1) && Boolean(input2) : null;
        
        if (data?.setValue) {
            data.setValue(newOutput);
        }
        
        const andGateState = async () => {
            try {
                await axios.post('http://localhost:3000/gates/and', {
                    input1: input1 !== null ? Boolean(input1) : null,
                    input2: input2 !== null ? Boolean(input2) : null,
                    output: newOutput
                });
               
            } catch (error) {
                console.error('Error updating AND gate state:', error);
            }
        };

        andGateState();
        console.log('Inputs:', Boolean(input1), Boolean(input2), 'Output:', newOutput);
    }, [input1, input2, data]);

    return (
        <div className={styles.gateContainer}>
            {/* Input Connection Lines */}
            <div className={andStyles.inputLineTop} />
            <div className={andStyles.inputLineBottom} />
            
            {/* Output Connection Line */}
            <div className={andStyles.outputLine} />

            {/* AND Gate Body */}
            <div className={styles.andGateShape}>
                <span className={styles.gateLabel}>AND</span>
            </div>

            {/* Input Handles */}
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input-1`}
                isConnectable={isConnectable}
                className={`${styles.handle} ${andStyles.inputHandleTop}`}
            />
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input-2`}
                isConnectable={isConnectable}
                className={`${styles.handle} ${andStyles.inputHandleBottom}`}
            />

            {/* Output Handle */}
            <Handle
                type="source"
                position={Position.Right}
                id={`${id}-output`}
                isConnectable={isConnectable}
                className={`${styles.handle} ${andStyles.outputHandle}`}
            />
        </div>
    );
};

export default AndGate;
