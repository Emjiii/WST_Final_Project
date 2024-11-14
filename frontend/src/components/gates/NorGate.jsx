import React from 'react';
import { Handle, Position } from '@xyflow/react';
import norStyles from '../../styles/components/gates/NorGate.module.css';
import styles from '../../styles/components/gates/GateStyles.module.css';

const NorGateCanvas = ({ isConnectable, id }) => {
    return (
        <div className={styles.gateContainer}>
            {/* Input Connection Lines */}
            <div className={norStyles.inputLine1} />
            <div className={norStyles.inputLine2} />

            {/* Main Gate Body - Border Background */}
            <div className={norStyles.gateBorderBackground} />

            {/* Main Gate Body */}
            <div className={norStyles.gateBody}>
                {/* Gate Label */}
                <span className={styles.gateLabel}>
                    NOR
                </span>
    
            </div>

            {/* Output Connection Line */}
            <div className={norStyles.outputLine} />

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
                className={`${styles.handle} ${norStyles.input1Handle}`}
            />
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input-2`}
                isConnectable={isConnectable}
                className={`${styles.handle} ${norStyles.input2Handle}`}
            />

            {/* Output Handle */}
            <Handle
                type="source"
                position={Position.Right}
                id={`${id}-output`}
                isConnectable={isConnectable}
                className={`${styles.handle} ${norStyles.outputHandle}`}
            />
        </div>
    );
};

export default NorGateCanvas;
