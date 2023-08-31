const searchInput = document.getElementById("searchInput");
const dropdownList = document.getElementById("dropdownList");
const items = [
  "Apple",
  "Banana",
  "Cherry",
  "Date",
  "Grape",
  "Lemon",
  "Mango",
  "Orange",
  "Pineapple",
];

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchTerm)
  );

  renderDropdown(filteredItems);
});

function renderDropdown(filteredItems) {
  dropdownList.innerHTML = "";

  if (filteredItems.length > 0) {
    filteredItems.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      li.addEventListener("click", () => {
        searchInput.value = item;
        dropdownList.innerHTML = "";
      });
      dropdownList.appendChild(li);
    });
  } else {
    const li = document.createElement("li");
    li.textContent = "No results found";
    dropdownList.appendChild(li);
  }
}
