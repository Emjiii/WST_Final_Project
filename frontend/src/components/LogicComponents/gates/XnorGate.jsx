import React from 'react';
import { Handle, Position } from '@xyflow/react';
import styles from "../../../styles/LogicComponents/gates/GateStyles.module.css";
import xnorStyles from "../../../styles/LogicComponents/gates/XnorGate.module.css";

const XnorGateCanvas = ({ isConnectable, id }) => {
    return (
        <div className={`${styles.gateContainer} ${xnorStyles.xnorGate}`}>
            {/* Input Connection Lines */}
            <div className={xnorStyles.inputLineTop} />
            <div className={xnorStyles.inputLineBottom} />
            
            {/* First Curved Line (XOR Part) */}
            <div className={xnorStyles.firstCurveBorder} />
            <div className={xnorStyles.firstCurveBody} />

            {/* Main Gate Body */}
            <div className={xnorStyles.gateBorderBackground} />
            <div className={xnorStyles.gateBody}>
                <span className={xnorStyles.label}>XNOR</span>
            </div>

            {/* NOT Bubble */}
            <div className={xnorStyles.notBubble}>
                <div className={xnorStyles.notBubbleInner} />
            </div>

            {/* Output Connection Line */}
            <div className={xnorStyles.outputLine} />

            {/* Handles */}
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input-1`}
                isConnectable={isConnectable}
                className={`${styles.handle} ${xnorStyles.inputHandleTop}`}
            />
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input-2`}
                isConnectable={isConnectable}
                className={`${styles.handle} ${xnorStyles.inputHandleBottom}`}
            />
            <Handle
                type="source"
                position={Position.Right}
                id={`${id}-output`}
                isConnectable={isConnectable}
                className={`${styles.handle} ${xnorStyles.outputHandle}`}
            />
        </div>
    );
};

export default XnorGateCanvas;
