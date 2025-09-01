import { navLinks } from "../constants"
import { useState } from "react";
import { useEffect } from "react";

const NavBar = () => {

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
                        {navLinks.map(({ link, name, isExternal }) => (
                            <li key={name} className="group">
                                <a
                                    href={link}
                                    {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                >
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
