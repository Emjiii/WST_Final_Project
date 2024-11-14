import React from 'react';
import { Handle, Position } from '@xyflow/react';

const XnorGateCanvas = ({ isConnectable, id }) => {
    return (
        <div className="gate-container" 
            style={{ 
                position: 'relative',
                width: '150px',
                height: '150px',
                padding: '15px',
            }}
        >
            {/* Input Connection Lines */}
            <div style={{
                position: 'absolute',
                left: '0',
                top: '30%',
                width: '25px',
                height: '6px',
                background: 'linear-gradient(to right, #555, #333)',
                boxShadow: `
                    0 1.5px 0 rgba(255,255,255,0.1),
                    0 -1.5px 0 rgba(0,0,0,0.2),
                    inset 0 1.5px 1.5px rgba(0,0,0,0.2)
                `,
                borderRadius: '3px',
            }} />
            <div style={{
                position: 'absolute',
                left: '0',
                top: '70%',
                width: '25px',
                height: '6px',
                background: 'linear-gradient(to right, #555, #333)',
                boxShadow: `
                    0 1.5px 0 rgba(255,255,255,0.1),
                    0 -1.5px 0 rgba(0,0,0,0.2),
                    inset 0 1.5px 1.5px rgba(0,0,0,0.2)
                `,
                borderRadius: '3px',
            }} />

            {/* First Curved Line Border Background */}
            <div style={{
                position: 'absolute',
                left: '20px',
                top: '15px',
                height: '120px',
                width: '15px',
                background: '#111',
                clipPath: 'path("M 0 0 C 8 0, 15 35, 15 60 C 15 85, 8 120, 0 120 C 4 90, 4 30, 0 0")',
                transform: 'scale(1.05)',
                zIndex: 1,
                boxShadow: '0 6px 12px rgba(0,0,0,0.3)'
            }} />

            {/* First Curved Line (XOR part) */}
            <div style={{
                position: 'absolute',
                left: '20px',
                top: '15px',
                height: '120px',
                width: '15px',
                background: 'linear-gradient(145deg, #444, #222)',
                clipPath: 'path("M 0 0 C 8 0, 15 35, 15 60 C 15 85, 8 120, 0 120 C 4 90, 4 30, 0 0")',
                boxShadow: `
                    inset 3px 3px 6px rgba(255,255,255,0.1),
                    inset -3px -3px 6px rgba(0,0,0,0.3),
                    0 6px 12px rgba(0,0,0,0.3)
                `,
                zIndex: 2,
            }} />

            {/* Main Gate Body - Border Background */}
            <div style={{
                position: 'absolute',
                left: '35px',
                top: '15px',
                width: '100px',
                height: '120px',
                background: '#111',
                clipPath: 'path("M 0 0 C 30 0, 100 35, 100 60 C 100 85, 30 120, 0 120 C 15 90, 15 30, 0 0")',
                transform: 'scale(1.09)',
                zIndex: 1,
                boxShadow: '0 6px 12px rgba(0,0,0,0.3)'
            }} />

            {/* Main Gate Body */}
            <div style={{
                position: 'absolute',
                left: '35px',
                top: '15px',
                width: '100px',
                height: '120px',
                background: 'linear-gradient(145deg, #444, #222)',
                clipPath: 'path("M 0 0 C 30 0, 100 35, 100 60 C 100 85, 30 120, 0 120 C 15 90, 15 30, 0 0")',
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
                    marginLeft: '0px',
                }}>
                      XNOR
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

            {/* Input Handles */}
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input-1`}
                isConnectable={isConnectable}
                style={{ 
                    left: 0,
                    top: '30%',
                    width: '18px',
                    height: '18px',
                    background: 'linear-gradient(145deg, #666, #444)',
                    border: '3px solid #333',
                    boxShadow: '0 3px 4px rgba(0,0,0,0.2)',
                }}
            />
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input-2`}
                isConnectable={isConnectable}
                style={{ 
                    left: 0,
                    top: '70%',
                    width: '18px',
                    height: '18px',
                    background: 'linear-gradient(145deg, #666, #444)',
                    border: '3px solid #333',
                    boxShadow: '0 3px 4px rgba(0,0,0,0.2)',
                }}
            />

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

export default XnorGateCanvas;
