import React from 'react';

const StackBadge = ({ stackItem }) => {
    // Dynamic background color class
    const bgColorClass = stackItem.tailwindColor
        ? `bg-[${stackItem.tailwindColor}]` // Use arbitrary value syntax
        : 'bg-black-200'; // Fallback for background

    // Dynamic text color class
    const textColorClass = stackItem.textColor
        ? `text-[${stackItem.textColor}]`
        : 'text-white-50'; // Fallback for text color (e.g., your default text color)

    return (
        <span
            // className for styling common to all badges
            // The mr-4 last:mr-0 will be handled by the parent's map loop,
            // as it depends on the index in the loop.
            className={`${bgColorClass} ${textColorClass} py-1 px-3 rounded-full w-fit text-sm md:text-base text-nowrap 
`}
        // border border-white-100
        >
            {stackItem.tech}
        </span>
    );
};

export default StackBadge;

