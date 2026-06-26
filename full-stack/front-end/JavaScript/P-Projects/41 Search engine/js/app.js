// Replace with your actual Google Custom Search API key and Search Engine ID
const apiKey = 'AIzaSyCjLsuuBXtqIsMXY-uJ5DzfE__2Vw5vzog';
const searchEngineId = '17d88529d3257441c';

// Function to perform the search
function search() {
    const query = document.getElementById('search-box').value;
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (query.trim() === '') {
        resultsContainer.innerHTML = '<p>Please enter a search query.</p>';
        return;
    }

    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${query}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayResults(data.items);
        })
        .catch(error => {
            console.error('Error fetching the search results:', error);
            resultsContainer.innerHTML = '<p>Error fetching results. Please try again.</p>';
        });
}

// Function to display the search results
function displayResults(items) {
    const resultsContainer = document.getElementById('results-container');

    if (!items || items.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    items.forEach(item => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';

        const title = document.createElement('a');
        title.href = item.link;
        title.textContent = item.title;
        title.target = '_blank';

        const snippet = document.createElement('p');
        snippet.textContent = item.snippet;

        resultItem.appendChild(title);
        resultItem.appendChild(snippet);

        resultsContainer.appendChild(resultItem);
    });
}
