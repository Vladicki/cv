import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useMediaQuery } from "react-responsive";
import { Keycup } from "../components/Models/Keycup";
import { Head } from "../components/Models/Head";
import { tech } from "../constants";
import React, { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import { useResponsiveFlags } from "../constants/mediaQuery";


const HeroExperience = ({ setTechDescription, pointerOutTimeoutRef }) => {
    // const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });
    // const isMidScreen = useMediaQuery({ query: '(max-width: 1500px)' });
    // const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const { isTablet, isMidScreen, isMobile } = useResponsiveFlags();

    const keycupRefs = useRef({});
    const headRef = useRef();
    const mainTimeline = useRef(null);


    const getRef = (name) => (element) => {
        keycupRefs.current[name] = element;
    };

    return (
        <Canvas gl={{ alpha: true }} camera={{
            position: isMidScreen ? [0, 0, 13] : isTablet ? [0, 0, 15] : isMobile ? [0, 0, 20] : [0, 0, 11],
            fov: isMidScreen ? 50 : isTablet ? 55 : isMobile ? 60 : 45
        }}>
            <OrbitControls
                enablePan={false}
                enableZoom={false}
                enableRotate={true}
                maxDistance={20}
                minDistance={5}
                minPolarAngle={Math.PI / 5}
                maxPolarAngle={Math.PI / 2}
            />

            {/* Replaced HeroLights with a standard lighting setup */}
            {/* <ambientLight intensity={0.2} color="#1a1a40" /> */}
            <directionalLight intensity={4.5} position={[-0.5, 4.5, 5]} />
            <ambientLight intensity={2} />

            <group
                scale={isTablet ? 0.85 : isMobile ? 0.7 : 1}
                position={[0, -0.7, 0]}
            >
                <Head ref={headRef} scale={1.2} position={[0, .15, 1]}
                    setTechDescription={setTechDescription}
                    pointerOutTimeoutRef={pointerOutTimeoutRef}
                />

                {tech.map((techItem) => (
                    <Keycup
                        key={techItem.text}
                        ref={getRef(techItem.text)}
                        imgURL={techItem.imgPathPNG}
                        color={techItem.color}
                        position={techItem.position}
                        scale={0.2}
                        rotation={techItem.heroRotation}
                        setTechDescription={setTechDescription}
                        techDesc={techItem.description}
                        text={techItem.text}
                        pointerOutTimeoutRef={pointerOutTimeoutRef}
                        floatSpeed={1.75}
                        floatRotationIntensity={4}
                        floatFloatIntensity={3}
                        sceneType="hero"

                    />
                ))}
            </group>
        </Canvas>
    )
}

export default HeroExperience;
