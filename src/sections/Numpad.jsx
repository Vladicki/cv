import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Keycup } from "../components/Models/Keycup";
import { KeyboardBase } from "../components/Models/KeyboardBase.jsx";
import { tech } from "../constants";
import React, { useRef, useEffect, useCallback, useState } from "react"; // Added useState
import * as THREE from 'three';

import gsap from "gsap"; // Import gsap
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Import ScrollTrigger
import { useGSAP } from "@gsap/react"; // Import useGSAP

gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger plugin

// Define your desired steady camera settings
const NUMPAD_CAMERA_POSITION = [-2.5346015575649266, 6.648421865875828, -5.161978471006527];
const NUMPAD_CAMERA_ROTATION_EULER = [-2.2309913381757256, -0.29248767950299326, -2.7860116377670656];

const Numpad = ({ setTechDescription, pointerOutTimeoutRef }) => {
    const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });
    const isMidScreen = useMediaQuery({ query: '(max-width: 1500px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const keycupRefs = useRef({});
    // State to hold the shuffled tech items for rendering
    const [shuffledTech, setShuffledTech] = useState([]);
    // Ref for the main group of the numpad, used as the ScrollTrigger trigger element
    const numpadGroupRef = useRef();

    // Callback to get refs for each Keycup
    const getRef = useCallback((techId) => (element) => {
        keycupRefs.current[techId] = element;
    }, []);

    // Shuffle tech items once on component mount
    useEffect(() => {
        const shuffled = [...tech].sort(() => Math.random() - 0.5);
        setShuffledTech(shuffled);
    }, []);

    // GSAP animation setup
    useGSAP(() => {
        // Ensure all keycup refs are populated before setting up the animation
        // This check prevents animation from running before all components are rendered
        if (Object.keys(keycupRefs.current).length !== shuffledTech.length) {
            return; // Not all keycups are ready yet
        }

        // Convert the refs object to an array of THREE.Group objects for GSAP targeting
        const keycupElements = shuffledTech.map(item => keycupRefs.current[item.text]);

        // Define the initial state of keycups (above their final position and invisible)
        keycupElements.forEach((element) => {
            if (element) {
                // Set initial Y position significantly above the final position
                element.position.y += 5; // Start 5 units above
                // Set opacity of the mesh material to 0 for fade-in effect
                // Assuming the mesh is the first child of the groupAnimRef in Keycup
                const mesh = element.children[0];
                if (mesh && mesh.material) {
                    mesh.material.transparent = true; // Enable transparency for the material
                    mesh.material.opacity = 0; // Set initial opacity to 0
                }
            }
        });

        // Create the scroll-triggered animation for keycups
        gsap.to(keycupElements, {
            // Animate to their final Y position (which is already set in the element.position.y)
            y: (index, target) => target.position.y - 5, // Animate back down to its original Y
            opacity: 1, // Fade in to full opacity
            duration: 1.5, // Animation duration
            ease: "power3.out", // Easing function
            stagger: {
                each: 0.1, // Stagger appearance by 0.1 seconds per keycup
                from: "random" // Make them appear in a random order
            },
            scrollTrigger: {
                trigger: numpadGroupRef.current, // Use the ref for the main group as the trigger
                start: "top 80%", // Animation starts when the top of the numpad group is 80% down the viewport
                // Toggle actions on enter/leave for better control (e.g., if you scroll back up)
                toggleActions: "play none none reverse",
                // markers: true, // Uncomment for debugging ScrollTrigger in development
            },
            onUpdate: (self) => {
                // Ensure opacity updates correctly during stagger, as gsap.to directly on elements handles this
                // for the main targets. This onUpdate might not be strictly necessary for opacity
                // if the targets are the elements themselves and their material's opacity.
                // Re-iterating for clarity that GSAP handles property tweening automatically.
            },
            // On complete, ensure materials are fully opaque if needed
            onComplete: () => {
                keycupElements.forEach(element => {
                    const mesh = element.children[0];
                    if (mesh && mesh.material) {
                        mesh.material.opacity = 1; // Ensure final opacity is 1
                    }
                });
            }
        });

    }, [shuffledTech]); // Rerun GSAP setup only when shuffledTech (and thus keycupElements) is ready

    return (
        <Canvas
            gl={{ alpha: true }}
            camera={{
                position: NUMPAD_CAMERA_POSITION,
                rotation: new THREE.Euler(...NUMPAD_CAMERA_ROTATION_EULER),
                fov: isTablet ? 60 : 45,
            }}
        >
            <OrbitControls
                enablePan={false}
                enableZoom={false}
                enableRotate={false}
            />

            <ambientLight intensity={1} />
            <directionalLight intensity={3.1} position={[-1, 2, -2]} />
            <pointLight position={[5, 5, 5]} />

            {/* Attach numpadGroupRef to the main group containing the keyboard and keycups */}
            <group
                ref={numpadGroupRef} // Assign the ref here
                scale={isTablet ? 0.85 : isMidScreen ? 0.8 : isMobile ? 0.7 : 1}
                position={[0, 0, 1.6]}
            >
                <KeyboardBase
                    position={[0, 0.5, 0]}
                    scale={0.4}
                    baseColor={"#0f0f0f"}
                />

                {/* Map over shuffledTech to render keycups */}
                {shuffledTech.map((techItem) => (
                    <Keycup
                        key={techItem.text}
                        ref={getRef(techItem.text)}
                        imgURL={techItem.imgPathPNG}
                        color={techItem.color}
                        position={techItem.padPosition}
                        scale={0.41}
                        rotation={[0, 0, 0]}
                        setTechDescription={setTechDescription}
                        techDesc={techItem.description}
                        text={techItem.text}
                        pointerOutTimeoutRef={pointerOutTimeoutRef}
                        floatSpeed={0}
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
