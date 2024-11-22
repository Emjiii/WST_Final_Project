import React, { useState, useEffect } from 'react';
import { Handle, Position, useEdges, useNodes } from '@xyflow/react';
import axios from 'axios';
import styles from "../../../styles/LogicComponents/gates/GateStyles.module.css";
import bufferStyles from "../../../styles/LogicComponents/gates/BufferGate.module.css";

export const BufferGateCanvas = ({ isConnectable, id, data }) => {

    const [input, setInput] = useState(null);
    const [output, setOutput] = useState(null);
    const edges = useEdges();
    const nodes = useNodes();

    useEffect(() => {
        const updateInputs = () => {
            const incomingEdge = edges.find(edge => edge.target === id && edge.targetHandle === `${id}-input`);
                if (incomingEdge) {
                    const sourceNode = nodes.find(node => node.id === incomingEdge.source);
                    const inputValue = sourceNode?.data?.value ?? false;
                    setInput(inputValue);
                    console.log('Input Connected:', inputValue)
                } else {
                    setInput(null);
                    console.log('Input Not Connected')
                }
        };
       
        updateInputs();
    
    }, [edges, nodes, id]);

    useEffect(() => {
        if (input !== null) {
            const newOutput = Boolean(input);
            setOutput(newOutput);
       
            if (data?.setValue) {
                data.setValue(newOutput);
            }

            const bufferGateState = async () => {
                try {
                    await axios.post('http://localhost:3000/gates/buffer', {
                        input,
                        output: newOutput
                    });
                    console.log('Backend Sync Successful:', { input, output: newOutput });
                } catch (error) {
                    console.error('Error syncing with backend:', error);
                }
            };

            bufferGateState();
            console.log('Inputs:', input, 'Output:', newOutput);
        } else {
            setOutput(null);
            console.log('Incomplete Inputs, Output set to null');
        }
    }, [input, data]);

    return (
        <div className={`${styles.gateContainer} ${bufferStyles.bufferGate}`}>
            {/* Input Connection Lines with Glowing Effect */}
            <div className={bufferStyles.inputLine}>
                <div className={bufferStyles.lineShadow} />
                <div className={bufferStyles.lineGlow} />
            </div>

            {/* Output Connection Line - After NOT bubble */}
            <div className={bufferStyles.outputLine}>
                <div className={bufferStyles.lineShadow} />
                <div className={bufferStyles.lineGlow} />
            </div>

            {/* Triangle Border Background */}
            <div className={bufferStyles.gateBorderBackground} />

            {/* Main Triangle Body */}
            <div className={bufferStyles.gateBody}>
                <div className={bufferStyles.metalEffect} />
                <div className={bufferStyles.innerShadow} />
                <div className={bufferStyles.highlight} />
                <div className={bufferStyles.bevel} />
                <span className={bufferStyles.label}>BUFFER</span>
            </div>

            {/* Input Handle */}
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input`}
                isConnectable={isConnectable}

                className={`${styles.handle} ${bufferStyles.inputHandle} ${bufferStyles.handleEffect}`}
            />

            {/* Output Handle */}
            <Handle
                type="source"
                position={Position.Right}
                id={`${id}-output`}
                isConnectable={isConnectable}

                className={`${styles.handle} ${bufferStyles.outputHandle} ${bufferStyles.handleEffect}`}
            />
        </div>
    );
};

export default BufferGateCanvas;
