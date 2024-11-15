import React from 'react';
import { Handle, Position } from '@xyflow/react';
import styles from '../../styles/components/gates/GateStyles.module.css';
import andStyles from '../../styles/components/gates/AndGate.module.css';

export const AndGate = ({ isConnectable, id }) => {
    return (
        <div className={styles.gateContainer}>
            {/* Input Connection Lines */}
            <div className={andStyles.inputLineTop} />
            <div className={andStyles.inputLineBottom} />
            
            {/* Output Connection Line */}
            <div className={andStyles.outputLine} />

            {/* AND Gate Body */}
            <div className={styles.andGateShape}>
                <span className={styles.gateLabel}>AND</span>
            </div>

            {/* Input Handles */}
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input-1`}
                isConnectable={isConnectable}
                className={`${styles.handle} ${andStyles.inputHandleTop}`}
            />
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input-2`}
                isConnectable={isConnectable}
                className={`${styles.handle} ${andStyles.inputHandleBottom}`}
            />

            {/* Output Handle */}
            <Handle
                type="source"
                position={Position.Right}
                id={`${id}-output`}
                isConnectable={isConnectable}
                className={`${styles.handle} ${andStyles.outputHandle}`}
            />
        </div>
    );
};

export default AndGate;
