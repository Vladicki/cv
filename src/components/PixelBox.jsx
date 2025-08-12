// PixelBox.jsx
import React, { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';

const PixelBox = ({ techDescription }) => {
    const textRef = useRef(null); // Ref for the parent <p> tag within PixelBox

    // Typewriter animation logic specific to this PixelBox instance
    useEffect(() => {
        if (techDescription) {
            // Kill any previous animations on these characters to prevent conflicts
            gsap.killTweensOf(".char", textRef.current); // Target only chars within this specific PixelBox

            // Immediately set all characters within THIS PixelBox to be invisible
            // This is crucial to prevent the "flicker"
            gsap.set(textRef.current.querySelectorAll(".char"), { opacity: 0 });

            // Animate each character's opacity from 0 to 1 with a stagger
            gsap.to(textRef.current.querySelectorAll(".char"),
                {
                    opacity: 1,
                    stagger: 0.05, // Adjust this value to control the typing speed
                    ease: "none",
                    duration: 0.01 // Very short duration for instant reveal
                }
            );
        }
    }, [techDescription]); // Rerun this effect whenever techDescription changes

    return (
        <div className="text-box">
            <div className="xl:text-5xl text-4xl text-white font-bold text-center ">
                {/* ref is now correctly assigned here */}
                <p ref={textRef} >
                    {/* Ensure techDescription is a string before splitting */}
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
