export default function Button({
  icon, // Optional icon component
  title, // Text for the button
  onClick, // Function triggered on click
  bgColor, // Background color class
  color, // Text color class
  rotate, // Flag for rotating icon on hover
  type, // Button type (e.g., submit, button)
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
          {icon} {/* Renders the icon, if provided */}
        </div>
      )}
      <div className="hidden md:flex">{title}</div>{" "}
      {/* Renders the title, hidden on smaller screens */}
    </button>
  );
}
