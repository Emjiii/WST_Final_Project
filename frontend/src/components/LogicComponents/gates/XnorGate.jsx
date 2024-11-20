import React, { useState, useEffect } from 'react';
import { Handle, Position, useEdges, useNodes } from '@xyflow/react';
import axios from 'axios';
import styles from "../../../styles/LogicComponents/gates/GateStyles.module.css";
import xnorStyles from "../../../styles/LogicComponents/gates/XnorGate.module.css";

export const XnorGateCanvas = ({ isConnectable, id, data }) => {

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
        const newOutput = input1 !== null && input2 !== null ? !(Boolean(input1) ^ Boolean(input2)) : null;
        if (data?.setValue) {
            data.setValue(newOutput);
        }

        const xnorGateState = async () => {
            try {
                await axios.post('http://localhost:3000/gates/xnor', {
                        input1: input1 !== null ? Boolean(input1) : null,
                        input2: input2 !== null ? Boolean(input2) : null,
                        output: newOutput
                    });
                } catch (error) {
                    console.error('Error updating XNOR gate state:', error);
                }
            };
            xnorGateState();
            console.log('Inputs:', Boolean(input1), Boolean(input2), 'Output:', newOutput);
    }, [input1, input2, data]);

    return (
        <div className={`${styles.gateContainer} ${xnorStyles.xnorGate}`}>
            {/* Input Connection Lines */}
            <div className={xnorStyles.inputLineTop} />
            <div className={xnorStyles.inputLineBottom} />
            
            {/* First Curved Line (XOR Part) */}
            <div className={xnorStyles.firstCurveBorder} />
            <div className={xnorStyles.firstCurveBody} />

            {/* Main Gate Body */}
            <div className={xnorStyles.gateBorderBackground} />
            <div className={xnorStyles.gateBody}>
                <span className={xnorStyles.label}>XNOR</span>
            </div>

            {/* NOT Bubble */}
            <div className={xnorStyles.notBubble}>
                <div className={xnorStyles.notBubbleInner} />
            </div>

            {/* Output Connection Line */}
            <div className={xnorStyles.outputLine} />

            {/* Handles */}
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input-1`}
                isConnectable={isConnectable}

                className={`${styles.handle} ${xnorStyles.inputHandleTop}`}
            />
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input-2`}
                isConnectable={isConnectable}

                className={`${styles.handle} ${xnorStyles.inputHandleBottom}`}
            />
            <Handle
                type="source"
                position={Position.Right}
                id={`${id}-output`}
                isConnectable={isConnectable}

                className={`${styles.handle} ${xnorStyles.outputHandle}`}
            />
        </div>
    );
};


export default XnorGateCanvas;
