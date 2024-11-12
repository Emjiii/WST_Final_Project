import React from "react";
import { AndGate, OrGate, NotGate } from "./LogicGate";

function Simulator(){
    return(
        <div style={{textAlign: 'center', padding: '20px'}}>
            <h2>Logic Gates Simulator  </h2>
            <div style={{display: 'flex', justifyContent: 'space-around', marginTop: '20px'}}>
                <AndGate />
                <OrGate />
                <NotGate />
            </div>
        </div>
    );
}

export default Simulator;