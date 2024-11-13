import React, { useEffect, useRef } from 'react';
import { Handle, Position } from '@xyflow/react';

const XorGateCanvas = ({ isConnectable }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Set line properties
        ctx.lineWidth = 5.6; 
        ctx.strokeStyle = 'black';

        // Draw the upper input line
        ctx.beginPath();
        ctx.moveTo(7, 56); 
        ctx.lineTo(42, 56);
        ctx.stroke();

        // Draw the lower input line
        ctx.beginPath();
        ctx.moveTo(7, 84); 
        ctx.lineTo(42, 84); 
        ctx.stroke();

        // Draw the left curved input side (similar to the OR gate)
        ctx.beginPath();
        ctx.moveTo(35, 28);
        ctx.quadraticCurveTo(56, 70, 35, 112); 
        ctx.stroke();

        // Draw the XOR gate's main shape (the output side)
        ctx.beginPath();
        ctx.moveTo(35, 28); 
        ctx.quadraticCurveTo(154, 70, 35, 112); 

        // Draw the additional line to represent the XOR output shape
        ctx.moveTo(25, 28); 
        ctx.quadraticCurveTo(50, 70, 25, 112); 
        ctx.stroke();

        // Draw the NOT bubble at the end of the XOR gate's output
        ctx.beginPath();
        ctx.arc(100, 70, 5.6, 0, 2 * Math.PI); 
        ctx.fillStyle = 'white'; 
        ctx.fill();
        ctx.stroke();

        // Draw the output line on the right side of the XOR gate
        ctx.beginPath();
        ctx.moveTo(110, 70); 
        ctx.lineTo(126, 70); 
        ctx.stroke();
    }, []);

    return (
      <div style={{ position: 'relative', width: 140, height: 140 }}>
          {/* Canvas for the XOR gate drawing */}
          <canvas ref={canvasRef} width={140} height={140} style={{ position: 'absolute', top: 0, left: 0 }} />

          {/* Input Handles */}
          <Handle
              type="source"
              position={Position.Left}
              id="input-top"
              isConnectable={isConnectable}
              style={{ top: 56, left: 7 }}
          />
          <Handle
              type="source"
              position={Position.Left}
              id="input-bottom"
              isConnectable={isConnectable}
              style={{ top: 84, left: 7 }}
          />

          {/* Output Handle */}
          <Handle
              type="target"
              position={Position.Right}
              id="output"
              isConnectable={isConnectable}
              style={{ top: 70, right: 14 }}
          />
      </div>
    );
};

export default XorGateCanvas;
