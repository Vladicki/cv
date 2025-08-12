import { experiences } from "../constants";
import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";

const Cards = () => {
    return (
        <section id="Experience" className="flex-center section-padding">
            <div className="w-full h-full md:px-10 px-5">
                <TitleHeader
                    title="My previus Experience"
                    sub="⭐️ Customer feedback highlights"
                />

                <div className="lg:columns-3 md:columns-2 columns-1 mt-16">
                    {experiences.map((experience, index) => (
                        <GlowCard card={experience} key={index} index={index}>
                            <div className="flex items-center gap-3">
                                <p className="font-bold flex flex-wrap items-center">
                                    {experience.mentions.map((mention, mentionIndex) => (
                                        <span key={mentionIndex} className="mr-4 last:mr-0">
                                            {/* Using mr-2 for right margin, last:mr-0 to remove for the last item */}
                                            {mention}
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
