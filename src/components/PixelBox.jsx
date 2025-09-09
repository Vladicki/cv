import { useRef, useEffect, useState } from "react";
import gsap from 'gsap';

const PixelBox = ({ techDescription }) => {
    const textRef = useRef(null);
    const dialogAudioRef = useRef(null);

    // NEW: Use state to manage the text that is actually displayed.
    const [displayedDescription, setDisplayedDescription] = useState(techDescription);

    // Create and load the looping audio object once when the component mounts
    useEffect(() => {
        try {
            const audio = new Audio('/dialog.mp3');
            audio.loop = true;
            audio.volume = 0.3;
            dialogAudioRef.current = audio;
        } catch (e) {
            console.error("Failed to create audio element for dialog:", e);
        }
    }, []);

    // This useEffect now acts as a controller for the animation flow.
    useEffect(() => {
        // Step 1: When a new techDescription arrives, instantly clear the old one.
        // This causes a re-render with an empty string, clearing the box.
        if (techDescription !== displayedDescription) {
            setDisplayedDescription("");

            // Step 2: Use a timeout to wait for the clear to render, then set the new text.
            setTimeout(() => {
                setDisplayedDescription(techDescription);
            }, 50); // Small delay to ensure the box is blank before filling
        }
    }, [techDescription]); // This effect only runs when the external prop changes

    // This useEffect handles the actual animation based on the internal state.
    useEffect(() => {
        const chars = textRef.current ? textRef.current.querySelectorAll(".char") : [];

        // Kill any previous GSAP tweens on these characters to prevent conflicts
        gsap.killTweensOf(chars);

        // Instantly set all characters to invisible before the animation starts.
        // This prevents flickering on the very first render and after the brief clear.
        gsap.set(chars, { opacity: 0 });

        let timeoutId;

        if (displayedDescription) {
            timeoutId = setTimeout(() => {
                if (dialogAudioRef.current) {
                    dialogAudioRef.current.play().catch(e => console.error("Audio playback failed:", e));
                }

                gsap.to(chars, {
                    opacity: 1,
                    stagger: 0.05,
                    ease: "none",
                    duration: 0.01,
                    onComplete: () => {
                        if (dialogAudioRef.current) {
                            dialogAudioRef.current.pause();
                            dialogAudioRef.current.currentTime = 0;
                        }
                    }
                });
            }, 150); // 0.15-second delay
        } else {
            if (dialogAudioRef.current) {
                dialogAudioRef.current.pause();
                dialogAudioRef.current.currentTime = 0;
            }
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            if (dialogAudioRef.current) {
                dialogAudioRef.current.pause();
                dialogAudioRef.current.currentTime = 0;
            }
        };
    }, [displayedDescription]); // This effect now depends on the internal state

    return (
        <div className="text-box">
            <div className="xl:text-5xl text-3xl md:text-4xl text-white font-bold text-center ">
                <p ref={textRef} >
                    {(displayedDescription || "").split('').map((char, index) => (
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
