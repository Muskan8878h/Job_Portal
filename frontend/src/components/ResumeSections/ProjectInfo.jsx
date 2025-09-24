import { LuGithub, LuExternalLink } from "react-icons/lu";
import ActionLink from "./ActionLink";

const ProjectInfo = ({ title, description, githubLink, liveDemoUrl }) => {
  return (
    <div className="">
      <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-700">{description}</p>
      <div className="flex gap-3 mt-1">
        <ActionLink link={githubLink} icon={<LuGithub />} />
        <ActionLink link={liveDemoUrl} icon={<LuExternalLink />} />
      </div>
    </div>
  );
};

export default ProjectInfo;
