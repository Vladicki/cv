import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Keycup } from "../components/Models/Keycup"; // Assuming Keycup path
import { tech } from "../constants"; // Assuming tech constants path
import React, { useRef, useEffect, useCallback } from "react"; // Added useCallback
import * as THREE from 'three'; // Import THREE for any direct object manipulation if needed

const Numpad = ({ setTechDescription, pointerOutTimeoutRef }) => {
    // Media queries for responsive camera and group scaling (same as HeroExperience)
    const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });
    const isMidScreen = useMediaQuery({ query: '(max-width: 1500px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    // Ref to hold individual Keycup instances for potential future manipulation
    const keycupRefs = useRef({});

    // Callback ref to assign refs in the map loop for each Keycup
    const getRef = useCallback((techId) => (element) => {
        keycupRefs.current[techId] = element;
    }, []);

    // Note: No GSAP animation logic related to sceneState here.
    // This component's purpose is to render the 'skills' state directly.

    return (
        // Canvas setup (same as HeroExperience)
        <Canvas gl={{ alpha: true }} camera={{ position: isMidScreen ? [0, 0, 13] : isTablet ? [0, 0, 15] : isMobile ? [0, 0, 29] : [0, 0, 11], fov: 45 }}>
            <OrbitControls
                enablePan={false}
                enableZoom={false}
                enableRotate={true}
                maxDistance={20}
                minDistance={5}
                minPolarAngle={Math.PI / 5}
                maxPolarAngle={Math.PI / 2}
            />

            {/* Lighting setup (same as HeroExperience) */}
            <ambientLight intensity={1} />
            <directionalLight intensity={5} position={[-0.5, 4.5, 5]} />

            {/* Group for scaling and overall positioning of the elements */}
            <group
                scale={isTablet ? 0.85 : isMobile ? 0.7 : 1}
                position={[0, -0.7, 0]} // Keep this position offset consistent with HeroExperience if elements are relative
            >

                {/* Render all Keycups */}
                {tech.map((techItem) => (
                    <Keycup
                        key={techItem.text}
                        ref={getRef(techItem.text)} // Attach ref for individual manipulation
                        imgURL={techItem.imgPathPNG}
                        color={techItem.color}
                        // CRITICAL CHANGE: Use techItem.padPosition for initial position
                        position={techItem.padPosition}
                        scale={0.2}
                        // HeroRotation is kept but won't be animated from here
                        rotation={techItem.heroRotation}
                        setTechDescription={setTechDescription}
                        techDesc={techItem.description}
                        text={techItem.text}
                        pointerOutTimeoutRef={pointerOutTimeoutRef}
                    />
                ))}
            </group>
        </Canvas>
    );
};

export default Numpad;

