// Get references to HTML elements
const searchInput = document.getElementById("searchInput");
const dropdownList = document.getElementById("dropdownList");
const coinNameElement = document.getElementById("coinName");
const coinLogoElement = document.getElementById("coinLogo");

// Declare a variable for timeout ID
let timeoutId;

// Listen for input changes in the search input field
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase().trim();

  // Clear any existing timeouts
  clearTimeout(timeoutId);

  // If search input is empty, close the dropdown and return
  if (searchTerm === "") {
    closeDropdown();
    return;
  }

  // Set a timeout to fetch coin data after a brief delay
  timeoutId = setTimeout(() => {
    getCoinData(searchTerm);
  }, 300);
});

// Listen for clicks on the document to close the dropdown when clicking outside
document.addEventListener("click", (event) => {
  if (!searchInput.contains(event.target)) {
    closeDropdown();
  }
});

// Fetch coin data from the API
async function getCoinData(coin) {
  const url = `https://api.coingecko.com/api/v3/search?query=${coin}`;
  const response = await fetch(url);
  const data = await response.json();

  const coins = data.coins.slice(0, 10);

  // Render the dropdown with fetched coin data
  renderDropdown(coins);
}

// Render the dropdown list with coin data
function renderDropdown(coins) {
  dropdownList.innerHTML = "";

  coins.forEach((coin) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${coin.thumb}" alt="${coin.name} Logo">
      <span>${coin.name}</span>
    `;

    // Handle click on a dropdown item
    li.addEventListener("click", () => {
      searchInput.value = coin.name;
      coinNameElement.textContent = "Coin Name: " + coin.name;
      coinLogoElement.innerHTML =
        "Coin Logo: " + `<img src="${coin.thumb}" alt="${coin.name} Logo">`;
      closeDropdown();
    });

    dropdownList.appendChild(li);
  });

  // Display "No results found" if there are no matching coins
  if (coins.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No results found";
    dropdownList.appendChild(li);
  }
}

// Close the dropdown by clearing its content
function closeDropdown() {
  dropdownList.innerHTML = "";
}
