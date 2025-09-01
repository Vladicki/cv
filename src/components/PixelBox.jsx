import React, { useRef, useEffect } from "react";
import gsap from 'gsap';

const PixelBox = ({ techDescription }) => {
    const textRef = useRef(null);
    // NEW: Ref to hold the audio object for the looping sound
    const dialogAudioRef = useRef(null);

    // NEW: Create and load the looping audio object once when the component mounts
    useEffect(() => {
        try {
            const audio = new Audio('/dialog.mp3');
            audio.loop = true;
            // Set a low volume to not overpower the click sounds
            audio.volume = 0.3;
            dialogAudioRef.current = audio;
        } catch (e) {
            console.error("Failed to create audio element for dialog:", e);
        }
    }, []);

    // Typewriter animation logic specific to this PixelBox instance
    useEffect(() => {
        const chars = textRef.current ? textRef.current.querySelectorAll(".char") : [];

        // Kill any previous GSAP tweens on these characters to prevent conflicts
        gsap.killTweensOf(chars);

        // Immediately set all characters within THIS PixelBox to be invisible
        gsap.set(chars, { opacity: 0 });

        // If a description exists, start the animation and the sound
        if (techDescription) {
            // Calculate the total duration of the animation based on stagger and number of characters
            const totalAnimationDuration = chars.length * 0.05;

            // Start the looping dialog sound
            if (dialogAudioRef.current) {
                dialogAudioRef.current.play().catch(e => console.error("Audio playback failed:", e));
            }

            // Animate each character's opacity from 0 to 1 with a stagger
            gsap.to(chars, {
                opacity: 1,
                stagger: 0.05,
                ease: "none",
                duration: 0.01,
                // On complete, stop the dialog audio
                onComplete: () => {
                    if (dialogAudioRef.current) {
                        dialogAudioRef.current.pause();
                        dialogAudioRef.current.currentTime = 0; // Reset for next time
                    }
                }
            });
        } else {
            // If the description is empty (e.g., on pointer out), stop the sound
            if (dialogAudioRef.current) {
                dialogAudioRef.current.pause();
                dialogAudioRef.current.currentTime = 0;
            }
        }

        // Cleanup function to ensure the sound is paused when the component unmounts
        return () => {
            if (dialogAudioRef.current) {
                dialogAudioRef.current.pause();
                dialogAudioRef.current.currentTime = 0;
            }
        };

    }, [techDescription]); // Rerun this effect whenever techDescription changes

    return (
        <div className="text-box">
            <div className="xl:text-5xl text-3xl md:text-4xl text-white font-bold text-center ">
                <p ref={textRef} >
                    {(techDescription || "").split('').map((char, index) => (
                        <span key={index} className="char">
                            {char}
                        </span>
                    ))}
                </p>
            </div>
        </div>
    );
};

export default PixelBox;
