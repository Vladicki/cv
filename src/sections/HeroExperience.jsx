import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useMediaQuery } from "react-responsive";
import { Keycup } from "../components/Models/Keycup";
import HeroLights from "./HeroLight";
import { Head } from "../components/Models/Head-cleaner";
import { Head_final } from "../components/Models/Head-final";
import { tech } from "../constants";
import React, { useCallback, useEffect, useRef } from "react";
//
// SVG loaders
// import SVGMesh from '../components/SVGMesh'
// import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
// import { useLoader } from '@react-three/fiber'
const HeroExperience = ({ setTechDescription }) => {
    const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const techRefs = useRef({});

    const getRef = useCallback((techId) => {
        if (!techRefs.current[techId]) {
            techRefs.current[techId] = React.createRef(); // Use createRef for individual refs
        }
        return techRefs.current[techId];
    }, []); // Empty dependency array means this function is created once


    //NOTE: DUBUGGING TO OUTPUT ALL THE REF's
    // Add this useEffect to log the refs after they are populated
    useEffect(() => {
        // console.log("All tech refs:", techRefs.current);

        // To see the specific name and the object it points to for each
        for (const techName in techRefs.current) {
            if (techRefs.current.hasOwnProperty(techName)) {
                console.log(`Ref for "${techName}":`, techRefs.current[techName].current);
            }
        }
    }, [techRefs, tech]); // Dependency array: run when techRefs or tech changes (usually once on mount)

    return (
        // <Canvas camera={{ position: [0, 0, 11], fov: 45 }}>
        <Canvas camera={{ position: isTablet ? [0, 0, 12] : [0, 0, 11], fov: 45 }}>
            < OrbitControls
                enablePan={false}
                enableZoom={false}
                enableRotate={true}
                //camera render distance
                maxDistance={20}
                minDistance={5}

                //Limit camera angle view
                minPolarAngle={Math.PI / 5}
                maxPolarAngle={Math.PI / 2}
            />

            <group
                scale={isTablet ? 0.85 : isMobile ? 0.7 : 1}
                position={[0, -0.7, 0]}
            >
                {/* <Head_final position={[3, .15, 1]} scale={1.2} /> */}

                <Head position={[0, .15, 1]} />

                {tech.map((techItem) => (

                    <Keycup
                        key={techItem.text}
                        ref={getRef(techItem.text)} // getRef now returns wrapperObject.ref
                        imgURL={techItem.imgPathPNG}
                        color={techItem.color}
                        position={techItem.position}
                        scale={0.2}
                        rotation={techItem.heroRotation}
                        setTechDescription={setTechDescription}
                        techDesc={techItem.description}
                        text={techItem.text}
                    />
                ))}

                <HeroLights />
            </group>
        </Canvas>
    )
}

export default HeroExperience
