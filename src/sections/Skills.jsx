import { useEffect, useRef, useState } from "react";
import HeroExperience from "./HeroExperience";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Numpad from "./Numpad";
import PixelBox from "../components/PixelBox";
import TitleHeader from "../components/TitleHeader"; // Make sure TitleHeader is imported
import { useResponsiveFlags } from "../constants/mediaQuery";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Skills = ({ techDescription, setTechDescription, pointerOutTimeoutRef }) => {
    const skillsRef = useRef(null);
    const [sceneState, setSceneState] = useState('hero');
    const { isTablet, isMidScreen, isMobile } = useResponsiveFlags();

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
        <section
            id="Skills"
            ref={skillsRef}
            // CRITICAL: Add 'relative' here to make it the positioning context
            // Change 'flex-center' to 'flex flex-col justify-start items-start' to stack children from the top
            className="section-padding min-h-screen relative flex flex-col justify-start items-start"
        >
            {/* This div contains TitleHeader and PixelBox.
                It needs to have a higher z-index to appear on top of the 3D canvas. */}
            <div className="w-full md:px-10 px-5 relative z-20"> {/* Increased z-index to 20 */}
                <TitleHeader
                    title="Skills"
                    sub="Hint: press a key"
                />
            </div>
            {techDescription && (
                <PixelBox
                    techDescription={techDescription} />
            )}

            {/* This div now fully spans the section due to 'inset-0' in .skills-3d CSS
                and will be behind the text content due to z-index. */}
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
