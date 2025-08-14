import { experiences } from "../constants";
import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";
import StackBadge from "../components/StackBadge"; // NEW: Import StackBadge

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
                                <p className="flex flex-wrap items-center">
                                    {experience.stack.map((stackItem, stackIndex) => (
                                        <span
                                            key={stackIndex}
                                            // Apply the margin classes here, as they depend on map index
                                            className="mr-4 last:mr-0"
                                        >
                                            {/* NEW: Render the StackBadge component */}
                                            <StackBadge stackItem={stackItem} />
                                        </span>
                                    ))}
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
