import SocialIcon from "../components/SocialIcon";

// This component now receives props from a parent component (e.g., App.js)
import { useEffect } from "react"
import { socialImgs, tech } from "../constants";
import HeroExperience from "./HeroExperience"
import gsap from 'gsap'
import PixelBox from "../components/PixelBox"

// NEW: Hero now accepts props for state and refs
const Hero = ({ techDescription, setTechDescription, pointerOutTimeoutRef }) => {
    // ThetextRef is still local to this component as it's not shared
    useEffect(() => {
        gsap.to(".wrapper", {
            y: "-100%",             // scroll through the full height
            duration: 20,           // adjust speed (higher = slower)
            ease: "none",           // no easing, linear motion
            repeat: -1,             // loop forever
        });
    }, []);

    return (
        <section id="hero" className="relative overflow-hidden">
            <div className="absolute top-0 left-0 z-10">
                {/* <img src="/images/bg.png" alt="background" /> */}
            </div>
            <div className="hero-layout">
                <header className="flex flex-col md:flex-row md:justify-between md:items-start md:w-full w-screen xl:mt-20 mt-2 xl:px-2 px-4 gap-y-7 gap-x-0 sm:gap-x-5 md:gap-x-20">
                    <div className="flex flex-col ml-2 md:ml-8 gap-4">
                        <div className="hero-text">
                            <h1>Vladislav Iurev</h1>
                            <h1>Software Developer</h1>
                            <h1>
                                Proficient with
                                <span className="slide">
                                    <span className="wrapper">
                                        {tech.map((tech) => (
                                            <span key={tech.text} className="-z-50 flex items-center md:gap-3 gap-1 pb-2">
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
                        <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">Dublin | Looking for a opportunity</p>
                        <div className="socials hero-socials">
                            {socialImgs.map((socialImg, index) => (
                                <SocialIcon key={index} socialImg={socialImg} />
                            ))}
                        </div>

                    </div>

                    {techDescription && (
                        <PixelBox
                            techDescription={techDescription} />
                    )}

                </header>

                <figure>
                    <div className="hero-3d-layout {
">
                        {/* HeroExperience now receives props and sceneState="hero" */}
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
