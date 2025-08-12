import { useEffect, useRef, useState } from "react";
import HeroExperience from "./HeroExperience";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Numpad from "./Numpad";
import PixelBox from "../components/PixelBox";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Skills = ({ techDescription, setTechDescription, pointerOutTimeoutRef }) => {
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
        <section id="Skills" ref={skillsRef} className="flex-center section-padding min-h-screen mt-0 relative">
            <div className="w-full md:px-10 px-5 relative z-10">
                <p>Skill Pad</p>
                {techDescription && (
                    <PixelBox
                        techDescription={techDescription} />
                )}

            </div>
            {/* Wrap HeroExperience in a container with a height class.
              You've already defined the perfect CSS class for this: .skills-3d
            */}
            <div className="skills-3d">
                <Numpad

                    setTechDescription={setTechDescription}
                    pointerOutTimeoutRef={pointerOutTimeoutRef}
                />
            </div>
        </section>
    );
};

export default Skills;
