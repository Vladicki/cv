import { experiences } from "../constants";
import HeroExperience from "./HeroExperience"
import gsap from 'gsap'
import { useGSAP } from "@gsap/react"
import { tech } from "../constants"
import { useState, useRef, useEffect } from "react"

const Skills = () => {
    return (
        <section id="Skills" className="flex-center section-padding">
            <div className="w-full h-full md:px-10 px-5">
                <p>Skill Paf</p>
            </div>
            <figure>
                <div className="hero-3d-layout">
                    {/* NEW: Pass the pointerOutTimeoutRef to the HeroExperience component */}
                    <HeroExperience
                        setTechDescription={setTechDescription}
                        pointerOutTimeoutRef={pointerOutTimeoutRef}
                    />
                </div>
            </figure>

        </section>
    );
};

export default Skills;

