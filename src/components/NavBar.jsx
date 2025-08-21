import { useGSAP } from "@gsap/react"
import { navLinks } from "../constants"
import gsap from 'gsap'
import { useState } from "react";
import { useEffect } from "react";

const NavBar = () => {


    // useGSAP(() => {
    //     // gsap.fromTo('.hero-text h1',
    //     gsap.fromTo('.navbar',
    //         {
    //             y: 0,
    //             opacity: 0,
    //         },
    //         {
    //             opacity: 1,
    //             y: 25,
    //             duration: 1,
    //             ease: 'power1.inOut'
    //
    //         },
    //     )
    //
    // }, [])
    // track if the user has scrolled down the page
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        // create an event listener for when the user scrolls
        const handleScroll = () => {
            // check if the user has scrolled down at least 10px
            // if so, set the state to true
            const isScrolled = window.scrollY > 10;
            setScrolled(isScrolled);
        };
        // add the event listener to the window
        window.addEventListener("scroll", handleScroll);

        // cleanup the event listener when the component is unmounted
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
            <div className="inner">
                <a className="logo" href="#hero">
                    Vladislav | Dublin
                </a>

                <nav className="desktop">
                    <ul>
                        {navLinks.map(({ link, name }) => (
                            <li key={name} className="group">
                                <a href={link}>
                                    <span>{name}</span>
                                    <span className="underline" />

                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <a href="#contact" className="contact-btn group">
                    <div className="inner">
                        <span>Contact me</span>
                    </div>
                </a>
            </div>
        </header>
    )
}

export default NavBar
