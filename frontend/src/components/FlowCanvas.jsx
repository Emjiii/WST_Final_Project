// src/components/FlowCanvas.jsx

import React, { useCallback, useMemo } from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    addEdge,
    useNodesState,
    useEdgesState
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import NotGateCanvas from './gates/NotGate';
import AndGateCanvas from './gates/AndGate';
import OrGateCanvas from './gates/OrGate';
import NandGateCanvas from './gates/NandGate';
import NorGateCanvas from './gates/NorGate';
import XorGateCanvas from './gates/XorGate';
import XnorGateCanvas from './gates/XnorGate';
import BufferGateCanvas from './gates/BufferGate';
import ControlPanel from './ControlPanel';

import InputSwitch from './inputs/InputSwitch';
import PushButton from './inputs/PushButton';
import LedOutput from './outputs/LedOutput';
import RgbLedOutput from './outputs/RgbLedOutput';


// Define nodeTypes with all gates
const nodeTypes = {
    notNode: NotGateCanvas,
    andNode: AndGateCanvas,
    orNode: OrGateCanvas,
    nandNode: NandGateCanvas,
    norNode: NorGateCanvas,
    xorNode: XorGateCanvas,
    xnorNode: XnorGateCanvas,
    bufferNode: BufferGateCanvas,
    inputSwitch: InputSwitch,
    inputButton: PushButton,
    ledOutput: LedOutput,
    rgbLedOutput: RgbLedOutput,
};

const FlowCanvas = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onConnect = useCallback((params) => {
        setEdges((eds) => addEdge(params, eds));
    }, [setEdges]);

    // Define onNodesDelete callback
    const onNodesDelete = useCallback((nodesToDelete) => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete ${nodesToDelete.length} node(s)?`
        );
        
        if (confirmDelete) {
            // Add deletion animation before actual deletion
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

            // Delay actual deletion for animation
            setTimeout(() => {
                setNodes((nodes) =>
                    nodes.filter(
                        (node) => !nodesToDelete.find((n) => n.id === node.id)
                    )
                );
                // Also remove connected edges
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
            const newNode = {
                id: `${nodeData}-${nodes.length + 1}`,
                type: nodeData,
                position: {
                    x: window.innerWidth / 2 - 70,
                    y: window.innerHeight / 2 - 70
                },
                data: { label: `${nodeData.toUpperCase()} Gate` },
                className: 'gate-node'
            };
            setNodes((nds) => nds.concat(newNode));
        }
    }, [nodes.length, setNodes]);

    return (
        <div className="workspace-layout">
            <ControlPanel addGateNode={addGateNode} setNodes={setNodes} />
            <div className="react-flow-container">
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
                >
                    <MiniMap />
                    <Controls />
                    <Background variant="dots" gap={12} size={1} />
                </ReactFlow>
            </div>
        </div>
    );
};

export default FlowCanvas;