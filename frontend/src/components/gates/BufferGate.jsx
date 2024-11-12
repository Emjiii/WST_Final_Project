import React, { useEffect, useRef } from 'react';
import { Handle, Position } from '@xyflow/react';

const BufferGateCanvas = ({ isConnectable }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Set line properties
        ctx.lineWidth = 5.6; 
        ctx.strokeStyle = 'black';

        // Draw the input line on the left side
        ctx.beginPath();
        ctx.moveTo(7, 70); 
        ctx.lineTo(42, 70); 
        ctx.stroke();

        // Draw the triangle for the buffer gate (which looks like a NOT gate)
        ctx.beginPath();
        ctx.moveTo(42, 40);  
        ctx.lineTo(42, 100); 
        ctx.lineTo(98, 70);  
        ctx.closePath();
        ctx.stroke();

        // Draw the output line on the right side of the buffer gate
        ctx.beginPath();
        ctx.moveTo(100, 70); 
        ctx.lineTo(120, 70); 
        ctx.stroke();
    }, []);

    return (
        <div style={{ position: 'relative', width: 140, height: 140 }}>
            {/* Canvas for the buffer gate drawing */}
            <canvas ref={canvasRef} width={140} height={140} style={{ position: 'absolute', top: 0, left: 0 }} />

            {/* Input Handle */}
            <Handle
                type="source"
                position={Position.Left}
                id="input"
                isConnectable={isConnectable}
                style={{ top: 70, left: 7 }} // Centered vertically at 70
            />

            {/* Output Handle */}
            <Handle
                type="target"
                position={Position.Right}
                id="output"
                isConnectable={isConnectable}
                style={{ top: 70, right: 18 }} // Centered vertically at 70
            />
        </div>
    );
};

export default BufferGateCanvas;
