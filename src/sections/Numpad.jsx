import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Keycup } from "../components/Models/Keycup";
import { KeyboardBase } from "../components/Models/KeyboardBase.jsx";
import { tech } from "../constants";
import React, { useRef, useEffect, useCallback } from "react";
import * as THREE from 'three';

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NUMPAD_CAMERA_POSITION = [-2.5346015575649266, 6.648421865875828, -5.161978471006527];
const NUMPAD_CAMERA_ROTATION_EULER = [-2.2309913381757256, -0.29248767950299326, -2.7860116377670656];

const Numpad = ({ setTechDescription, pointerOutTimeoutRef }) => {
    const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });
    const isMidScreen = useMediaQuery({ query: '(max-width: 1500px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const keycupRefs = useRef({});
    const numpadGroupRef = useRef();

    // Callback to get refs for each Keycup
    const getRef = (name) => (element) => {
        keycupRefs.current[name] = element;
    };

    // Animate keycups falling in once on scroll
    useEffect(() => {
        const keycupElements = Object.values(keycupRefs.current).filter(Boolean);
        if (!keycupElements.length) return;

        // Set initial positions above their final positions
        keycupElements.forEach(el => {
            el.position.y += 3; // start above
            const mesh = el.children[0];
            if (mesh?.material) {
                mesh.material.transparent = true;
                mesh.material.opacity = 0;
            }
        });

        // Animate drop with stagger
        gsap.to(keycupElements, {
            y: el => el.position.y - 3, // drop to original padPosition
            duration: 1.2,
            ease: "bounce.out",
            stagger: 0.1,
            onUpdate: () => {
                keycupElements.forEach(el => {
                    const mesh = el.children[0];
                    if (mesh?.material) mesh.material.opacity = 1;
                });
            },
            scrollTrigger: {
                trigger: numpadGroupRef.current,
                start: "top 40%", // 40% down viewport
                once: true,
            },
        });
    }, []);

    return (
        <Canvas
            gl={{ alpha: true }}
            camera={{
                position: NUMPAD_CAMERA_POSITION,
                rotation: new THREE.Euler(...NUMPAD_CAMERA_ROTATION_EULER),
                fov: isTablet ? 60 : isMobile ? 70 : 50,
            }}
        >
            <ambientLight intensity={1} />
            <directionalLight intensity={3.1} position={[-1, 2, -2]} />
            <pointLight position={[5, 5, 5]} />

            <group
                ref={numpadGroupRef}
                scale={isTablet ? 0.85 : isMidScreen ? 0.8 : isMobile ? 0.7 : 1}
                position={[0.6, 0, 1.4]}
            >
                <KeyboardBase
                    position={[0, 0.5, 0]}
                    scale={0.4}
                    baseColor={"#0f0f0f"}
                />

                {tech.map((techItem) => (
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
