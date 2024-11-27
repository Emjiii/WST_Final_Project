import React, { useState, useEffect } from 'react';
import { Handle, Position, useEdges, useNodes } from '@xyflow/react';
import axios from 'axios';
import styles from "../../../styles/LogicComponents/gates/GateStyles.module.css";
import xorStyles from "../../../styles/LogicComponents/gates/XorGate.module.css";

export const XorGateCanvas = ({ isConnectable, id, data }) => {

    const [input1, setInput1] = useState(null);
    const [input2, setInput2] = useState(null);
    const [output, setOutput] = useState(null);
    const edges = useEdges();
    const nodes = useNodes();   

    useEffect(() => {
        const updateInputs = () => {
            const incomingEdge1 = edges.find(edge => edge.target === id && edge.targetHandle === `${id}-input-1`);
            const incomingEdge2 = edges.find(edge => edge.target === id && edge.targetHandle === `${id}-input-2`);  

            if (incomingEdge1) {
                const sourceNode1 = nodes.find(node => node.id === incomingEdge1.source);
                const inputValue1 = sourceNode1?.data?.value ?? false;
                setInput1(inputValue1);
                console.log('Input 1 Connected:', inputValue1);
            } else {
                setInput1(null);
                console.log('Input 1 Not Connected');
            }

            if (incomingEdge2) {
                const sourceNode2 = nodes.find(node => node.id === incomingEdge2.source);
                const inputValue2 = sourceNode2?.data?.value ?? false;
                setInput2(inputValue2);
                console.log('Input 2 Connected:', inputValue2);
            } else {
                setInput2(null);
                console.log('Input 2 Not Connected');
            }
        };
        
        updateInputs();
    
    }, [edges, nodes, id]);

    useEffect(() => {
        if (input1 !== null && input2 !== null) {
            const newOutput = Boolean(input1) !== Boolean(input2);
            setOutput(newOutput);

            if (data?.setValue) {
                data.setValue(newOutput);
        }

        const xorGateState = async () => {
            try {
                await axios.post('http://localhost:3000/gates/xor', {
                    input1,
                    input2,
                    output: newOutput
                });
                console.log('Backend Sync Successful:', { input1, input2, output: newOutput });
                } catch (error) {
                    console.error('Error syncing with backend:', error);
                }
            };

            xorGateState();
            console.log('Inputs:', input1, input2, 'Output:', newOutput);
        } else {
            setOutput(null);
            console.log('Incomplete Inputs, Output set to null');
        }
    }, [input1, input2, data]);

     return (
        <div className={`${styles.gateContainer} ${xorStyles.xorGate}`}>
            {/* Input Connection Lines with Glowing Effect */}
            <div className={xorStyles.inputLineTop}>
                <div className={xorStyles.lineShadow} />
                <div className={xorStyles.lineGlow} />
            </div>
            <div className={xorStyles.inputLineBottom}> 
                <div className={xorStyles.lineShadow} />
                <div className={xorStyles.lineGlow} />
            </div>

            {/* Output Connection Line */}
            <div className={xorStyles.outputLine}>
                <div className={xorStyles.lineShadow} />
                <div className={xorStyles.lineGlow} />
            </div>
            
            {/* First Curved Line (XOR Part) */}

            <div className={xorStyles.firstCurveBody}> 
                {/* Gate Label */}
                <div className={xorStyles.metalEffect} />
                <div className={xorStyles.innerShadow} />
                <div className={xorStyles.highlight} />
                <div className={xorStyles.bevel} />
                <div className={xorStyles.firstCurveBorder} />
            </div>
           

            {/* Main Gate Body */}
            <div className={xorStyles.gateBorderBackground} />

            <div className={xorStyles.gateBody}>
                {/* Gate Label */}
                <div className={xorStyles.metalEffect} />
                <div className={xorStyles.innerShadow} />
                <div className={xorStyles.highlight} />
                <div className={xorStyles.bevel} />
                <span className={xorStyles.label}>XOR</span>
            </div>


            {/* Handles */}
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input-1`}
                isConnectable={isConnectable}

                className={`${styles.handle} ${xorStyles.inputHandleTop} ${xorStyles.handleEffect}`}
            />
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input-2`}
                isConnectable={isConnectable}

                className={`${styles.handle} ${xorStyles.inputHandleBottom} ${xorStyles.handleEffect}`}
            />
            <Handle
                type="source"
                position={Position.Right}
                id={`${id}-output`}
                isConnectable={isConnectable}

                className={`${styles.handle} ${xorStyles.outputHandle} ${xorStyles.handleEffect}`}
            />
        </div>
    );
};

export default XorGateCanvas;
