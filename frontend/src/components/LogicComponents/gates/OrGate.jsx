import React, { useState, useEffect } from 'react';
import { Handle, Position, useEdges, useNodes } from '@xyflow/react';
import axios from 'axios';
import orStyles from "../../../styles/LogicComponents/gates/OrGate.module.css";
import styles from "../../../styles/LogicComponents/gates/GateStyles.module.css";

export const OrGateCanvas = ({ isConnectable, id, data }) => {

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
        const newOutput = input1 !== null && input2 !== null ? Boolean(input1) || Boolean(input2) : null;
        if (data?.setValue) {
            data.setValue(newOutput);
        }

        const orGateState = async () => {
            try {
                    await axios.post('http://localhost:3000/gates/or', {
                        input1: input1 !== null ? Boolean(input1) : null,
                        input2: input2 !== null ? Boolean(input2) : null,
                        output: newOutput
                    });
                } catch (error) {
                    console.error('Error updating OR gate state:', error);
                }
            };
            orGateState();
            console.log('Inputs:', Boolean(input1), Boolean(input2), 'Output:', newOutput);
        }, [input1, input2, data]);

    return (
        <div className={`${styles.gateContainer} ${orStyles.orGate}`}>
             {/* Input Connection Lines with Glowing Effect */}
             <div className={orStyles.inputLineTop}>
                <div className={orStyles.lineShadow} />
                <div className={orStyles.lineGlow} />
            </div>
            <div className={orStyles.inputLineBottom}>
                <div className={orStyles.lineShadow} />
                <div className={orStyles.lineGlow} />
            </div>

            {/* Output Connection Line */}
            <div className={orStyles.outputLine}>
                <div className={orStyles.lineShadow} />
                <div className={orStyles.lineGlow} />
            </div>

            {/* Main Gate Body - Border Background */}
            <div className={orStyles.gateBorderBackground} />

            {/* Main Gate Body */}
            <div className={orStyles.gateBody}>
                {/* Gate Label */}
                <div className={orStyles.metalEffect} />
                <div className={orStyles.innerShadow} />
                <div className={orStyles.highlight} />
                <div className={orStyles.bevel} />
                <span className={orStyles.label}>OR</span>
            </div>

        
            {/* Handles */}
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input-1`}
                isConnectable={isConnectable}

                className={`${styles.handle} ${orStyles.inputHandleTop} ${orStyles.handleEffect}`}
            />
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input-2`}
                isConnectable={isConnectable}

                className={`${styles.handle} ${orStyles.inputHandleBottom} ${orStyles.handleEffect}`}
            />
            <Handle
                type="source"
                position={Position.Right}
                id={`${id}-output`}
                isConnectable={isConnectable}

                className={`${styles.handle} ${orStyles.outputHandle} ${orStyles.handleEffect}`}
            />
        </div>
    );
};


export default OrGateCanvas;
