import React from 'react';
import { Handle, Position } from '@xyflow/react';
import styles from '../../styles/components/gates/OrGate.module.css';
import gateStyles from '../../styles/components/gates/GateStyles.module.css';

const OrGateCanvas = ({ isConnectable, id }) => {
    return (
        <div className={gateStyles.gateContainer}>
            {/* Input Connection Lines */}
            <div className={styles.inputLine1} />
            <div className={styles.inputLine2} />

            {/* Main Gate Body - Border Background */}
            <div className={styles.gateBorderBackground} />

            {/* Main Gate Body */}
            <div className={styles.gateBody}>
                {/* Gate Label */}
                <span className={gateStyles.gateLabel}>
                    OR
                </span>
            </div>

            {/* Output Connection Line */}
            <div className={styles.outputLine} />

            {/* Input Handles */}
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input-1`}
                isConnectable={isConnectable}
                className={`${gateStyles.handle} ${styles.input1Handle}`}
            />
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input-2`}
                isConnectable={isConnectable}
                className={`${gateStyles.handle} ${styles.input2Handle}`}
            />

            {/* Output Handle */}
            <Handle
                type="source"
                position={Position.Right}
                id={`${id}-output`}
                isConnectable={isConnectable}
                className={`${gateStyles.handle} ${styles.outputHandle}`}
            />
        </div>
    );
};

export default OrGateCanvas;
