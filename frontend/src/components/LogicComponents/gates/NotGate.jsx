import React from 'react';
import { Handle, Position } from '@xyflow/react';
import styles from "../../../styles/LogicComponents/gates/GateStyles.module.css";
import notStyles from "../../../styles/LogicComponents/gates/NotGate.module.css";

const NotGateCanvas = ({ isConnectable, id }) => {
    return (
        <div className={`${styles.gateContainer} ${notStyles.notGate}`}>
            {/* Input Connection Lines with Glowing Effect */}
            <div className={notStyles.inputLine}>
                <div className={notStyles.lineShadow} />
                <div className={notStyles.lineGlow} />
            </div>

            {/* Output Connection Line - After NOT bubble */}
            <div className={notStyles.outputLine}>
                <div className={notStyles.lineShadow} />
                <div className={notStyles.lineGlow} />
            </div>

            {/* Triangle Border Background */}
            <div className={notStyles.gateBorderBackground} />

            {/* Main Triangle Body */}
            <div className={notStyles.gateBody}>
                <div className={notStyles.metalEffect} />
                <div className={notStyles.innerShadow} />
                <div className={notStyles.highlight} />
                <div className={notStyles.bevel} />
                <span className={notStyles.label}>NOT</span>
            </div>

            {/* NOT Bubble */}
            <div className={notStyles.notBubble}>
                <div className={notStyles.notBubbleInner}>
                    <div className={notStyles.bubbleHighlight} />
                    <div className={notStyles.bubbleGlow} />
                </div>
            </div>

            

            {/* Input Handle */}
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input`}
                isConnectable={isConnectable}
                className={`${styles.handle} ${notStyles.inputHandle} ${notStyles.handleEffect}`}
            />

            {/* Output Handle */}
            <Handle
                type="source"
                position={Position.Right}
                id={`${id}-output`}
                isConnectable={isConnectable}
                className={`${styles.handle} ${notStyles.outputHandle} ${notStyles.handleEffect}`}
            />
        </div>
    );
};

export default NotGateCanvas;
