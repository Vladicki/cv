import { experiences, tech } from "../constants";
import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";

const Cards = () => {
    return (
        <section id="Experience" className="flex-center section-padding">
            <div className="w-full h-full md:px-10 px-5">
                <TitleHeader
                    title="My previus Experience"
                    sub="⭐️ Previous projects"
                />

                <div className="lg:columns-3 md:columns-2 columns-1 mt-16">
                    {experiences.map((experience, index) => (
                        <GlowCard card={experience} key={index} index={index}>
                            <div className="flex items-center gap-3">
                                <p className="text-white-50 flex flex-wrap items-center">
                                    {experience.stack.map((stack, stackIndex) => {
                                        // Ensure stack is a string and trim it, then convert to lowercase for robust comparison
                                        const cleanStackName = (typeof stack === 'string' ? stack : stack.text || '').trim().toLowerCase();

                                        // Find the corresponding tech item
                                        const matchedTech = tech.find(
                                            techItem => techItem.text.toLowerCase() === cleanStackName
                                        );

                                        // Determine the background color class
                                        const bgColorClass = matchedTech
                                            ? `bg-[${matchedTech.color}]`
                                            : 'bg-black-200';

                                        return (
                                            <span
                                                key={stackIndex}
                                                className={`${bgColorClass} py-1 px-4 rounded-full w-fit text-sm md:text-base text-nowrap mr-4 last:mr-0`}
                                            >
                                                {/* Display the original stack value, or the clean one if it was an object */}
                                                {typeof stack === 'string' ? stack.trim() : stack.text || ''}
                                            </span>
                                        );
                                    })}
                                </p>
                            </div>
                        </GlowCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Cards;
