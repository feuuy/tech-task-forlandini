"use server";

// In-memory storage for synonyms (consider replacing this with persistent storage)
const synonyms = {};

// Search for synonyms of a word
export async function searchWords(formData) {
  const word = formData.get("search-word")?.toLowerCase().trim(); // Normalize input
  if (!word) {
    return "Invalid input.";
  }

  if (synonyms[word]) {
    return synonyms[word];
  } else {
    return `${word} has no synonyms.`;
  }
}

// Add a word and its synonyms to the dictionary
export async function addWords(formData) {
  const words = formData
    .get("words")
    .split(",")
    .map((word) => word.trim().toLowerCase()); // Normalize inputs

  if (words.length === 0 || !words[0]) {
    return "No valid words provided.";
  }

  words.forEach((word) => {
    if (!synonyms[word]) {
      synonyms[word] = new Set();
    }

    words.forEach((synonym) => {
      if (word !== synonym && synonym) {
        synonyms[word].add(synonym);
      }
    });
  });

  return synonyms;
}
