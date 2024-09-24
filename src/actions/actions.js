"use server";

const synonyms = {};

export async function searchWords(formData) {
  const word = formData.get("search-word");
  if (synonyms[word]) {
    return synonyms[word];
  } else {
    return `${word} has no synonyms.`;
  }
}

export async function addWords(formData) {
  const words = formData
    .get("words")
    .split(",")
    .map((word) => word.trim());

  words.forEach((word) => {
    if (!synonyms[word]) {
      synonyms[word] = new Set();
    }

    words.forEach((synonym) => {
      if (word !== synonym) {
        synonyms[word].add(synonym);
      }
    });
  });

  return synonyms;
}
