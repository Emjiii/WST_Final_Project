import React, { useState, useEffect } from 'react';
import { Handle, Position, useEdges, useNodes } from '@xyflow/react';
import axios from 'axios';
import styles from "../../../styles/LogicComponents/gates/GateStyles.module.css";
import notStyles from "../../../styles/LogicComponents/gates/NotGate.module.css";


export const NotGateCanvas = ({ isConnectable, id, data }) => {

    const [input, setInput] = useState(null);
    const [output, setOutput] = useState(null);
    const edges = useEdges();
    const nodes = useNodes();

    useEffect(() => {
        const updateInput = () => {
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
        updateInput();
    }, [edges, nodes, id]);

    useEffect(() => {
        if (input !== null) {
            const newOutput = !Boolean(input)
            setOutput(newOutput);
        
            if (data?.setValue) {
                data.setValue(newOutput);
            }

            const notGateState = async () => {
                try {
                    await axios.post('http://localhost:3000/gates/not', {
                        input,
                        output: newOutput
                    });
                    console.log('Backend Sync Successful:', { input, output: newOutput });
                } catch (error) {
                    console.error('Error syncing with backend:', error);
                }
            };

            notGateState();
            console.log('Input:', input, 'Output:', newOutput);
        } else {
            setOutput(null);
            console.log('Incomplete Inputs, Output set to null');
        }
    }, [input, data]);
        

    return (
        <div className={`${styles.gateContainer} ${notStyles.notGate}`}>
            {/* Input Connection Lines with Glowing Effect */}
            <div className={notStyles.inputLine}>
                <div className={notStyles.lineShadow} />
                <div className={notStyles.lineGlow} />
            </div>

            {/* Output Connection Line - After NOT bubble */}
            <div className={notStyles.outputLine}>
                <div className={notStyles.lineShadow} />
                <div className={notStyles.lineGlow} />
            </div>

            {/* Triangle Border Background */}
            <div className={notStyles.gateBorderBackground} />

            {/* Main Triangle Body */}
            <div className={notStyles.gateBody}>
                <div className={notStyles.metalEffect} />
                <div className={notStyles.innerShadow} />
                <div className={notStyles.highlight} />
                <div className={notStyles.bevel} />
                <span className={notStyles.label}>NOT</span>
            </div>

            {/* NOT Bubble */}
            <div className={notStyles.notBubble}>
                <div className={notStyles.notBubbleInner}>
                    <div className={notStyles.bubbleHighlight} />
                    <div className={notStyles.bubbleGlow} />
                </div>
            </div>

            {/* Input Handle */}
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input`}
                isConnectable={isConnectable}

                className={`${styles.handle} ${notStyles.inputHandle} ${notStyles.handleEffect}`}
            />

            {/* Output Handle */}
            <Handle
                type="source"
                position={Position.Right}
                id={`${id}-output`}
                isConnectable={isConnectable}

                className={`${styles.handle} ${notStyles.outputHandle} ${notStyles.handleEffect}`}
            />
        </div>
    );
};

export default NotGateCanvas;
