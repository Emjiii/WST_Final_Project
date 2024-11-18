import React, { useState, useEffect } from 'react';
import { Handle, Position, useEdges, useNodes } from '@xyflow/react';
import axios from 'axios';
import norStyles from '../../styles/components/gates/NorGate.module.css';
import styles from '../../styles/components/gates/GateStyles.module.css';

export const NorGate = ({ isConnectable, id, data }) => {

    const [input1, setInput1] = useState(null);
    const [input2, setInput2] = useState(null);
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
        const newOutput = !(Boolean(input1) || Boolean(input2));
        if (data?.setValue) {
            data.setValue(newOutput);
        }

        const norGateState = async () => {
            try {
                await axios.post('http://localhost:3000/gates/nor', {
                    input1: Boolean(input1),
                    input2: Boolean(input2),
                    output: newOutput
                });
            } catch (error) {
                console.error('Error updating NOR gate state:', error);
            }
        };
        norGateState();
    }, [input1, input2, data]);

    return (
        <div className={styles.gateContainer}>
            {/* Input Connection Lines */}
            <div className={norStyles.inputLine1} />
            <div className={norStyles.inputLine2} />

            {/* Main Gate Body - Border Background */}
            <div className={norStyles.gateBorderBackground} />

            {/* Main Gate Body */}
            <div className={norStyles.gateBody}>
                {/* Gate Label */}
                <span className={styles.gateLabel}>
                    NOR
                </span>
    
            </div>

            {/* Output Connection Line */}
            <div className={norStyles.outputLine} />

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
                className={`${styles.handle} ${norStyles.input1Handle}`}
            />
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input-2`}
                isConnectable={isConnectable}
                className={`${styles.handle} ${norStyles.input2Handle}`}
            />

            {/* Output Handle */}
            <Handle
                type="source"
                position={Position.Right}
                id={`${id}-output`}
                isConnectable={isConnectable}
                className={`${styles.handle} ${norStyles.outputHandle}`}
            />
        </div>
    );
};

export default NorGate;
