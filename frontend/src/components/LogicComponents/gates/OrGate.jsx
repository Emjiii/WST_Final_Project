import React from 'react';
import { Handle, Position } from '@xyflow/react';
import orStyles from "../../../styles/LogicComponents/gates/OrGate.module.css";
import styles from "../../../styles/LogicComponents/gates/GateStyles.module.css";

const OrGateCanvas = ({ isConnectable, id }) => {
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
