const searchInput = document.getElementById("searchInput");
const dropdownList = document.getElementById("dropdownList");
const coinNameElement = document.getElementById("coinName");
const coinLogoElement = document.getElementById("coinLogo");

let timeoutId;

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase().trim();

  clearTimeout(timeoutId);
  if (searchTerm === "") {
    closeDropdown();
    return;
  }

  timeoutId = setTimeout(() => {
    getCoindata(searchTerm);
  }, 300);
});

document.addEventListener("click", (event) => {
  if (!searchInput.contains(event.target)) {
    closeDropdown();
  }
});

async function getCoindata(coin) {
  const url = `https://api.coingecko.com/api/v3/search?query=${coin}`;
  const response = await fetch(url);
  const data = await response.json();

  const coins = data.coins.slice(0, 10);

  renderDropdown(coins);
}

function renderDropdown(coins) {
  dropdownList.innerHTML = "";

  coins.forEach((coin) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${coin.thumb}" alt="${coin.name} Logo">
      <span>${coin.name}</span>
    `;

    li.addEventListener("click", () => {
      searchInput.value = coin.name;
      coinNameElement.textContent = "Coin Name: " + coin.name;
      coinLogoElement.innerHTML =
        "Coin Logo: " + `<img src="${coin.thumb}" alt="${coin.name} Logo">`;
      closeDropdown();
    });

    dropdownList.appendChild(li);
  });

  if (coins.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No results found";
    dropdownList.appendChild(li);
  }
}

function closeDropdown() {
  dropdownList.innerHTML = "";
}
