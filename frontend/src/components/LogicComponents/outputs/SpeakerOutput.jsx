import React, { useState, useEffect, useRef } from 'react';
import { Handle, Position, useEdges, useNodes } from '@xyflow/react';
import styles from "../../../styles/LogicComponents/outputs/SpeakerOutput.module.css";

const SpeakerOutput = ({ data, isConnectable, id }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const edges = useEdges();
    const nodes = useNodes();
    const oscillatorRef = useRef(null);
    const audioContextRef = useRef(null);
    const gainNodeRef = useRef(null);

    const initAudioContext = () => {
        if (!audioContextRef.current) {
            try {
                audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
                gainNodeRef.current = audioContextRef.current.createGain();
                gainNodeRef.current.connect(audioContextRef.current.destination);
            } catch (error) {
                console.error('Failed to initialize audio context:', error);
            }
        }
    };

    useEffect(() => {
        return () => {
            stopSound();
            if (audioContextRef.current) {
                audioContextRef.current.close();
                audioContextRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        const incomingEdge = edges.find(edge => edge.target === id);
        if (!incomingEdge) {
            stopSound();
            setIsPlaying(false);
            return;
        }

        const sourceNode = nodes.find(node => node.id === incomingEdge.source);
        const inputValue = sourceNode?.data?.value ?? false;
        
        if (data.setValue) {
            data.setValue(inputValue);
        }
        
        setIsPlaying(!!inputValue);

        if (inputValue) {
            initAudioContext();
            startSound();
        } else {
            stopSound();
        }
    }, [edges, nodes, id]);

    const startSound = () => {
        if (!audioContextRef.current || oscillatorRef.current) return;

        try {
            const oscillator = audioContextRef.current.createOscillator();
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(440, audioContextRef.current.currentTime);
            
            if (gainNodeRef.current) {
                gainNodeRef.current.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
                oscillator.connect(gainNodeRef.current);
            }

            oscillator.start();
            oscillatorRef.current = oscillator;
        } catch (error) {
            console.error('Failed to start sound:', error);
        }
    };

    const stopSound = () => {
        if (oscillatorRef.current) {
            try {
                oscillatorRef.current.stop();
                oscillatorRef.current.disconnect();
                oscillatorRef.current = null;
            } catch (error) {
                console.error('Failed to stop sound:', error);
            }
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