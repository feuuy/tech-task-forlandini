"use client";

import { useTheme } from "next-themes";
import React from "react";

import Moon02Icon from "@/public/moon";
import Sun01Icon from "@/public/sun";
import Button from "./Button";
import HelpCircleIcon from "@/public/help";

export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleHelp = () => {
    setIsOpen(!isOpen);
  };

  const toggleTheme = () => {
    if (resolvedTheme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="px-10 py-5 md:px-20 md:py-10 flex justify-between">
      <div>
        <Button title="Help" icon={<HelpCircleIcon />} onClick={toggleHelp} />
        <div
          className={`z-10 absolute gap-5 flex flex-col inset-x-10 md:inset-x-20 backdrop-blur-xl border-2 px-10 py-5 md:px-20 md:py-10 border-black/10 dark:border-white/10 rounded-lg transition-all ease-in-out duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          style={{ visibility: isOpen ? "visible" : "hidden" }}
        >
          <div>
            <h3 className="text-xl">Searching</h3>
            <p>
              To search for words and their synonyms, simply enter a word into
              the search bar and click the &quot;Search&quot; button.
            </p>
          </div>
          <div>
            <h3 className="text-xl">Adding</h3>
            <p>
              To add new words and synonyms, click the &quot;Add&quot; button. A
              new window will appear where you can enter the word. Add more
              words/synonyms by clicking the &quot;Add&quot; button. You can add
              as many words/synonyms as needed. Once done, you’ll be able to
              search for these words.
            </p>
          </div>
          <p className="italic text-gray-400">
            To close this window, click anywhere on the screen.
          </p>
        </div>
        <div
          className="w-full h-full z-20 absolute inset-0"
          style={{ visibility: isOpen ? "visible" : "hidden" }}
          onClick={toggleHelp}
        />
      </div>
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
