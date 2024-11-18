import React from 'react';
import { Handle, Position } from '@xyflow/react';
import styles from "../../../styles/LogicComponents/gates/GateStyles.module.css";
import bufferStyles from "../../../styles/LogicComponents/gates/BufferGate.module.css";

const BufferGateCanvas = ({ isConnectable, id }) => {
    return (
        <div className={`${styles.gateContainer} ${bufferStyles.bufferGate}`}>
            {/* Input Connection Lines with Glowing Effect */}
            <div className={bufferStyles.inputLine}>
                <div className={bufferStyles.lineShadow} />
                <div className={bufferStyles.lineGlow} />
            </div>

            {/* Output Connection Line - After NOT bubble */}
            <div className={bufferStyles.outputLine}>
                <div className={bufferStyles.lineShadow} />
                <div className={bufferStyles.lineGlow} />
            </div>

            {/* Triangle Border Background */}
            <div className={bufferStyles.gateBorderBackground} />

            {/* Main Triangle Body */}
            <div className={bufferStyles.gateBody}>
                <div className={bufferStyles.metalEffect} />
                <div className={bufferStyles.innerShadow} />
                <div className={bufferStyles.highlight} />
                <div className={bufferStyles.bevel} />
                <span className={bufferStyles.label}>BUFFER</span>
            </div>


            {/* Input Handle */}
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input`}
                isConnectable={isConnectable}
                className={`${styles.handle} ${bufferStyles.inputHandle} ${bufferStyles.handleEffect}`}
            />

            {/* Output Handle */}
            <Handle
                type="source"
                position={Position.Right}
                id={`${id}-output`}
                isConnectable={isConnectable}
                className={`${styles.handle} ${bufferStyles.outputHandle} ${bufferStyles.handleEffect}`}
            />
        </div>
    );
};

export default BufferGateCanvas;
