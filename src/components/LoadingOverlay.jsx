import React, { useRef, useEffect } from 'react';
import gsap from 'gsap'; // Make sure gsap is imported

const LoadingOverlay = ({ progress, finishedLoading }) => {
    const overlayRef = useRef(null);
    const progressTextRef = useRef(null);
    const loadingMessageRef = useRef(null); // Ref for the dynamic loading message

    useEffect(() => {
        // Update progress text
        if (progressTextRef.current) {
            progressTextRef.current.textContent = `${Math.round(progress)}%`;
        }

        // Update loading message based on progress
        if (loadingMessageRef.current) {
            if (progress <= 30) {
                loadingMessageRef.current.innerHTML = 'pretending to load';
            } else if (progress <= 60) {
                loadingMessageRef.current.innerHTML = 'DAMN its <strong>HEAVY</strong>';
            } else if (progress <= 90) {
                loadingMessageRef.current.innerHTML = "that's some really <strong>SLOW</strong> internet";
            } else if (progress < 100) {
                loadingMessageRef.current.innerHTML = 'almost there';
            } else {
                loadingMessageRef.current.innerHTML = ''; // Clear message when 100%
            }
        }

        // GSAP animation for fading out the overlay when loading is finished
        if (finishedLoading && overlayRef.current) {
            gsap.to(overlayRef.current, {
                opacity: 0,
                duration: 1.0, // Duration of the fade-out animation
                ease: 'power2.out',
                onComplete: () => {
                    // Hide the overlay completely after animation
                    if (overlayRef.current) {
                        overlayRef.current.style.display = 'none';
                    }
                },
            });
        }
    }, [progress, finishedLoading]); // Re-run effect when progress or finishedLoading changes

    return (
        <div
            ref={overlayRef}
            className="loading-overlay" // Apply the main component class
        >
            <p 
                ref={progressTextRef} 
                className="loading-percentage" // Apply the percentage text class
            >
                {Math.round(progress)}%
            </p>
            
            {/* Loading bar container */}
            <div 
                className="loading-bar-container" // Apply the bar container class
            >
                {/* Progress bar fill */}
                <div 
                    style={{ width: `${progress}%` }} // Dynamic width still uses inline style
                    className="loading-bar-fill" // Apply the bar fill class (includes custom transition)
                />
            </div>

            {/* Dynamic loading message */}
            <p 
                ref={loadingMessageRef} 
                className="loading-message" // Apply the message class
            >
                {/* Message content updated by useEffect */}
            </p>
        </div>
    );
};

export default LoadingOverlay;
