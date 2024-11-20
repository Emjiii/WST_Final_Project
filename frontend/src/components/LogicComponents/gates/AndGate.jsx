import React from 'react';
import { Handle, Position } from '@xyflow/react';
import styles from "../../../styles/LogicComponents/gates/GateStyles.module.css";
import andStyles from "../../../styles/LogicComponents/gates/AndGate.module.css";

export const AndGate = ({ isConnectable, id }) => {
    return (
        <div className={`${styles.gateContainer} ${andStyles.andGate}`}>
            {/* Input Connection Lines with Glowing Effect */}
            <div className={andStyles.inputLineTop}>
                <div className={andStyles.lineShadow} />
                <div className={andStyles.lineGlow} />
            </div>
            <div className={andStyles.inputLineBottom}>
                <div className={andStyles.lineShadow} />
                <div className={andStyles.lineGlow} />
            </div>
            
            {/* Output Connection Line with Glowing Effect */}
            <div className={andStyles.outputLine}>
                <div className={andStyles.lineShadow} />
                <div className={andStyles.lineGlow} />
            </div>

            {/* AND Gate Body with Enhanced 3D Effects */}
            <div className={styles.andGateShape}>
                <div className={andStyles.metalEffect} />
                <div className={andStyles.innerShadow} />
                <div className={andStyles.highlight} />
                <div className={andStyles.bevel} />
                <span className={`${styles.gateLabel} ${andStyles.label}`}>AND</span>
            </div>

            {/* Handles moved to root level, just like NAND gate */}
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input-1`}
                isConnectable={isConnectable}
                className={`${styles.handle} ${andStyles.inputHandleTop} ${andStyles.handleEffect}`}
            />
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input-2`}
                isConnectable={isConnectable}
                className={`${styles.handle} ${andStyles.inputHandleBottom} ${andStyles.handleEffect}`}
            />
            <Handle
                type="source"
                position={Position.Right}
                id={`${id}-output`}
                isConnectable={isConnectable}
                className={`${styles.handle} ${andStyles.outputHandle} ${andStyles.handleEffect}`}
                style={{ right: 0, top: '50%', transform: 'translateY(-50%)' }}
            />
        </div>
    );
};

export default AndGate;
