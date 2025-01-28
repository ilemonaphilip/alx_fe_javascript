// Step 1: Initialize the quotes array with some default quotes
const quotes = [
    { text: "The journey of a thousand miles begins with one step.", category: "Inspiration" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Motivation" }
];

// Select DOM elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const addQuoteForm = document.getElementById('addQuoteForm');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');

// Step 2: Function to display a random quote
function showRandomQuote() {
    if (quotes.length === 0) {
        quoteDisplay.textContent = "No quotes available!";
        return;
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Update textContent instead of innerHTML
    quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
}

// Step 3: Function to add a new quote
function addQuote(event) {
    event.preventDefault(); // Prevent form submission

    const quoteText = newQuoteText.value.trim();
    const quoteCategory = newQuoteCategory.value.trim();

    // Validate input fields
    if (!quoteText || !quoteCategory) {
        alert("Both fields are required!");
        return;
    }

    // Add the new quote to the array
    quotes.push({ text: quoteText, category: quoteCategory });

    // Clear input fields
    newQuoteText.value = '';
    newQuoteCategory.value = '';

    alert("Quote added successfully!");
}

// Step 4: Attach event listeners
newQuoteButton.addEventListener('click', showRandomQuote);
addQuoteForm.addEventListener('submit', addQuote);
