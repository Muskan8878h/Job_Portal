import TemplateOne from './TemplateOne.jsx';

const RenderResume = ({
    templateId,
    resumeData,
    colorPalette,
    containerWidth,
}) => {

    const profileImageSrc =
        resumeData?.profileInfo?.profilePreviewUrl ||
        resumeData?.profileInfo?.profileImg ||
        "/default-profile.png";
    return (
        <TemplateOne
            resumeData={{ ...resumeData, profileImageSrc }}
            colorPalette={colorPalette}
            containerWidth={containerWidth}
        />
    );
};

export default RenderResume;
