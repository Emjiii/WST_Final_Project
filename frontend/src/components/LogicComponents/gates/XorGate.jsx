import React from 'react';
import { Handle, Position } from '@xyflow/react';
import styles from "../../../styles/LogicComponents/gates/GateStyles.module.css";
import xorStyles from "../../../styles/LogicComponents/gates/XorGate.module.css";

const XorGateCanvas = ({ isConnectable, id }) => {
    return (
        <div className={`${styles.gateContainer} ${xorStyles.xorGate}`}>
            {/* Input Connection Lines with Glowing Effect */}
            <div className={xorStyles.inputLineTop}>
                <div className={xorStyles.lineShadow} />
                <div className={xorStyles.lineGlow} />
            </div>
            <div className={xorStyles.inputLineBottom}> 
                <div className={xorStyles.lineShadow} />
                <div className={xorStyles.lineGlow} />
            </div>

            {/* Output Connection Line */}
            <div className={xorStyles.outputLine}>
                <div className={xorStyles.lineShadow} />
                <div className={xorStyles.lineGlow} />
            </div>
            
            {/* First Curved Line (XOR Part) */}

            <div className={xorStyles.firstCurveBody}> 
                {/* Gate Label */}
                <div className={xorStyles.metalEffect} />
                <div className={xorStyles.innerShadow} />
                <div className={xorStyles.highlight} />
                <div className={xorStyles.bevel} />
                <div className={xorStyles.firstCurveBorder} />
            </div>
           

            {/* Main Gate Body */}
            <div className={xorStyles.gateBorderBackground} />

            <div className={xorStyles.gateBody}>
                {/* Gate Label */}
                <div className={xorStyles.metalEffect} />
                <div className={xorStyles.innerShadow} />
                <div className={xorStyles.highlight} />
                <div className={xorStyles.bevel} />
                <span className={xorStyles.label}>XOR</span>
            </div>


            {/* Handles */}
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input-1`}
                isConnectable={isConnectable}
                className={`${styles.handle} ${xorStyles.inputHandleTop} ${xorStyles.handleEffect}`}
            />
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input-2`}
                isConnectable={isConnectable}
                className={`${styles.handle} ${xorStyles.inputHandleBottom} ${xorStyles.handleEffect}`}
            />
            <Handle
                type="source"
                position={Position.Right}
                id={`${id}-output`}
                isConnectable={isConnectable}
                className={`${styles.handle} ${xorStyles.outputHandle} ${xorStyles.handleEffect}`}
            />
        </div>
    );
};

export default XorGateCanvas;
