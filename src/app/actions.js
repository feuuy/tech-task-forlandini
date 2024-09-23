"use server";

const synonyms = {};

export async function searchWords(formData) {
  console.log(formData.get("word"));
}

export async function addWords(formData) {
  console.log(formData.get("words"));
}
