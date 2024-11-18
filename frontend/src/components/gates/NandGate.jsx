import React, { useState, useEffect } from 'react';
import { Handle, Position, useEdges, useNodes } from '@xyflow/react';
import axios from 'axios';
import styles from '../../styles/components/gates/GateStyles.module.css';
import nandStyles from '../../styles/components/gates/NandGate.module.css';

export const NandGate = ({ isConnectable, id, data }) => {
    
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
        const newOutput = !(Boolean(input1) && Boolean(input2));
        if (data) {
            data.value = newOutput;
            data.onChange?.(newOutput);
        }
        
        const timeoutId = setTimeout(() => {
            const nandGateState = async () => {
                try {
                    await axios.post('http://localhost:3000/gates/nand', {
                        input1: Boolean(input1),
                        input2: Boolean(input2),
                        output: newOutput
                    });
                } catch (error) {
                    console.error('Error updating NAND gate state:', error);
                }
            };
            nandGateState();
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [input1, input2]);

    return (
        <div className={styles.gateContainer}>
            {/* Input Connection Lines */}
            <div className={nandStyles.inputLineTop} />
            <div className={nandStyles.inputLineBottom} />
            
            {/* Output Connection Line */}
            <div className={nandStyles.outputLine} />

            {/* NAND Gate Body */}
            <div className={styles.andGateShape}>
                <span className={styles.gateLabel}>NAND</span>
            </div>

            {/* NOT Bubble */}
            <div className={styles.notBubble}>
                <div className={styles.notBubbleInner} />
            </div>

            {/* Input Handles */}
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input-1`}
                isConnectable={isConnectable}
                className={`${styles.handle} ${nandStyles.inputHandleTop}`}
            />
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input-2`}
                isConnectable={isConnectable}
                className={`${styles.handle} ${nandStyles.inputHandleBottom}`}
            />

            {/* Output Handle */}
            <Handle
                type="source"
                position={Position.Right}
                id={`${id}-output`}
                isConnectable={isConnectable}
                className={`${styles.handle} ${nandStyles.outputHandle}`}
            />
        </div>
    );
};

export default NandGate;
