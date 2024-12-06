import React, { useState, useEffect } from 'react';
import { Handle, Position, useEdges, useNodes } from '@xyflow/react';
import axios from 'axios';
import orStyles from "../../../styles/LogicComponents/gates/OrGate.module.css";
import styles from "../../../styles/LogicComponents/gates/GateStyles.module.css";

export const OrGateCanvas = ({ isConnectable, id, data }) => {

    const [input1, setInput1] = useState(false); 
    const [input2, setInput2] = useState(false); 
    const [output, setOutput] = useState(false);
    const edges = useEdges();
    const nodes = useNodes();   
   
    useEffect(() => {
        // Update input states based on connections
        const updateInputs = () => {
            const incomingEdge1 = edges.find(edge => edge.target === id && edge.targetHandle === `${id}-input-1`);
            const incomingEdge2 = edges.find(edge => edge.target === id && edge.targetHandle === `${id}-input-2`);

            // Update input1 based on the connection
            if (incomingEdge1) {
                const sourceNode1 = nodes.find(node => node.id === incomingEdge1.source);
                const inputValue1 = sourceNode1?.data?.value ?? false;
                setInput1(inputValue1);
                console.log('Input 1 Connected:', inputValue1)
            } else {
                setInput1(null);
                console.log('Input 1 Not Connected');
            }
   
            // Update input2 based on the connection
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
    
    }, [edges, nodes, id]); // Trigger whenever edges or nodes change
   
    useEffect(() => {
        const areBothInputsConnected = input1 !== null && input2 !== null;
        const newOutput = areBothInputsConnected ? (Boolean(input1) || Boolean(input2)) : false;
        
        setOutput(newOutput);

        // Update parent or backend
        if (data?.setValue) {
            data.setValue(newOutput);
        }

        // const updateOrGateState = async () => {
        //     try {
        //         await axios.post('http://localhost:3000/gates/or', {
        //             input1,
        //             input2,
        //             output: newOutput,
        //         });
        //         console.log('Backend Sync Successful:', { input1, input2, output: newOutput });
        //     } catch (error) {
        //         console.error('Error syncing with backend:', error);
        //     }
        // };

        // updateOrGateState();

        console.log('Inputs:', input1, input2, 'Output:', newOutput);
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
