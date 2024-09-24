"use server";

// In-memory storage for synonyms (consider replacing this with persistent storage)
const synonyms = {};

// Helper function to propagate synonyms transitively
function addSynonyms(words) {
  words.forEach((word) => {
    if (!synonyms[word]) {
      synonyms[word] = new Set();
    }

    // Add each word as a synonym for all the others
    words.forEach((synonym) => {
      if (word !== synonym && synonym) {
        synonyms[word].add(synonym);
        // Add the current word to the synonym's set as well
        if (!synonyms[synonym]) {
          synonyms[synonym] = new Set();
        }
        synonyms[synonym].add(word);

        // Now propagate synonyms from synonym's set to the current word's set
        synonyms[synonym].forEach((indirectSynonym) => {
          if (indirectSynonym !== word) {
            synonyms[word].add(indirectSynonym);
            synonyms[indirectSynonym].add(word);
          }
        });
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
