"use client"; // Enables client-side rendering

// Importing necessary hooks and components
import { useTheme } from "next-themes";
import React from "react";
import Moon02Icon from "@/public/moon";
import Sun01Icon from "@/public/sun";
import Button from "./Button";
import HelpCircleIcon from "@/public/help";

// Navbar component that controls theme toggle and displays help modal
export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme(); // Hook to get and set the current theme
  const [isMounted, setIsMounted] = React.useState(false); // Ensures the theme is loaded before rendering
  const [isOpen, setIsOpen] = React.useState(false); // Controls the visibility of the help modal

  // Ensures the component is mounted before accessing theme
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Toggles the help modal
  const toggleHelp = () => {
    setIsOpen(!isOpen);
  };

  // Toggles between light and dark themes
  const toggleTheme = () => {
    if (resolvedTheme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  // Prevents rendering until the component is mounted (for server-side rendering compatibility)
  if (!isMounted) {
    return null;
  }

  return (
    <div className="px-10 py-5 md:px-20 md:py-10 flex justify-between">
      <div>
        {/* Button to open Help modal */}
        <Button title="Help" icon={<HelpCircleIcon />} onClick={toggleHelp} />

        {/* Help modal content */}
        <div
          className={`z-10 absolute gap-5 flex flex-col inset-x-10 md:inset-x-20 backdrop-blur-xl border-2 px-10 py-5 md:px-20 md:py-10 border-black/10 dark:border-white/10 rounded-lg transition-all ease-in-out duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          style={{ visibility: isOpen ? "visible" : "hidden" }}
        >
          {/* Help modal information */}
          <div>
            <h3 className="text-xl">Searching</h3>
            <p>
              To search for words and their synonyms, enter a word and click{" "}
              <i>Search</i> or press <i>Enter</i>.
            </p>
          </div>
          <div>
            <h3 className="text-xl">Adding</h3>
            <p>
              Click <i>Add</i> to open a window for adding words and synonyms.
              Once done, click <i>Done</i>.
            </p>
          </div>
          <p className="italic text-gray-400">
            To close this window, click anywhere on the screen.
          </p>
        </div>

        {/* Overlay that closes the help modal when clicked */}
        <div
          className="w-full h-full z-20 absolute inset-0"
          style={{ visibility: isOpen ? "visible" : "hidden" }}
          onClick={toggleHelp}
        />
      </div>

      {/* Theme toggle button: changes depending on the current theme */}
      {resolvedTheme === "light" ? (
        <Button
          onClick={toggleTheme}
          title="Light"
          icon={<Sun01Icon />}
          rotate
        />
      ) : (
        <Button
          onClick={toggleTheme}
          title="Dark"
          icon={<Moon02Icon />}
          rotate
        />
      )}
    </div>
  );
}
