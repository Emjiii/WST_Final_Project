import React from 'react';
import { Handle, Position } from '@xyflow/react';
import styles from '../../styles/components/gates/GateStyles.module.css';
import nandStyles from '../../styles/components/gates/NandGate.module.css';

export const NandGate = ({ isConnectable, id }) => {
    return (
        <div className={styles.gateContainer}>
            {/* Input Connection Lines */}
            <div className={nandStyles.inputLineTop} />
            <div className={nandStyles.inputLineBottom} />
            
            {/* Output Connection Line */}
            <div className={nandStyles.outputLine} />

            {/* NAND Gate Body */}
            <div className={styles.andGateShape}>
                <span className={styles.gateLabel}>NAND</span>
            </div>

            {/* NOT Bubble */}
            <div className={styles.notBubble}>
                <div className={styles.notBubbleInner} />
            </div>

            {/* Input Handles */}
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input-1`}
                isConnectable={isConnectable}
                className={`${styles.handle} ${nandStyles.inputHandleTop}`}
            />
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input-2`}
                isConnectable={isConnectable}
                className={`${styles.handle} ${nandStyles.inputHandleBottom}`}
            />

            {/* Output Handle */}
            <Handle
                type="source"
                position={Position.Right}
                id={`${id}-output`}
                isConnectable={isConnectable}
                className={`${styles.handle} ${nandStyles.outputHandle}`}
            />
        </div>
    );
};

export default NandGate;
