import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Keycup } from "../components/Models/Keycup";
import { KeyboardBase } from "../components/Models/KeyboardBase.jsx";
import { tech } from "../constants";
import React, { useRef, useEffect, useCallback } from "react";
import * as THREE from 'three';

// Define your desired steady camera settings
const NUMPAD_CAMERA_POSITION = [-2.5346015575649266, 6.648421865875828, -5.161978471006527];
const NUMPAD_CAMERA_ROTATION_EULER = [-2.2309913381757256, -0.29248767950299326, -2.7860116377670656];

const Numpad = ({ setTechDescription, pointerOutTimeoutRef }) => {
    const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });
    const isMidScreen = useMediaQuery({ query: '(max-width: 1500px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const keycupRefs = useRef({});
    const getRef = useCallback((techId) => (element) => {
        keycupRefs.current[techId] = element;
    }, []);

    return (
        <Canvas
            gl={{ alpha: true }}
            // Apply the fixed camera position and rotation directly
            camera={{
                position: NUMPAD_CAMERA_POSITION,
                rotation: new THREE.Euler(...NUMPAD_CAMERA_ROTATION_EULER), // Use THREE.Euler for rotation
                fov: 45,
            }}
        >
            <OrbitControls
                enablePan={false}     // Disable panning
                enableZoom={false}    // Disable zooming
                enableRotate={false}  // Disable rotating, as camera position is fixed
            // maxDistance, minDistance, minPolarAngle, maxPolarAngle will still apply
            // if you re-enable controls, but are redundant for a fixed camera.
            // You can remove them if you want a truly static camera with no controls.
            />

            <ambientLight intensity={1} />
            <directionalLight intensity={3.1} position={[-1, 2, -2]} />

            <group
                scale={isTablet ? 0.85 : isMidScreen ? 0.8 : isMobile ? 0.7 : 1}
                position={[0, 0, 1.6]}
            >
                <KeyboardBase
                    position={[0, 0.5, 0]}
                    scale={0.4}
                    baseColor={"#0f0f0f"} // NEW: Pass the baseColor prop here

                />

                {tech.map((techItem) => (
                    <Keycup
                        key={techItem.text}
                        ref={getRef(techItem.text)}
                        imgURL={techItem.imgPathPNG}
                        color={techItem.color}
                        position={techItem.padPosition}
                        scale={0.4}
                        rotation={[0, 0, 0]}
                        setTechDescription={setTechDescription}
                        techDesc={techItem.description}
                        text={techItem.text}
                        pointerOutTimeoutRef={pointerOutTimeoutRef}
                        floatSpeed={0} // Ensure no floating animation in Numpad
                        floatRotationIntensity={0}
                        floatFloatIntensity={0}
                        sceneType="numpad"
                    />
                ))}
            </group>
        </Canvas>
    );
};

export default Numpad;
