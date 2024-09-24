import React from "react";

const PlusSignIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={30}
    height={30}
    fill={"none"}
    {...props}
  >
    <path
      d="M12 4V20M20 12H4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default PlusSignIcon;
