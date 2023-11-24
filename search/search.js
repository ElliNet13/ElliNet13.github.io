let jsonData; // Define the jsonData variable in the outer scope

// Function to perform a search
function performSearch(query, jsonData) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';

    for (const key in jsonData) {
        const item = jsonData[key];
        const name = item.name.toLowerCase();
        if (name.includes(query.toLowerCase())) {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.textContent = item.name;
            link.href = item.Link;
            listItem.appendChild(link);
            searchResults.appendChild(listItem);
        }
    }
}

// Event listener for input
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', function () {
    performSearch(this.value, jsonData); // Pass the JSON data
});
// Fetch JSON data from an external file
fetch('stuff.json')
    .then(response => response.json())
    .then(data => {
        // Store the fetched JSON data in the jsonData variable
        jsonData = data; // Assign the data to the outer jsonData variable
        // Initial search with an empty query
        performSearch('', jsonData);
    })
    .catch(error => console.error('Error fetching data:', error));