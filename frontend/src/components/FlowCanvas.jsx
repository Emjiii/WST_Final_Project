import React, { useCallback, useState } from 'react';
import Header from './Header';
import { useDarkMode } from '../utils/useDarkMode';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';


// Update these imports to reflect the correct folder structure
import NotGateCanvas from '../components/LogicComponents/gates/NotGate';
import AndGateCanvas from '../components/LogicComponents/gates/AndGate';
import OrGateCanvas from '../components/LogicComponents/gates/OrGate';
import NandGateCanvas from '../components/LogicComponents/gates/NandGate';
import NorGateCanvas from '../components/LogicComponents/gates/NorGate';
import XorGateCanvas from '../components/LogicComponents/gates/XorGate';
import XnorGateCanvas from '../components/LogicComponents/gates/XnorGate';
import BufferGateCanvas from '../components/LogicComponents/gates/BufferGate';

// Input components
import InputSwitch from '../components/LogicComponents/inputs/InputSwitch';

// Output components
import PushButton from '../components/LogicComponents/inputs/PushButton';
import LedOutput from '../components/LogicComponents/outputs/LedOutput';
import RgbLedOutput from '../components/LogicComponents/outputs/RgbLedOutput';
import SpeakerOutput from '../components/LogicComponents/outputs/SpeakerOutput';
import ControlPanel from './ControlPanel';

import '@xyflow/react/dist/style.css';
import '../styles/flow.css';
import TruthTable from './TruthTable';


const nodeTypes = {
  notNode: NotGateCanvas,
  andNode: AndGateCanvas,
  orNode: OrGateCanvas,
  nandNode: NandGateCanvas,
  norNode: NorGateCanvas,
  xorNode: XorGateCanvas,
  xnorNode: XnorGateCanvas,
  bufferNode: BufferGateCanvas,
  inputNode: InputSwitch,
  button: PushButton,
  ledOutput: LedOutput,
  rgbLedOutput: RgbLedOutput,
  speakerOutput: SpeakerOutput,
}

const FlowCanvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isDarkMode, setIsDarkMode] = useDarkMode();
  const [showTruthTable, setShowTruthTable] = useState(false);

  // Connection callback
  const onConnect = useCallback((params) => {
    setEdges((prevEdges) => addEdge(params, prevEdges));
  }, []);

  const onNodesDelete = useCallback((nodesToDelete) => {
    const nodeCount = nodesToDelete.length;
    const nodeIds = nodesToDelete.map(node => node.id).join(', ');
    
    const confirmDelete = window.confirm(
        `Are you sure you want to delete ${nodeCount} node${nodeCount > 1 ? 's' : ''}? (${nodeIds})`
    );
    
    if (confirmDelete) {
        setNodes((nodes) =>
            nodes.map((node) => {
                if (nodesToDelete.find((n) => n.id === node.id)) {
                    return {
                        ...node,
                        className: `${node.className || ''} deleting`,
                    };
                }
                return node;
            })
        );
        setTimeout(() => {
            setNodes((nodes) =>
                nodes.filter(
                    (node) => !nodesToDelete.find((n) => n.id === node.id)
                )
            );
            setEdges((edges) =>
                edges.filter(
                    (edge) =>
                        !nodesToDelete.find(
                            (node) =>
                                node.id === edge.source || node.id === edge.target
                        )
                )
            );
        }, 300);
    }
    return confirmDelete;
  }, [setNodes, setEdges]);


    const addGateNode = useCallback((nodeData) => {
        // Check if nodeData is an object (from input/output nodes)
        if (typeof nodeData === 'object') {
            setNodes((nds) => nds.concat(nodeData));
        } else {
            // Handle regular gates (when nodeData is a string type)
            const nodeId = `${nodeData}-${nodes.length + 1}`;
            const newNode = {
                id: nodeId,
                type: nodeData,
                position: {
                    x: window.innerWidth / 2 - 70,
                    y: window.innerHeight / 2 - 70
                },
                data: { label: `${nodeData.toUpperCase()} Gate`,
                value: null, 
                setValue: (newValue) => {
                    if (setNodes) {
                        setNodes((nds) =>
                            nds.map((node) => {
                                if (node.id === nodeId) {
                                    // Only update if the new value is different
                                    if (node.data.value !== newValue) {
                                        return {
                                            ...node,
                                            data: {
                                                ...node.data,
                                                value: newValue
                                            }
                                        };
                                    }
                                }
                                return node;
                            })
                        );
                    }
                }
            },
                className: 'gate-node-input'
            };
            setNodes((nds) => nds.concat(newNode));
        }
    }, [nodes.length, setNodes]);


  return (
    <div className="flow-wrapper">
      <Header 
        addGateNode={addGateNode} 
        isDarkMode={isDarkMode} 
        setIsDarkMode={setIsDarkMode}
        onTruthTableClick={() => setShowTruthTable(prev => !prev)}
        getNodes={() => nodes} 
        getEdges={() => edges} 
      />
      <ControlPanel addGateNode={addGateNode} setNodes={setNodes} />
      <div id="circuitCanvas" className={`flow-container ${showTruthTable ? 'with-truth-table' : ''}`}>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          onConnect={onConnect}
          onNodesDelete={onNodesDelete}
          deleteKeyCode={['Backspace', 'Delete']}
          fitView
          className={`flow-canvas ${showTruthTable ? 'shrunk' : ''}`}
          snapToGrid={false}
          elevateNodesOnSelect={true}
          panOnDrag={true}
          selectNodesOnDrag={false}
          nodesDraggable={true}
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
          minZoom={0.1}
          maxZoom={4}
          isValidConnection={(connection) => {
            // Prevent multiple connections to the same target
            const existingEdge = edges.find(
              edge => 
                edge.target === connection.target && 
                edge.targetHandle === connection.targetHandle
            );
            return !existingEdge;
          }}
        >
          <Controls id="flow-controls" className="flow-controls" />
          <MiniMap id="flow-minimap" className="flow-minimap" />
          <Background 
            variant="dots" 
            gap={12} 
            size={1}
            color={isDarkMode ? '#334155' : '#94a3b8'}
          />
          <div className="power-lines" />
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="electric-spark"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </ReactFlow>
        <TruthTable 
          isVisible={showTruthTable}
          nodes={nodes}
          edges={edges}
        />
      </div>
    </div>
  );
};

export default FlowCanvas;