import React, { useState, useEffect } from 'react';
import { Handle, Position, useEdges, useNodes } from '@xyflow/react';
import axios from 'axios';
import styles from "../../../styles/LogicComponents/gates/GateStyles.module.css";
import nandStyles from "../../../styles/LogicComponents/gates/NandGate.module.css";

export const NandGate = ({ isConnectable, id, data }) => {
    
    const [input1, setInput1] = useState(null);
    const [input2, setInput2] = useState(null);
    const edges = useEdges();
    const nodes = useNodes();   

    useEffect(() => {

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

    useEffect(() => {
        const newOutput = input1 !== null && input2 !== null ? !(Boolean(input1) && Boolean(input2)) : null;
        
        if (data?.setValue) {
            data.setValue(newOutput);
        }
        
        const nandGateState = async () => {
            try {
                await axios.post('http://localhost:3000/gates/nand', {
                    input1: input1 !== null ? Boolean(input1) : null,
                    input2: input2 !== null ? Boolean(input2) : null,
                    output: newOutput
                });
            } catch (error) {
                console.error('Error updating NAND gate state:', error);
            }
        };
        nandGateState();
        console.log('Inputs:', Boolean(input1), Boolean(input2), 'Output:', newOutput);
    }, [input1, input2, data]);

    return (
        <div className={`${styles.gateContainer} ${nandStyles.nandGate}`}>
            {/* Input Connection Lines with Glowing Effect */}
            <div className={nandStyles.inputLineTop}>
                <div className={nandStyles.lineShadow} />
                <div className={nandStyles.lineGlow} />
            </div>
            <div className={nandStyles.inputLineBottom}>
                <div className={nandStyles.lineShadow} />
                <div className={nandStyles.lineGlow} />
            </div>
            
            {/* NOT Bubble with Enhanced Effects - Moved before output line */}
            <div className={nandStyles.notBubble}>
                <div className={nandStyles.notBubbleInner}>
                    <div className={nandStyles.bubbleHighlight} />
                    <div className={nandStyles.bubbleGlow} />
                </div>
            </div>

            {/* Output Connection Line - After NOT bubble */}
            <div className={nandStyles.outputLine}>
                <div className={nandStyles.lineShadow} />
                <div className={nandStyles.lineGlow} />
            </div>

            {/* NAND Gate Body with Enhanced 3D Effects */}
            <div className={styles.andGateShape}>
                <div className={nandStyles.metalEffect} />
                <div className={nandStyles.innerShadow} />
                <div className={nandStyles.highlight} />
                <div className={nandStyles.bevel} />
                <span className={nandStyles.label}>NAND</span>
            </div>

            {/* Handles */}
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input-1`}
                isConnectable={isConnectable}

                className={`${styles.handle} ${nandStyles.inputHandleTop} ${nandStyles.handleEffect}`}
            />
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input-2`}
                isConnectable={isConnectable}

                className={`${styles.handle} ${nandStyles.inputHandleBottom} ${nandStyles.handleEffect}`}
            />
            <Handle
                type="source"
                position={Position.Right}
                id={`${id}-output`}
                isConnectable={isConnectable}

                className={`${styles.handle} ${nandStyles.outputHandle} ${nandStyles.handleEffect}`}
            />
        </div>
    );
};

export default NandGate;
