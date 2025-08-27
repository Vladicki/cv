import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * A reusable CTA button component.
 * It now uses GSAP for a smooth fade-in animation on mount.
 * When clicked, it scrolls smoothly to the section with a specified ID,
 * with a small offset from the top for better visual placement.
 */
const Button = ({ text, className, id, fadeIn = false }) => {
    // Create a ref to attach to the button element
    const buttonRef = useRef(null);

    useEffect(() => {
        // If the fadeIn prop is true, animate the button using GSAP
        if (fadeIn && buttonRef.current) {
            // Use gsap.fromTo to animate from opacity 0 to 1
            gsap.fromTo(
                buttonRef.current,
                { opacity: 0, y: 20 }, // Start state: slightly down and invisible
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" } // End state: full opacity and in place
            );
        }
    }, [fadeIn]); // Re-run the effect if the fadeIn prop changes

    return (
        <a
            ref={buttonRef} // Attach the ref to the anchor tag
            onClick={(e) => {
                e.preventDefault(); // Stop the link from jumping instantly

                // Find the section with the ID passed in the 'id' prop.
                const target = document.getElementById(id);

                // Only scroll if we found the section
                if (target) {
                    const offset = window.innerHeight * 0.15; // Leave a bit of space at the top
                    const top =
                        target.getBoundingClientRect().top + window.pageYOffset - offset;

                    // Scroll smoothly to that position
                    window.scrollTo({ top, behavior: "smooth" });
                }
            }}
            className={`${className ?? ""} cta-wrapper`}
        >
            <div className="cta-button group">
                <p className="text">{text}</p>
            </div>
        </a>
    );
};

export default Button;
