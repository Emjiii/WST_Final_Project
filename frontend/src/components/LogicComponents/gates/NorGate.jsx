import React, { useState, useEffect } from 'react';
import { Handle, Position, useEdges, useNodes } from '@xyflow/react';
import axios from 'axios';
import norStyles from "../../../styles/LogicComponents/gates/NorGate.module.css";
import styles from "../../../styles/LogicComponents/gates/GateStyles.module.css";

export const NorGateCanvas = ({ isConnectable, id, data }) => {

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
        const areBothInputsConnected = input1 !== null && input2 !== null;
        const newOutput = areBothInputsConnected ? !(Boolean(input1) || Boolean(input2)) : false;
        
        setOutput(newOutput);
        
        if (data?.setValue) {
            data.setValue(newOutput);
        }

        const norGateState = async () => {
            try {
                await axios.post('http://localhost:3000/gates/nor', {
                input1,
                input2,
                output: newOutput
            });
            console.log('Backend Sync Successful:', { input1, input2, output: newOutput });
        } catch (error) {
            console.error('Error syncing with backend:', error);
        }
    };
    norGateState();
        console.log('Inputs:', input1, input2, 'Output:', newOutput);
}, [input1, input2, data]);


    return (
        <div className={`${styles.gateContainer} ${norStyles.norGate}`}>
             {/* Input Connection Lines with Glowing Effect */}
             <div className={norStyles.inputLineTop}>
                <div className={norStyles.lineShadow} />
                <div className={norStyles.lineGlow} />
            </div>
            <div className={norStyles.inputLineBottom}>
                <div className={norStyles.lineShadow} />
                <div className={norStyles.lineGlow} />
            </div>

            {/* NOT Bubble with Enhanced Effects - Moved before output line */}
            <div className={norStyles.notBubble}>
                <div className={norStyles.notBubbleInner}>
                    <div className={norStyles.bubbleHighlight} />
                    <div className={norStyles.bubbleGlow} />
                </div>
            </div>

            {/* Output Connection Line */}
            <div className={norStyles.outputLine}>
                <div className={norStyles.lineShadow} />
                <div className={norStyles.lineGlow} />
            </div>

            {/* Main Gate Body - Border Background */}
            <div className={norStyles.gateBorderBackground} />

            {/* Main Gate Body */}
            <div className={norStyles.gateBody}>
                {/* Gate Label */}

                <div className={norStyles.metalEffect} />
                <div className={norStyles.innerShadow} />
                <div className={norStyles.highlight} />
                <div className={norStyles.bevel} />
                <span className={norStyles.label}>NOR</span>
            </div>

        
            {/* Handles */}
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input-1`}
                isConnectable={isConnectable}

                className={`${styles.handle} ${norStyles.inputHandleTop} ${norStyles.handleEffect}`}
            />
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input-2`}
                isConnectable={isConnectable}

                className={`${styles.handle} ${norStyles.inputHandleBottom} ${norStyles.handleEffect}`}
            />
            <Handle
                type="source"
                position={Position.Right}
                id={`${id}-output`}
                isConnectable={isConnectable}

                className={`${styles.handle} ${norStyles.outputHandle} ${norStyles.handleEffect}`}
            />
        </div>
    );
};


export default NorGateCanvas;
