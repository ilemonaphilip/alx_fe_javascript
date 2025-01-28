// Initialize quotes array with some sample data
let quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", category: "Inspiration" },
    { text: "It does not matter how slowly you go as long as you do not stop.", category: "Motivation" },
    { text: "Don't cry because it's over, smile because it happened.", category: "Life" },
];

// Function to fetch quotes from the mock API (simulated server interaction)
function fetchQuotesFromServer() {
    // Simulate a server response with JSONPlaceholder (mock data)
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(serverData => {
            // Simulating that each server post is a quote (replace with actual quote data from your API)
            const serverQuotes = serverData.map(post => ({
                text: post.title,
                category: "General" // Mock category
            }));

            // Handle syncing and conflict resolution
            syncQuotesWithServer(serverQuotes);
        })
        .catch(error => {
            console.error('Error fetching quotes from server:', error);
        });
}

// Function to sync local quotes with server data
function syncQuotesWithServer(serverQuotes) {
    const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];

    // Compare local and server quotes
    const mergedQuotes = [...serverQuotes];

    // Merge the data (Server data takes precedence in case of conflict)
    serverQuotes.forEach(serverQuote => {
        const localIndex = localQuotes.findIndex(localQuote => localQuote.text === serverQuote.text);
        if (localIndex === -1) {
            // If the quote doesn't exist locally, add it
            localQuotes.push(serverQuote);
        } else {
            // If the quote exists locally, update it with server data (resolution strategy)
            localQuotes[localIndex] = serverQuote;
        }
    });

    // Save the merged quotes back to localStorage
    localStorage.setItem('quotes', JSON.stringify(localQuotes));

    // Optionally notify the user about the sync
    alert('Quotes synchronized with the server.');
    populateCategories();
    filterQuotes();
}

// Function to periodically fetch data from the server every 10 minutes (600000 ms)
setInterval(fetchQuotesFromServer, 600000); // Fetch every 10 minutes

// Function to populate categories in the dropdown
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const uniqueCategories = Array.from(new Set(quotes.map(quote => quote.category)));

    uniqueCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // Load last selected filter from local storage if available
    const savedCategory = localStorage.getItem('selectedCategory') || 'all';
    categoryFilter.value = savedCategory;
    filterQuotes();
}

// Function to filter quotes based on selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);
    
    // Save the selected category to local storage
    localStorage.setItem('selectedCategory', selectedCategory);
    
    displayQuotes(filteredQuotes);
}

// Function to display quotes on the page
function displayQuotes(filteredQuotes) {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = ''; // Clear existing content
    
    filteredQuotes.forEach(quote => {
        const quoteDiv = document.createElement('div');
        quoteDiv.textContent = `"${quote.text}" - ${quote.category}`;
        quoteDisplay.appendChild(quoteDiv);
    });
}

// Function to display a random quote from the filtered list
function showRandomQuote(filteredQuotes) {
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);  // Generate a random index
    const randomQuote = filteredQuotes[randomIndex];  // Get a random quote

    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `"${randomQuote.text}" - ${randomQuote.category}`;
}

// Function to add a new quote (also updates categories)
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
    
    // Add new quote to the quotes array
    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);
    
    // Save the updated quotes array to local storage
    saveQuotes();
    
    // Update categories in the dropdown
    populateCategories();
}

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    populateCategories();

    // Show a random quote when the "Show New Quote" button is clicked
    document.getElementById('newQuote').addEventListener('click', () => {
        const selectedCategory = document.getElementById('categoryFilter').value;
        const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);
        showRandomQuote(filteredQuotes);
    });

    filterQuotes();

    // Fetch quotes from the server when the page loads
    fetchQuotesFromServer();
});
