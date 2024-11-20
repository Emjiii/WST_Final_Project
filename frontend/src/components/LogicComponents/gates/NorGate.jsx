import React from 'react';
import { Handle, Position } from '@xyflow/react';
import norStyles from "../../../styles/LogicComponents/gates/NorGate.module.css";
import styles from "../../../styles/LogicComponents/gates/GateStyles.module.css";

const NorGateCanvas = ({ isConnectable, id }) => {
    return (
        <div className={`${styles.gateContainer} ${norStyles.norGate}`}>
             {/* Input Connection Lines with Glowing Effect */}
             <div className={norStyles.inputLineTop}>
                <div className={norStyles.lineShadow} />
                <div className={norStyles.lineGlow} />
            </div>
            <div className={norStyles.inputLineBottom}>
                <div className={norStyles.lineShadow} />
                <div className={norStyles.lineGlow} />
            </div>

            {/* NOT Bubble with Enhanced Effects - Moved before output line */}
            <div className={norStyles.notBubble}>
                <div className={norStyles.notBubbleInner}>
                    <div className={norStyles.bubbleHighlight} />
                    <div className={norStyles.bubbleGlow} />
                </div>
            </div>

            {/* Output Connection Line */}
            <div className={norStyles.outputLine}>
                <div className={norStyles.lineShadow} />
                <div className={norStyles.lineGlow} />
            </div>

            {/* Main Gate Body - Border Background */}
            <div className={norStyles.gateBorderBackground} />

            {/* Main Gate Body */}
            <div className={norStyles.gateBody}>
                {/* Gate Label */}
                <div className={norStyles.metalEffect} />
                <div className={norStyles.innerShadow} />
                <div className={norStyles.highlight} />
                <div className={norStyles.bevel} />
                <span className={norStyles.label}>NOR</span>
            </div>

        
            {/* Handles */}
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input-1`}
                isConnectable={isConnectable}
                className={`${styles.handle} ${norStyles.inputHandleTop} ${norStyles.handleEffect}`}
            />
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input-2`}
                isConnectable={isConnectable}
                className={`${styles.handle} ${norStyles.inputHandleBottom} ${norStyles.handleEffect}`}
            />
            <Handle
                type="source"
                position={Position.Right}
                id={`${id}-output`}
                isConnectable={isConnectable}
                className={`${styles.handle} ${norStyles.outputHandle} ${norStyles.handleEffect}`}
            />
        </div>
    );
};

export default NorGateCanvas;
