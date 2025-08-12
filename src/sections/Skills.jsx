import { useEffect, useRef, useState } from "react";
import HeroExperience from "./HeroExperience";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Skills = ({ setTechDescription, pointerOutTimeoutRef }) => {
    const skillsRef = useRef(null);
    const [sceneState, setSceneState] = useState('hero');

    useGSAP(() => {
        ScrollTrigger.create({
            trigger: skillsRef.current,
            start: "top center", // Animation starts when top of skills section hits center of viewport
            end: "bottom top",
            onEnter: () => {
                setSceneState('skills');
            },
            onLeaveBack: () => {
                setSceneState('hero');
            },
            // scrub: true // Optional: Smoothly scrub the animation with scroll
        });
    }, []);

    return (
        <section id="Skills" ref={skillsRef} className="flex-center section-padding">
            <div className="w-full h-full md:px-10 px-5">
                <p>Skill Pad</p>
            </div>
            {/* Reuse the 3D scene from HeroExperience */}
            <HeroExperience
                setTechDescription={setTechDescription}
                pointerOutTimeoutRef={pointerOutTimeoutRef}
                sceneState={sceneState}
            />
        </section>
    );
};

export default Skills;
