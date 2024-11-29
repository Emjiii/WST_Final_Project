import React, { useState, useEffect } from 'react';
import { Handle, Position, useEdges, useNodes } from '@xyflow/react';
import axios from 'axios';
import styles from "../../../styles/LogicComponents/gates/GateStyles.module.css";
import andStyles from "../../../styles/LogicComponents/gates/AndGate.module.css";

export const AndGate = ({ isConnectable, id, data }) => {

    const [input1, setInput1] = useState(null);
    const [input2, setInput2] = useState(null);
    const [output, setOutput] = useState(null);
    const edges = useEdges();
    const nodes = useNodes();

    // First useEffect to handle input updates
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

    // Separate useEffect for output calculation
    useEffect(() => {
        // Convert inputs to boolean and calculate output
        if (input1 !== null && input2 !== null) {
            const newOutput = Boolean(input1) && Boolean(input2);
            setOutput(newOutput);

            if (data?.setValue) {
                data.setValue(newOutput);
            }
        
            const andGateState = async () => {
                try {
                    await axios.post('http://localhost:3000/gates/and', {
                        input1,
                        input2,
                        output: newOutput
                    });
                    console.log('Backend Sync Successful:', { input1, input2, output: newOutput });
                } catch (error) {
                    console.error('Error syncing with backend:', error);
                }
            };

            andGateState();
            
            console.log('Inputs:', input1, input2, 'Output:', newOutput);
        } else {
            setOutput(null);
            console.log('Incomplete Inputs, Output set to null');
        }
    }, [input1, input2, data]);

    return (
        <div className={`${styles.gateContainer} ${andStyles.andGate}`}>
            {/* Input Connection Lines with Glowing Effect */}
            <div className={andStyles.inputLineTop}>
                <div className={andStyles.lineShadow} />
                <div className={andStyles.lineGlow} />
            </div>
            <div className={andStyles.inputLineBottom}>
                <div className={andStyles.lineShadow} />
                <div className={andStyles.lineGlow} />
            </div>
            
            {/* Output Connection Line with Glowing Effect */}
            <div className={andStyles.outputLine}>
                <div className={andStyles.lineShadow} />
                <div className={andStyles.lineGlow} />
            </div>

            {/* AND Gate Body with Enhanced 3D Effects */}
            <div className={styles.andGateShape}>
                <div className={andStyles.metalEffect} />
                <div className={andStyles.innerShadow} />
                <div className={andStyles.highlight} />
                <div className={andStyles.bevel} />
                <span className={`${styles.gateLabel} ${andStyles.label}`}>AND</span>
            </div>

            {/* Handles moved to root level, just like NAND gate */}
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input-1`}
                isConnectable={isConnectable}

                className={`${styles.handle} ${andStyles.inputHandleTop} ${andStyles.handleEffect}`}
            />
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input-2`}
                isConnectable={isConnectable}

                className={`${styles.handle} ${andStyles.inputHandleBottom} ${andStyles.handleEffect}`}
            />
            <Handle
                type="source"
                position={Position.Right}
                id={`${id}-output`}
                isConnectable={isConnectable}

                className={`${styles.handle} ${andStyles.outputHandle} ${andStyles.handleEffect}`}
                style={{ right: 0, top: '50%', transform: 'translateY(-50%)' }}
            />
        </div>
    );
};

export default AndGate;
