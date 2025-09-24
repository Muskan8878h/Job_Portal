const ActionLink = ({ link, icon }) => {
  if (!link) return null;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1 text-sm text-cyan-600 hover:underline"
    >
      {icon}
      {link}
    </a>
  );
};

export default ActionLink;
