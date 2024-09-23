export default function Button({
  icon,
  title,
  onClick,
  bgColor,
  color,
  rotate,
  type,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`group flex gap-2 items-center py-2 px-3 rounded-lg text-lg text-primary ${bgColor} ${color} hover:opacity-75 transition-opacity ease-in-out duration-300`}
    >
      {icon && (
        <div
          className={`${
            rotate &&
            "group-hover:rotate-[360deg] transition-transform ease-in-out duration-300"
          }`}
        >
          {icon}
        </div>
      )}
      <div className="hidden md:flex">{title}</div>
    </button>
  );
}
