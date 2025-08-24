import NavBar from './components/NavBar.jsx'
import Hero from './sections/Hero.jsx'
import ShowcaseSection from './sections/ShowcaseSection.jsx'
import Cards from './sections/Cards.jsx'
import Skills from './sections/Skills.jsx'
import React, { useState, useRef } from 'react';
import { Footer } from './components/Footer.jsx'
import Experience from './sections/Experience.jsx'
import Contact from './sections/Contact.jsx'
const App = () => {

    const [techDescription, setTechDescription] = useState("");
    const pointerOutTimeoutRef = useRef(null);
    return (
        <>
            <NavBar />
            <Hero
                techDescription={techDescription}
                setTechDescription={setTechDescription}
                pointerOutTimeoutRef={pointerOutTimeoutRef}
            />
            {/* <ShowcaseSection /> */}
            <Cards />
            <Experience />
            <Skills
                techDescription={techDescription}
                setTechDescription={setTechDescription}
                pointerOutTimeoutRef={pointerOutTimeoutRef}
            />
            <Contact />
            <Footer />
        </>
    )
}

export default App
