import React from "react";

const ShowcaseSection = () => {
    return (
        <div id="work" className="app-showcase">
            <div className="w-full">
                <div className="showcaselayout">
                    {/* LEFT */}
                    <div className="first-project-wrapper">
                        <div className="image-wrapper">
                            <img src="/showcase/crm.png" alt="crm" />
                        </div>
                        <div className="text-content">
                            <h2>Worked on Designed and implementation of CRM for AISEC russia</h2>
                            <p className="text-white md:text-xl">
                                An internal CRM system used to manage hundreds of volunteering applications
                            </p>
                        </div>
                    </div>
                    {/* RIGHT */}
                    <div className="project-list-wrapper overflow-hidden">
                        <div className="project">
                            <div className="image-wrapper bg-[#ffefdd]">
                                <img src="/showcase/jobscrapper.png" alt="crm" />
                            </div>
                            <h2>Personal Job Scrapper tool</h2>
                        </div>
                        <div className="project">
                            <div className="image-wrapper bg-[#ffe7eb]">
                                <img src="/showcase/jobscrapper.png" alt="scrapper" />
                            </div>
                            <h2>Personal Job Scrapper tool</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ShowcaseSection
