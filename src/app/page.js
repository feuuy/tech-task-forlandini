"use client";

import React from "react";

import Button from "@/components/Button";
import Search01Icon from "@/public/search-icon";
import PlusSignIcon from "@/public/plus";
import Cancel01Icon from "@/public/cancel";
import Tick02Icon from "@/public/tick";
import Delete02Icon from "@/public/delete";
import { addWords, searchWords } from "../actions/actions";

export default function Home() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchResult, setSearchResult] = React.useState(null);
  const [notFound, setNotFound] = React.useState(null);
  const [inputs, setInputs] = React.useState([{ synonym: "" }]);

  const handleAddInput = () => {
    setInputs([...inputs, { synonym: "" }]);
  };

  const handleChange = (event, index) => {
    let { name, value } = event.target;
    let onChangeValue = [...inputs];
    onChangeValue[index][name] = value;
    setInputs(onChangeValue);
  };

  const handleDeleteInput = (index) => {
    const newArray = [...inputs];
    newArray.splice(index, 1);
    setInputs(newArray);
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = async (formData) => {
    const result = await searchWords(formData);
    if (result instanceof Set) {
      setSearchResult(result);
      setNotFound(null);
    } else {
      setNotFound(result);
      setSearchResult(null);
    }
  };

  const handleAddWords = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const mainWord = formData.get("main-word");
    console.log(inputs);
    const synonymList = inputs.map((input) => input.synonym).join(", ");
    formData.set("words", `${mainWord}, ${synonymList}`);
    console.log(formData.get("words"));
    await addWords(formData);
    alert("Words successfully added.");
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
        action={handleSearch}
        className="flex bg-stone-100 dark:bg-stone-900 py-2 px-3 items-center rounded-lg w-full md:w-1/2"
      >
        <div className="text-stone-400 dark:text-stone-600 scale-50">
          <Search01Icon />
        </div>
        <input
          type="text"
          id="search-word"
          name="search-word"
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
      {searchResult && !notFound && (
        <div className="flex flex-col gap-5">
          <h3 className="text-xl">Synonyms</h3>
          <div>
            {Array.from(searchResult).map((synonym) => (
              <p key={synonym}>{synonym}</p>
            ))}
          </div>
        </div>
      )}
      {notFound && !searchResult && <div>{notFound}</div>}
      <div
        className={`overflow-y-auto backdrop-blur-xl border-black/10 dark:border-white/10 rounded-lg border-2 px-10 py-5 md:px-20 md:py-10 inset-0 md:inset-x-20 md:inset-y-10 absolute transition-all ease-in-out duration-300 ${
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
            onSubmit={handleAddWords}
            className="flex flex-col gap-5 w-full md:w-1/2"
          >
            <input
              type="text"
              id="main-word"
              name="main-word"
              required
              className="h-16 outline-none w-full rounded-lg py-2 px-3 placeholder:text-stone-400 dark:placeholder:text-stone-600 bg-stone-100 dark:bg-stone-900"
              placeholder="Enter a word"
            />
            {inputs.map((item, index) => (
              <div
                key={index}
                className="flex bg-stone-100 dark:bg-stone-900 rounded-lg py-2 px-3 w-full items-center"
              >
                <input
                  type="text"
                  name="synonym"
                  id="synonym"
                  value={item.name}
                  onChange={(event) => handleChange(event, index)}
                  className={`${
                    index === 0 ? "h-12" : "h-10"
                  } outline-none bg-transparent placeholder:text-stone-400 dark:placeholder:text-stone-600 w-full`}
                  placeholder="Enter a synonym"
                  required
                />
                {index !== 0 && (
                  <Button
                    icon={<Delete02Icon />}
                    title="Remove"
                    bgColor="bg-red-500"
                    color="text-black"
                    type="button"
                    onClick={() => handleDeleteInput(index)}
                  />
                )}
              </div>
            ))}
            <div className="flex gap-2">
              <Button
                icon={<PlusSignIcon />}
                title="Add Synonym"
                bgColor="bg-black dark:bg-white"
                color="text-white dark:text-black"
                type="button"
                onClick={handleAddInput}
              />
              <Button
                icon={<Tick02Icon />}
                title="Done"
                bgColor="bg-green-500"
                color="text-black"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
