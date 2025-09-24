import React, { useRef, useState, useEffect } from "react";
import {
  LuMapPinHouse,
  LuMail,
  LuPhone,
  LuRss,
  LuGithub,
  LuUser,
} from "react-icons/lu";
import { RiLinkedinLine } from "react-icons/ri";
import ContactInfo from "../ResumeSections/ContactInfo";
import EducationInfo from "../ResumeSections/EducationInfo";
import LanguageSection from "../ResumeSections/LanguageSection";
import WorkExperience from "../ResumeSections/WorkExperience";
import ProjectInfo from "../ResumeSections/ProjectInfo";
import SkillSection from "../ResumeSections/SkillSection";
import CertificationInfo from "../ResumeSections/CertificationInfo";

const DEFAULT_THEME = ["#EBFDFF", "#A1F4FD", "#CEFAFE", "#00B8DB", "#4A5565"];

// ✅ Utility function for formatting YYYY-MM to "Mon YYYY"
const formatYearMonth = (dateString) => {
  if (!dateString) return "";
  const [year, month] = dateString.split("-");
  const date = new Date(year, month - 1); // JS months are 0-based
  return date.toLocaleString("en-US", { month: "short", year: "numeric" });
};

const Title = ({ text, color }) => {
  return (
    <div className="relative w-fit mb-2.5">
      <span
        className="absolute bottom-0 left-0 w-full h-2"
        style={{ backgroundColor: color }}
      ></span>
      <h2 className={`relative text-sm font-bold`}>{text}</h2>
    </div>
  );
};



const TemplateOne = ({ resumeData, colorPalette, containerWidth }) => {
  const themeColors = colorPalette?.length > 0 ? colorPalette : DEFAULT_THEME;

  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(800);
  const [scale, setScale] = useState(1);
  const profileImageSrc =
    resumeData?.profileInfo?.profilePreviewUrl ||
    resumeData?.profileInfo?.profileImg ||
    null;

  useEffect(() => {
    const actualBaseWidth = resumeRef.current.offsetWidth;
    setBaseWidth(actualBaseWidth);
    setScale(containerWidth / baseWidth);
  }, [containerWidth]);

  return (
    <div
      ref={resumeRef}
      className="p-3 bg-white"
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : "none",
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : "auto",
        height: "auto",
      }}
    >
      <div className="grid grid-cols-12 gap-8">
        {/* Left Column */}
        <div
          className="col-span-4 py-10"
          style={{ backgroundColor: themeColors[0] }}
        >
          <div className="flex flex-col items-center px-2">
            {/* Profile Circle */}
            <div
              className="w-[100px] h-[100px] max-w-[110px] max-h-[110px] rounded-full flex items-center justify-center"
              style={{ backgroundColor: themeColors[3] }}
            >
              {profileImageSrc ? (
                <img
                  src={profileImageSrc}
                  alt="Profile"
                  className="w-[90px] h-[90px] rounded-full object-cover"
                />
              ) : (
                <div
                  className="w-[90px] h-[90px] flex items-center justify-center text-5xl rounded-full"
                  style={{
                    backgroundColor: themeColors[1],
                    color: themeColors[4],
                  }}
                >
                  <LuUser />
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center">
              <h1 className="text-lg font-bold text-gray-800">
                {resumeData?.profileInfo?.fullName || "Your Name"}
              </h1>
              <p className="text-sm font-medium text-gray-600">
                {resumeData?.profileInfo?.designation || "Your Designation"}
              </p>
            </div>

          <div className="my-6 mx-6">
            {/* Contact Info */}
            <div className="flex flex-col gap-4">
              <ContactInfo
                icon={<LuMapPinHouse />}
                iconBG={themeColors[2]}
                value={resumeData?.contactInfo?.location}
              />

              <ContactInfo
                icon={<LuMail />}
                iconBG={themeColors[2]}
                value={resumeData?.contactInfo?.email}
              />

              <ContactInfo
                icon={<LuPhone />}
                iconBG={themeColors[2]}
                value={resumeData?.contactInfo?.phone}
              />

              {resumeData?.contactInfo?.linkedin && (
                <ContactInfo
                  icon={<RiLinkedinLine />}
                  iconBG={themeColors[2]}
                  value={resumeData?.contactInfo?.linkedin}
                />
              )}

              {resumeData?.contactInfo?.github && (
                <ContactInfo
                  icon={<LuGithub />}
                  iconBG={themeColors[2]}
                  value={resumeData?.contactInfo?.github}
                />
              )}

              <ContactInfo
                icon={<LuRss />}
                iconBG={themeColors[2]}
                value={resumeData?.contactInfo?.website}
              />
            </div>

            {/* Education */}
            <div className="mt-8">
              <Title text="Education" color={themeColors[1]} />
              {resumeData?.education?.map((data, index) => (
                <EducationInfo
                  key={`education_${index}`}
                  degree={data.degree}
                  institution={data.institution}
                  duration={`${formatYearMonth(data.startDate)} - ${data.endDate ? formatYearMonth(data.endDate) : "Present"
                    }`}
                />
              ))}
            </div>

            <div className="mt-5">
              <Title text="Languages" color={themeColors[1]} />
              <LanguageSection
                languages={resumeData?.languages || []}
                accentColor={themeColors[3]}
                bgColor={themeColors[2]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="col-span-8 pt-10 mr-10 pb-5">
        <div>
          <Title text="Professional Summary" color={themeColors[1]} />
          <p className="text-sm font-medium">
            {resumeData?.profileInfo?.summary}
          </p>
        </div>

        <div className="mt-4">
          <Title text="Work Experience" color={themeColors[1]} />
          {resumeData?.workExperience?.map((data, index) => (
            <WorkExperience
              key={`work_${index}`}
              company={data.company}
              role={data.role}
              duration={`${formatYearMonth(data.endDate)}`}
              durationColor={themeColors[4]}
              description={data.description}
            />
          ))}
        </div>

        <div className="mt-4">
          <Title text="Projects" color={themeColors[1]} />

          {resumeData?.projects?.map((project, index) => (
            <ProjectInfo
              key={`project_${index}`}
              title={project.title}
              description={project.description}
              // githubLink={project.github}
              // liveDemoUrl={project.liveDemo}
              githubLink={project.link}
              liveDemoUrl={project.link}
              bgColor={themeColors[2]}
            />
          ))}
        </div>

        <div className="mt-4">
          <Title text="Skills" color={themeColors[1]} />

          <SkillSection
            skills={resumeData?.skills || []}
            accentColor={themeColors[3]}
            bgColor={themeColors[2]}
          />
        </div>

        <div className="mt-4">
          <Title text="certifications" color={themeColors[1]} />

          <div className="">
            {resumeData?.certifications.map((data, index) => (
              <CertificationInfo
                key={`cert_${index}`}
                title={data.title}
                issuer={data.issuer}
                year={data.year}
                bgColor={themeColors[2]}
              />
            ))}
          </div>
        </div>

        {resumeData.interests.length > 0 && resumeData.interests[0] != "" && (
          <div className="mt-4">
            <Title text="Interests" color={themeColors[1]} />

            <div className="flex items-center flex-wrap gap-3 mt-4">
              {resumeData?.interests?.map((interest, index) => {
                if (!interest) return null;
                return (
                  <div
                    key={`interst_${index}`}
                    className="text-[10px] font-medium py-1 px-3 rounded-lg"
                    style={{ backgroundColor: themeColors[2] }}
                  >
                    {interest}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
    </div >
  );
};

export default TemplateOne;
