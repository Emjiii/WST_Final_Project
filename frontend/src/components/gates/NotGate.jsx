import React, { useState, useEffect } from 'react';
import { Handle, Position, useEdges, useNodes } from '@xyflow/react';
import axios from 'axios';


export const NotGateCanvas = ({ isConnectable, id, data }) => {

    const [input, setInput] = useState(null);
    const [output, setOutput] = useState(null);
    const edges = useEdges();
    const nodes = useNodes();

    useEffect(() => {
        const incomingEdge = edges.find(edge => edge.target === id && edge.targetHandle === `${id}-input`);
        if (incomingEdge) {
            const sourceNode = nodes.find(node => node.id === incomingEdge.source);
            setInput(sourceNode?.data?.value ?? false);
        }
    }, [edges, nodes, id]);

    useEffect(() => {
        const newOutput = !Boolean(input);
        if (data) {
            data.value = newOutput;
            data.onChange?.(newOutput);
        }

        const timeoutId = setTimeout(() => {
            const notGateState = async () => {
                try {
                    await axios.post('http://localhost:3000/gates/not', {
                        input: Boolean(input),
                        output: newOutput
                    });
                } catch (error) {
                    console.error('Error updating NOT gate state:', error);
                }
            };
            notGateState();
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [input, data]);

    return (
        <div className="gate-container" 
            style={{ 
                position: 'relative',
                width: '150px',
                height: '150px',
                padding: '15px',
            }}
        >
            {/* Input Connection Line */}
            <div style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                width: '25px',
                height: '6px',
                background: 'linear-gradient(to right, #555, #333)',
                boxShadow: `
                    0 1.5px 0 rgba(255,255,255,0.1),
                    0 -1.5px 0 rgba(0,0,0,0.2),
                    inset 0 1.5px 1.5px rgba(0,0,0,0.2)
                `,
                borderRadius: '3px',
                transform: 'translateY(-50%)',
            }} />

            {/* Triangle Border Background */}
            <div style={{
                position: 'absolute',
                left: '25px',
                top: '15px',
                width: '100px',
                height: '120px',
                background: '#111',
                clipPath: 'polygon(15% 10%, 97% 50%, 15% 90%)',
                transform: 'scale(1.12)',
                zIndex: 1,
                boxShadow: '0 6px 12px rgba(0,0,0,0.3)'
            }} />

            {/* Main Triangle Body */}
            <div style={{
                position: 'absolute',
                left: '25px',
                top: '15px',
                width: '100px',
                height: '120px',
                background: 'linear-gradient(145deg, #444, #222)',
                clipPath: 'polygon(15% 10%, 97% 50%, 15% 90%)',
                boxShadow: `
                    inset 3px 3px 6px rgba(255,255,255,0.1),
                    inset -3px -3px 6px rgba(0,0,0,0.3),
                    0 6px 12px rgba(0,0,0,0.3)
                `,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 2,
            }}>
                {/* Gate Label */}
                <span style={{ 
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#fff',
                    textShadow: '0 3px 6px rgba(0,0,0,0.5)',
                    marginLeft: '-5px',
                }}>
                    NOT
                </span>
            </div>

            {/* NOT Bubble */}
            <div style={{
                position: 'absolute',
                right: '5px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'linear-gradient(145deg, #444, #222)',
                border: '3px solid #111',
                boxShadow: `
                    inset 2px 2px 4px rgba(255,255,255,0.1),
                    inset -2px -2px 4px rgba(0,0,0,0.3),
                    0 4px 8px rgba(0,0,0,0.3),
                    0 0 0 3px rgba(68, 68, 68, 0.5)
                `,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 2,
            }}>
                {/* Inner highlight for depth */}
                <div style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: 'linear-gradient(145deg, #555, #333)',
                    boxShadow: `
                        inset 1px 1px 2px rgba(0,0,0,0.4),
                        0 1px 2px rgba(255,255,255,0.1)
                    `,
                }}/>
            </div>

            {/* Output Connection Line */}
            <div style={{
                position: 'absolute',
                right: '-15px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '40px',
                height: '6px',
                background: 'linear-gradient(to right, #333, #555)',
                boxShadow: `
                    0 1.5px 0 rgba(255,255,255,0.1),
                    0 -1.5px 0 rgba(0,0,0,0.2),
                    inset 0 1.5px 1.5px rgba(0,0,0,0.2)
                `,
                borderRadius: '3px',
                zIndex: 1,
            }} />

            {/* Input Handle */}
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input`}
                isConnectable={isConnectable}
                style={{ 
                    left: '5px',
                    top: '50%',
                    width: '18px',
                    height: '18px',
                    background: 'linear-gradient(145deg, #666, #444)',
                    border: '3px solid #333',
                    boxShadow: '0 3px 4px rgba(0,0,0,0.2)',
                }}
            />

            {/* Output Handle */}
            <Handle
                type="source"
                position={Position.Right}
                id={`${id}-output`}
                isConnectable={isConnectable}
                style={{ 
                    right: '-15px',
                    width: '18px',
                    height: '18px',
                    background: 'linear-gradient(145deg, #666, #444)',
                    border: '3px solid #333',
                    boxShadow: '0 3px 4px rgba(0,0,0,0.2)',
                    zIndex: 3
                }}
            />
        </div>
    );
};

export default NotGateCanvas;
