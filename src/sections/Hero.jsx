// import { useState } from "react"
import { useState, useRef, useEffect } from "react"
import Button from "../components/button"
import { tech } from "../constants"
import HeroExperience from "./HeroExperience"
import { useGSAP } from "@gsap/react"
import gsap from 'gsap'

const Hero = () => {
    useGSAP(() => {
        // Existing animation for h1 elements
        gsap.fromTo('.hero-text h1',
            {
                y: 25,
                opacity: 0,
            },
            {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 1,
                ease: 'power1.inOut'
            },
        )
    })

    const [techDescription, setTechDescription] = useState("");
    const textRef = useRef(null);
    // NEW: Create a ref to manage the timeout for the pointer-out event
    const pointerOutTimeoutRef = useRef(null);

    // Typewriter animation logic
    useEffect(() => {
        if (techDescription) {
            gsap.killTweensOf(".char");

            // Animate each character's opacity from 0 to 1 with a stagger
            gsap.fromTo(".char",
                { opacity: 0 },
                {
                    opacity: 1,
                    stagger: 0.05, // Adjust this value to control the typing speed
                    ease: "none",
                    duration: 0.01 // Very short duration for instant reveal
                }
            );
        }
    }, [techDescription]);

    return (
        <section id="hero" className="relative overflow-hidden">
            <div className="absolute top-0 left-0 z-10">
                {/* <img src="/images/bg.png" alt="background" /> */}
            </div>
            <div className="hero-layout">
                <header className="flex flex-col xl:flex-row md:justify-between md:items-start md:w-full w-screen xl:mt-20 mt-2 md:px-20 px-5 gap-y-7 md:gap-x-20">
                    <div className="flex flex-col gap-7">
                        <div className="hero-text">
                            <h1>Vladislav Iurev</h1>
                            <h1>Software Developer</h1>
                            <h1>
                                Profficient with
                                <span className="slide">
                                    <span className="wrapper">
                                        {tech.map((tech) => (
                                            <span key={tech.text} className="flex items-center md:gap-3 gap-1 pb-2">
                                                <img
                                                    src={tech.imgPath}
                                                    alt={tech.text}
                                                    className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                                                />
                                                <span>{tech.text} </span>
                                            </span>
                                        ))}
                                    </span>
                                </span>
                            </h1>
                        </div>
                        <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">Dublin | Looking for a appartunity</p>
                        <Button
                            className="md:w-80 md:h-16 w-60 h-12"
                            id="button"
                            text="explore"
                        />
                    </div>

                    {/* NEW: Conditionally render the text-box only when techDescription is not empty */}
                    {techDescription && (
                        <div className="text-box">
                            <div className="xl:text-5xl text-4xl text-white font-bold text-center ">
                                <p ref={textRef} >
                                    {techDescription.split('').map((char, index) => (
                                        <span key={index} className="char">
                                            {char}
                                        </span>
                                    ))}
                                </p>
                            </div>
                        </div>
                    )}
                </header>

                <figure>
                    <div className="hero-3d-layout">
                        {/* NEW: Pass the pointerOutTimeoutRef to the HeroExperience component */}
                        <HeroExperience
                            setTechDescription={setTechDescription}
                            pointerOutTimeoutRef={pointerOutTimeoutRef}
                        />
                    </div>
                </figure>
            </div>
        </section>
    )
}

export default Hero;
