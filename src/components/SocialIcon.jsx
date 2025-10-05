import React, { useRef } from "react";

const SocialIcon = ({ socialImg }) => {
    const iconRef = useRef(null);

    const handleMouseMove = (e) => {
        const currentCardElement = iconRef.current;
        if (!currentCardElement) return;

        const rect = currentCardElement.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;

        let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);

        angle = (angle + 360) % 360;

        currentCardElement.style.setProperty("--start", angle + 60);
    };

    return (
        <div
            ref={iconRef}
            onMouseMove={handleMouseMove}
            className="icon card"
        >
            <img src={socialImg.imgPath} alt={socialImg.name} />
            <div className="glow"></div>
        </div>
    );
};

export default SocialIcon;
