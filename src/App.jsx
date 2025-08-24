import React, { useState, useEffect, useRef } from 'react'; // Added useEffect, useRef for loading logic
import * as THREE from 'three'; // Import THREE for DefaultLoadingManager
import { useGLTF, useTexture } from '@react-three/drei'; // For preloading utilities

import NavBar from './components/NavBar.jsx';
import Hero from './sections/Hero.jsx';
// import ShowcaseSection from './sections/ShowcaseSection.jsx'; // Currently commented out
import Cards from './sections/Cards.jsx';
import Skills from './sections/Skills.jsx';
import { Footer } from './components/Footer.jsx';
import Experience from './sections/Experience.jsx';
import Contact from './sections/Contact.jsx';

import LoadingOverlay from './components/LoadingOverlay'; // Import your new loader component


const App = () => {
    // Existing states and refs for your components
    const [techDescription, setTechDescription] = useState("");
    const pointerOutTimeoutRef = useRef(null);

    // States for loading screen
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [finishedLoading, setFinishedLoading] = useState(false);

    // --- Preload all critical assets ---
    // This effect runs once on component mount to start loading your 3D models and textures.
    useEffect(() => {
        // Preload GLTF models
        useGLTF.preload('/models/monke.glb');
        useGLTF.preload('/models/keycup.glb');
        useGLTF.preload('/models/keyboardBase.glb');
        useGLTF.preload('/models/paper-plane.glb');
        useGLTF.preload('/models/knot.glb');
        useGLTF.preload('/models/donut.glb');
        
        // Add any other static textures you might be loading directly with useTexture
        // Example: useTexture.preload('/images/my-background-texture.png'); 

        // For `Keycup` images that are dynamically set via `imgURL`, they will be
        // loaded by `useTexture` within each `Keycup` component as they render.
        // `THREE.DefaultLoadingManager` should still catch these.

    }, []); // Empty dependency array means this runs only once on mount

    // --- Set up THREE.DefaultLoadingManager to track all loading progress ---
    // This effect monitors the loading of all assets handled by Three.js loaders.
    useEffect(() => {
        const manager = THREE.DefaultLoadingManager;

        manager.onStart = (url, itemsLoaded, itemsTotal) => {
            console.log(`Started loading file: ${url}.\nLoaded ${itemsLoaded} of ${itemsTotal} files.`);
        };

        manager.onProgress = (url, itemsLoaded, itemsTotal) => {
            const progress = (itemsLoaded / itemsTotal) * 100;
            setLoadingProgress(progress);
            // console.log(`Loading file: ${url}.\nLoaded ${itemsLoaded} of ${itemsTotal} files. Progress: ${progress.toFixed(2)}%`);
        };

        manager.onLoad = () => {
            console.log('All assets loaded!');
            setLoadingProgress(100); // Ensure progress is 100%
            // A small delay before setting finishedLoading to true
            // This allows the GSAP fade-out animation to start smoothly after load completes.
            setTimeout(() => {
                setFinishedLoading(true);
            }, 500); // 500ms delay before fade-out starts
        };

        manager.onError = (url) => {
            console.error('There was an error loading ' + url);
            // In a real application, you might show an error message to the user here.
            setFinishedLoading(true); // Still hide the loader in case of an error to prevent being stuck.
        };

        // Cleanup function: Remove event listeners if component unmounts to prevent memory leaks.
        return () => {
            manager.onStart = undefined;
            manager.onProgress = undefined;
            manager.onLoad = undefined;
            manager.onError = undefined;
        };
    }, []); // Empty dependency array means this runs only once on mount


    return (
        <>
            {/* Render the loading overlay. It will fade out and hide itself
                once `finishedLoading` is true */}
            <LoadingOverlay progress={loadingProgress} finishedLoading={finishedLoading} />

            {/* Only render the main application content once all assets are loaded
                and the loading overlay has begun its fade-out animation. */}
            {finishedLoading && (
                <div className="relative z-0"> {/* z-0 ensures this content is behind the loading overlay initially */}
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
                </div>
            )}
        </>
    );
}

export default App;
