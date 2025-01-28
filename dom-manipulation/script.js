// Step 1: Initialize the quotes array with some default quotes
const quotes = [
    { text: "The journey of a thousand miles begins with one step.", category: "Inspiration" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Motivation" }
];

// Select DOM elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');

// Step 2: Create and append the form dynamically using a function
function createAddQuoteForm() {
    const addQuoteForm = document.createElement('form');
    addQuoteForm.setAttribute('id', 'addQuoteForm');

    const newQuoteText = document.createElement('input');
    newQuoteText.setAttribute('id', 'newQuoteText');
    newQuoteText.setAttribute('type', 'text');
    newQuoteText.setAttribute('placeholder', 'Enter a new quote');
    newQuoteText.required = true;

    const newQuoteCategory = document.createElement('input');
    newQuoteCategory.setAttribute('id', 'newQuoteCategory');
    newQuoteCategory.setAttribute('type', 'text');
    newQuoteCategory.setAttribute('placeholder', 'Enter quote category');
    newQuoteCategory.required = true;

    const addQuoteButton = document.createElement('button');
    addQuoteButton.setAttribute('type', 'submit');
    addQuoteButton.textContent = 'Add Quote';

    // Append inputs and button to the form
    addQuoteForm.appendChild(newQuoteText);
    addQuoteForm.appendChild(newQuoteCategory);
    addQuoteForm.appendChild(addQuoteButton);

    // Append the form to the body
    document.body.appendChild(addQuoteForm);

    // Attach the event listener to the form
    addQuoteForm.addEventListener('submit', addQuote);
}

// Step 3: Function to display a random quote
function showRandomQuote() {
    if (quotes.length === 0) {
        quoteDisplay.innerHTML = "No quotes available!";
        return;
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Use innerHTML to update content dynamically
    quoteDisplay.innerHTML = `"${randomQuote.text}" - <strong>${randomQuote.category}</strong>`;
}

// Step 4: Function to add a new quote
function addQuote(event) {
    event.preventDefault(); // Prevent form submission

    const quoteText = document.getElementById('newQuoteText').value.trim();
    const quoteCategory = document.getElementById('newQuoteCategory').value.trim();

    // Validate input fields
    if (!quoteText || !quoteCategory) {
        alert("Both fields are required!");
        return;
    }

    // Add the new quote to the array
    quotes.push({ text: quoteText, category: quoteCategory });

    // Clear input fields
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';

    alert("Quote added successfully!");
}

// Step 5: Attach event listeners and initialize
newQuoteButton.addEventListener('click', showRandomQuote);
document.addEventListener('DOMContentLoaded', createAddQuoteForm);
