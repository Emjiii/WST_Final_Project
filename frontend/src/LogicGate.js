import React, { useState } from "react";
import axios from "axios"; 

export function AndGate(){
    const [input1, setInput1] = useState(false);
    const [input2, setInput2] = useState(false);
    const [output, setOutput] = useState(null);

    const calculateOutput = async () => {
        const response = await axios.post('http://localhost:5000/api/and', {input1, input2});
        setOutput(response.data.output);
    };

    return(
        <div>
            <h3>AND Gate</h3>
            <label>
                Input 1: <input type="checkbox" checked={input1} onChange={() => setInput1(!input1)}/>
            </label>
            <label>
                Input 2: <input type="checkbox" checked={input2} onChange={() => setInput2(!input2)}/>
            </label>
            <button onClick={calculateOutput}>Calculate</button>
            {output !== null && <p>Output: {output ? '1' : '0'}</p>}
        </div>
    );
}

export function OrGate() {
    const [input1, setInput1] = useState(false);
    const [input2, setInput2] = useState(false);
    const [output, setOutput] = useState(null);
  
    const calculateOutput = async () => {
      const response = await axios.post('http://localhost:5000/api/or', { input1, input2 });
      setOutput(response.data.output);
    };
  
    return (
      <div>
        <h3>OR Gate</h3>
        <label>
          Input 1: <input type="checkbox" checked={input1} onChange={() => setInput1(!input1)} />
        </label>
        <label>
          Input 2: <input type="checkbox" checked={input2} onChange={() => setInput2(!input2)} />
        </label>
        <button onClick={calculateOutput}>Calculate</button>
        {output !== null && <p>Output: {output ? '1' : '0'}</p>}
      </div>
    );
  }
  
  export function NotGate() {
    const [input, setInput] = useState(false);
    const [output, setOutput] = useState(null);
  
    const calculateOutput = async () => {
      const response = await axios.post('http://localhost:5000/api/not', { input });
      setOutput(response.data.output);
    };
  
    return (
      <div>
        <h3>NOT Gate</h3>
        <label>
          Input: <input type="checkbox" checked={input} onChange={() => setInput(!input)} />
        </label>
        <button onClick={calculateOutput}>Calculate</button>
        {output !== null && <p>Output: {output ? '1' : '0'}</p>}
      </div>
    );
  }