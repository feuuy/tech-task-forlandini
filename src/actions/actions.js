"use server";

// In-memory storage for synonyms
const synonyms = {};

function addSynonymsRecursively(word, synonym) {
  if (!synonyms[word]) {
    synonyms[word] = new Set();
  }

  // Add the synonym to the word's synonym set if it's not already there
  if (!synonyms[word].has(synonym)) {
    synonyms[word].add(synonym);

    // Make sure the synonym has the word as well
    if (!synonyms[synonym]) {
      synonyms[synonym] = new Set();
    }
    synonyms[synonym].add(word);

    // Recursively add all the synonyms of the synonym to the word and vice versa
    synonyms[synonym].forEach((indirectSynonym) => {
      addSynonymsRecursively(word, indirectSynonym);
    });

    // Recursively add all the synonyms of the word to the synonym
    synonyms[word].forEach((indirectSynonym) => {
      addSynonymsRecursively(synonym, indirectSynonym);
    });
  }
}

function addSynonyms(words) {
  words.forEach((word) => {
    if (!synonyms[word]) {
      synonyms[word] = new Set();
    }

    words.forEach((synonym) => {
      if (word !== synonym) {
        addSynonymsRecursively(word, synonym);
      }
    });
  });
}

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

  // Add words and their synonyms transitively
  addSynonyms(words);

  return synonyms;
}
