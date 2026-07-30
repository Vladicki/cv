import React from 'react';

const StackBadge = ({ stackItem }) => {
    return (
        <span
            className="py-1 px-3 rounded-full w-fit text-sm md:text-base text-nowrap"
            style={{
                backgroundColor: stackItem.tailwindColor ?? undefined,
                color: stackItem.textColor ?? undefined,
            }}
        >
            {stackItem.tech}
        </span>
    );
};

export default StackBadge;

