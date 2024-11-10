import React, { useEffect, useRef } from 'react';
import { Handle, Position } from '@xyflow/react';

const NandGateCanvas = ({ isConnectable }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Set line properties
        ctx.lineWidth = 5.6; 
        ctx.strokeStyle = 'black';

        // Draw the left vertical line (input side)
        ctx.beginPath();
        ctx.moveTo(35, 28); 
        ctx.lineTo(35, 112); 
        ctx.stroke();

        // Draw the upper input line
        ctx.beginPath();
        ctx.moveTo(7, 56); 
        ctx.lineTo(35, 56); 
        ctx.stroke();

        // Draw the lower input line
        ctx.beginPath();
        ctx.moveTo(7, 84); 
        ctx.lineTo(35, 84); 
        ctx.stroke();

        // Draw the AND gate shape (output side)
        ctx.beginPath();
        ctx.moveTo(31.5, 28); 
        ctx.arc(56, 70, 42, -Math.PI / 2, Math.PI / 2, false); 
        ctx.lineTo(31.5, 112); 
        ctx.stroke();

        // Draw the NOT bubble at the end of the AND gate's output
        ctx.beginPath();
        ctx.arc(101.5, 70, 5.6, 0, 2 * Math.PI); 
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.stroke();

        // Draw the output line on the right side of the NOT bubble
        ctx.beginPath();
        ctx.moveTo(107.1, 70); 
        ctx.lineTo(126, 70); 
        ctx.stroke();
    }, []);

    return (
      <div style={{ position: 'relative', width: 140, height: 140 }}> 
          {/* Canvas for the gate drawing */}
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

export default NandGateCanvas;
