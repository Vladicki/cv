import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Keycup } from "../components/Models/Keycup";
import { KeyboardBase } from "../components/Models/KeyboardBase.jsx";
import { tech } from "../constants";
import React, { useRef, useEffect, useCallback } from "react";
import * as THREE from 'three';

const Numpad = ({ setTechDescription, pointerOutTimeoutRef }) => {
    const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });
    const isMidScreen = useMediaQuery({ query: '(max-width: 1500px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const keycupRefs = useRef({});
    const getRef = useCallback((techId) => (element) => {
        keycupRefs.current[techId] = element;
    }, []);

    // Ref to hold the OrbitControls instance
    const controlsRef = useRef();

    // Function to log camera position and rotation
    const logCameraState = () => {
        if (controlsRef.current) {
            const camera = controlsRef.current.object;
            console.log("Camera Position:", camera.position);
            console.log("Camera Rotation (Euler):", camera.rotation);
            console.log("Camera Target:", controlsRef.current.target);
        }
    };

    return (
        <Canvas gl={{ alpha: true }} camera={{ position: isMidScreen ? [0, 0, 13] : isTablet ? [0, 0, 15] : isMobile ? [0, 0, 29] : [0, 0, 11], fov: 45 }}>
            <OrbitControls
                ref={controlsRef} // Attach ref to OrbitControls
                enablePan={true} // Temporarily enable pan for easier positioning
                enableZoom={true} // Temporarily enable zoom
                enableRotate={true} // Keep rotate enabled
                maxDistance={20}
                minDistance={5}
                minPolarAngle={Math.PI / 5}
                maxPolarAngle={Math.PI / 2}
                onChange={logCameraState} // Log camera state on change
            />

            <ambientLight intensity={1} />
            <directionalLight intensity={2.5} position={[-1, 2, -2]} />

            <group
                scale={isTablet ? 0.85 : isMobile ? 0.7 : 1}
                position={[0, 0, 1.6]}
            >
                <KeyboardBase
                    position={[0, 0.5, 0]}
                    scale={0.4}
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
                    />
                ))}
            </group>
        </Canvas>
    );
};

export default Numpad;
