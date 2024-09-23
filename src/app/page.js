"use client";

import React from "react";

import Button from "@/components/Button";
import Search01Icon from "@/public/search-icon";
import PlusSignIcon from "@/public/plus";
import Cancel01Icon from "@/public/cancel";
import Tick02Icon from "@/public/check";
import { addWords, searchWords } from "./actions";

export default function Home() {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleModal = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <div className="items-center flex flex-col justify-center text-center gap-10 px-10 py-5 md:px-20 md:py-10">
      <div className="flex flex-col">
        <h1 className="text-6xl">Search</h1>
        <h4 className="text-xl">
          Instantly add & search for words and their synonyms.
        </h4>
      </div>
      <form
        action={searchWords}
        className="flex bg-stone-100 dark:bg-stone-900 py-2 px-3 items-center rounded-lg w-full md:w-1/2"
      >
        <div className="text-stone-400 dark:text-stone-600 scale-50">
          <Search01Icon />
        </div>
        <input
          type="text"
          id="word"
          name="word"
          required
          className="h-10 bg-transparent outline-none w-full placeholder:text-stone-400 dark:placeholder:text-stone-600"
          placeholder="Search for a word"
        />
        <div className="flex gap-2">
          <Button
            icon={<PlusSignIcon />}
            title="Add"
            bgColor="bg-white dark:bg-black"
            color="text-black dark:text-white"
            showTitleOnHover
            onClick={toggleModal}
            type="button"
          />
          <Button
            icon={<Search01Icon />}
            bgColor="bg-black dark:bg-white"
            color="text-white dark:text-black"
            title="Search"
            type="submit"
          />
        </div>
      </form>
      <div
        className={`backdrop-blur-xl border-black/10 dark:border-white/10 rounded-lg border-2 px-10 py-5 md:px-20 md:py-10 inset-0 md:inset-x-20 md:inset-y-10 absolute transition-all ease-in-out duration-300 ${
          isOpen ? "scale-100" : "scale-0"
        }`}
        style={{ visibility: isOpen ? "visible" : "hidden" }}
      >
        <div className="flex justify-end">
          <Button
            icon={<Cancel01Icon />}
            title="Cancel"
            onClick={toggleModal}
          />
        </div>
        <div className="flex flex-col gap-10 items-center">
          <h1 className="text-6xl">Add</h1>
          <form
            action={addWords}
            className="flex bg-stone-100 dark:bg-stone-900 py-2 px-3 items-center rounded-lg w-full md:w-1/2"
          >
            <input
              type="text"
              id="word"
              name="words"
              required
              className="h-10 bg-transparent outline-none w-full placeholder:text-stone-400 dark:placeholder:text-stone-600"
              placeholder="Enter a word/synonym"
            />
            <Button
              icon={<PlusSignIcon />}
              title="Add"
              bgColor="bg-black dark:bg-white"
              color="text-white dark:text-black"
              showTitleOnHover
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
