import React, { useRef } from "react";

const GlowCard = ({ card, index, children }) => {
    // This ref will now directly point to the <a> tag
    const singleCardRef = useRef(null);

    // when mouse moves over a card, rotate the glow effect
    const handleMouseMove = (e) => {
        // Get the current card's DOM element directly from its ref
        const currentCardElement = singleCardRef.current;
        if (!currentCardElement) return;

        // get the mouse position relative to the card
        const rect = currentCardElement.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;

        // calculate the angle from the center of the card to the mouse
        let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);

        // adjust the angle so that it's between 0 and 360
        angle = (angle + 360) % 360;

        // set the angle as a CSS variable on the <a> element
        currentCardElement.style.setProperty("--start", angle + 60);
    };

    // return the card component with the mouse move event
    return (
        <a
            href={card.link} // The link for the card
            target="_blank" // Opens in a new tab
            rel="noopener noreferrer" // Security best practice for target="_blank"
            ref={singleCardRef} // Attach the ref directly to the <a> tag
            onMouseMove={handleMouseMove} // Attach mouse move to the <a> tag
            // Apply all the styling classes to the <a> tag
            className="card card-border timeline-card rounded-xl p-10 mb-5 break-inside-avoid-column block relative"
        >
            <div className="glow"></div> {/* Glow effect */}

            {/* Content of the card */}
            <div className="flex items-center gap-1 mb-5">
                <p className="font-bold text-lg">{card.title}</p> {/* Added text-lg for better default */}
            </div>
            <div className="mb-5">
                <p className="text-white-50 text-lg">{card.desc}</p>
            </div>
            {children} {/* Renders the stack badges */}
        </a>
    );
};

export default GlowCard;
