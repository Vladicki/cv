import { useGSAP } from "@gsap/react"
import { navLinks } from "../constants"
import gsap from 'gsap'

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


    return (
        <header className="navbar">
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
