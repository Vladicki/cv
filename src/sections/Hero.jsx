// import { useState } from "react"
import { useState } from "react"
import Button from "../components/button"
import { tech } from "../constants"
import HeroExperience from "./HeroExperience"
import { useGSAP } from "@gsap/react"
import gsap from 'gsap'
const Hero = () => {
    useGSAP(() => {
        // gsap.fromTo('.hero-text h1',
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

    return (
        <section id="hero" className="relative overflow-hidden ">
            <div className="absolute top-0 left-0 z-10">
                {/* <img src="/images/bg.png" alt="background" /> */}
            </div>
            <div className="hero-layout">
                {/* This header now handles the responsive layout for its children */}
                <header className="flex flex-col md:flex-row md:justify-between md:items-start md:w-full w-screen xl:mt-20 mt-32 md:px-20 px-5 gap-y-7 md:gap-x-20">

                    {/* This container holds all the left-side text content */}
                    <div className="flex flex-col gap-7">
                        <div className="hero-text">
                            <h1>Vladislav Iurev</h1>
                            <h1>Software Developer</h1>
                            <h1>
                                Profficient with
                                <span className="slide" >
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
                        <p className=" text-white-50 md:text-xl relative z-10 pointer-events-none ">Dublin | Looking for a appartunity</p>
                        <Button
                            className="md:w-80 md:h-16 w-60 h-12"
                            id="button"
                            text="explore"
                        />
                    </div>

                    {/* The techDescription is now a sibling and is aligned to the right on desktop */}
                    <div className="text-5xl text-white text-right z-10 mr-36">
                        {techDescription}
                    </div>

                </header >
                {/* RIGHT HERO CONTENT */}
                <figure>
                    <div className="hero-3d-layout " >
                        {/* border-red-400 border-2  */}
                        <HeroExperience setTechDescription={setTechDescription} />
                        {/* <HeroExperience /> */}

                    </div>
                </figure>
            </div>
        </section>
    )
}
export default Hero
