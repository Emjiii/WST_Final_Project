import React, { useState, useEffect, useRef } from 'react';
import { Handle, Position, useEdges, useNodes } from '@xyflow/react';
import styles from "../../../styles/LogicComponents/outputs/SpeakerOutput.module.css";

const SpeakerOutput = ({ data, isConnectable, id }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const edges = useEdges();
    const nodes = useNodes();
    const oscillatorRef = useRef(null);
    const audioContextRef = useRef(null);

    useEffect(() => {
        // Initialize audio context
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        
        // Cleanup function
        return () => {
            if (oscillatorRef.current) {
                oscillatorRef.current.stop();
                oscillatorRef.current.disconnect();
            }
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    useEffect(() => {
        const incomingEdge = edges.find(edge => edge.target === id);
        const inputValue = incomingEdge 
            ? nodes.find(node => node.id === incomingEdge.source)?.data?.value 
            : false;
        
        setIsPlaying(inputValue);

        // Handle audio based on input value
        if (inputValue) {
            startSound();
        } else {
            stopSound();
        }
    }, [edges, nodes, id]);

    const startSound = () => {
        if (!audioContextRef.current) return;
        
        // Stop any existing sound
        stopSound();

        // Create and configure oscillator
        const oscillator = audioContextRef.current.createOscillator();
        const gainNode = audioContextRef.current.createGain();
        
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(440, audioContextRef.current.currentTime); // 440Hz = A4 note
        
        gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime); // Set volume to 0.1

        // Connect nodes
        oscillator.connect(gainNode);
        gainNode.connect(audioContextRef.current.destination);
        
        // Start oscillator
        oscillator.start();
        oscillatorRef.current = oscillator;
    };

    const stopSound = () => {
        if (oscillatorRef.current) {
            oscillatorRef.current.stop();
            oscillatorRef.current.disconnect();
            oscillatorRef.current = null;
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.chassis} />
            <div className={`${styles.frame} ${isPlaying ? styles.active : ''}`}>
                <div className={styles.screwTopLeft}></div>
                <div className={styles.screwTopRight}></div>
                <div className={styles.tweeterAssembly}>
                    <div className={styles.tweeterDome}></div>
                </div>
                <div className={`${styles.speakerCone} ${isPlaying ? styles.vibrating : ''}`}>
                    <div className={styles.suspensionRing}></div>
                    <div className={styles.dustCap}></div>
                </div>
                <div className={styles.bassPort}></div>
                <div className={styles.screwBottomLeft}></div>
                <div className={styles.screwBottomRight}></div>
            </div>
            <Handle
                type="target"
                position={Position.Bottom}
                id={`${id}-input`}
                isConnectable={isConnectable}
                className={styles.handle}
            />
        </div>
    );
};

export default SpeakerOutput;