# Synonym Search & Add Application

This is a simple Nextjs-based web application that allows users to search for words and their synonyms, as well as add new synonyms for words.

## Features

- **Search for Synonyms**: Users can input a word and search for its synonyms.
- **Add Synonyms**: Users can add new synonyms for any word using a form modal.
- **Dynamic Synonym List**: The application supports adding multiple synonyms dynamically and managing them within the UI.

## Tech Stack

- **Next.js**: Framework for server-side & client-side rendering and routing.
- **Tailwind CSS**: For styling the components.
- **JavaScript**: Logic and interactions.
- **Server Actions**: To handle synonym search and addition.

## How It Works

### Searching for Synonyms

1. Enter a word in the search input.
2. Click the **Search** button.
3. If the word exists, the synonyms are displayed. If not, a message will appear saying the word has no synonyms.

### Adding New Synonyms

1. Click the **Add** button next to the search bar to open the modal.
2. In the modal, enter the main word and its synonyms.
3. Click **Done** to submit the form. The word and its synonyms will be saved.
4. A confirmation alert will notify you of successful submission.
