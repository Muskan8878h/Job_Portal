import { useNavigate } from "react-router-dom";
import resumeHero from "../../../assets/resume-formats-hero.avif";

const HeroSection = () => {
  const navigate = useNavigate();

  // Smooth scroll to "Find Jobs" section
  const handleScrollToJobs = () => {
    const jobsSection = document.getElementById("find-jobs-section");
    if (jobsSection) {
      jobsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative bg-gradient-to-r from-primary to-secondary text-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-10">
        
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-3xl lg:text-5xl font-extrabold leading-tight mb-6">
            Create Your Resume, <br className="hidden lg:block" /> 
            Get Noticed by Recruiters
          </h1>
          <p className="text-lg lg:text-xl text-blue-100 mb-8 max-w-xl">
            Build a professional resume in minutes. Increase your chances of 
            getting shortlisted and approved by top recruiters.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-white text-primary font-semibold px-6 lg:px-8 py-3 lg:py-4 rounded-xl shadow-lg transition-transform transform hover:scale-105"
            >
              Build My Resume
            </button>
            <button
              onClick={handleScrollToJobs}
              className="bg-white text-primary font-semibold px-6 lg:px-8 py-3 lg:py-4 rounded-xl shadow-lg transition-transform transform hover:scale-105"
            >
              Find Jobs
            </button>
          </div>
        </div>

        {/* Right Content (Image) */}
        <div className="flex-1 flex justify-center">
          <img
            src={resumeHero}
            alt="Sample Resume"
            className="w-full max-w-md rounded-2xl shadow-2xl border border-white/20"
          />
        </div>
      </div>

      {/* Decorative Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 pointer-events-none rounded-b-3xl"></div>
    </section>
  );
};

export default HeroSection;
