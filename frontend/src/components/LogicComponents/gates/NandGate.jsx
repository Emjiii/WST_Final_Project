import React from 'react';
import { Handle, Position } from '@xyflow/react';
import styles from "../../../styles/LogicComponents/gates/GateStyles.module.css";
import nandStyles from "../../../styles/LogicComponents/gates/NandGate.module.css";

export const NandGate = ({ isConnectable, id }) => {
    return (
        <div className={`${styles.gateContainer} ${nandStyles.nandGate}`}>
            {/* Input Connection Lines with Glowing Effect */}
            <div className={nandStyles.inputLineTop}>
                <div className={nandStyles.lineShadow} />
                <div className={nandStyles.lineGlow} />
            </div>
            <div className={nandStyles.inputLineBottom}>
                <div className={nandStyles.lineShadow} />
                <div className={nandStyles.lineGlow} />
            </div>
            
            {/* NOT Bubble with Enhanced Effects - Moved before output line */}
            <div className={nandStyles.notBubble}>
                <div className={nandStyles.notBubbleInner}>
                    <div className={nandStyles.bubbleHighlight} />
                    <div className={nandStyles.bubbleGlow} />
                </div>
            </div>

            {/* Output Connection Line - After NOT bubble */}
            <div className={nandStyles.outputLine}>
                <div className={nandStyles.lineShadow} />
                <div className={nandStyles.lineGlow} />
            </div>

            {/* NAND Gate Body with Enhanced 3D Effects */}
            <div className={styles.andGateShape}>
                <div className={nandStyles.metalEffect} />
                <div className={nandStyles.innerShadow} />
                <div className={nandStyles.highlight} />
                <div className={nandStyles.bevel} />
                <span className={nandStyles.label}>NAND</span>
            </div>

            {/* Handles */}
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input-1`}
                isConnectable={isConnectable}
                className={`${styles.handle} ${nandStyles.inputHandleTop} ${nandStyles.handleEffect}`}
            />
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input-2`}
                isConnectable={isConnectable}
                className={`${styles.handle} ${nandStyles.inputHandleBottom} ${nandStyles.handleEffect}`}
            />
            <Handle
                type="source"
                position={Position.Right}
                id={`${id}-output`}
                isConnectable={isConnectable}
                className={`${styles.handle} ${nandStyles.outputHandle} ${nandStyles.handleEffect}`}
            />
        </div>
    );
};

export default NandGate;
