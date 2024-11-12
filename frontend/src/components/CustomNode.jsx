import React, { useEffect, useRef } from 'react'; 

const AndGateCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Set line properties
        ctx.lineWidth = 8;
        ctx.strokeStyle = 'black';

        // Draw the left vertical line (input side)
        ctx.beginPath();
        ctx.moveTo(50, 40);
        ctx.lineTo(50, 160);
        ctx.stroke();

        // Draw the upper input line --
        ctx.beginPath();
        ctx.moveTo(10, 80); // Start from the left
        ctx.lineTo(50, 80); // End at the left vertical line
        ctx.stroke();

        // Draw the lower input line
        ctx.beginPath();
        ctx.moveTo(10, 120); // Start from the left
        ctx.lineTo(50, 120); // End at the left vertical line
        ctx.stroke();

        // Draw the AND gate shape (output side)
        ctx.beginPath();
        ctx.moveTo(45, 40); // Move to the top of the vertical line
        ctx.arc(80, 100, 60, -Math.PI / 2, Math.PI / 2, false); // Draw the half-circle
        ctx.lineTo(45, 160); // Complete the right side
        ctx.stroke();

        // Draw the output line on the right side of the half-circle
        ctx.beginPath();
        ctx.moveTo(140, 100); // Start at the end of the half-circle
        ctx.lineTo(180, 100); // Extend a bit to the right
        ctx.stroke();
    }, []);

    return <canvas ref={canvasRef} width={200} height={200} />;
};

export default AndGateCanvas;






// import { useCallback } from 'react';
// import { Handle, Position } from '@xyflow/react';
// import AndGate from './AndGate';


// const handleStyle = { left: 10 };

// function TextUpdaterNode({ data, isConnectable }) {
//   const onChange = useCallback((evt) => {
//     console.log(evt.target.value);
//   }, []);

//   return (
//     <div style={{display:'flex'}}>
//       {/* <AndGate /> */}
//       <div>
//         {/* Two lines for 2 in */}
//         1
//       </div>
//       <div>
//         {/* bg image of AND */}
//         2
//         <img src="andGate.png" alt="hello" />
//       </div>
//       <div>
//         {/* One short line for out */}
//       3
//       </div>
//     </div>
//   );
// }

// export default TextUpdaterNode;