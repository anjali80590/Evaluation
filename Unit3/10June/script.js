let container = document.getElementById("characterContainer");
let searchInput = document.getElementById("search");
let statusSelect = document.getElementById("status");
let speciesSelect = document.getElementById("species");
let prevBtn = document.getElementById("prev");
let nextBtn = document.getElementById("next");
let modal = document.getElementById("modal");
let modalDetails = document.getElementById("modalDetails");
let closeModal = document.getElementById("close");

let apiUrl = "https://rickandmortyapi.com/api/character";
let currentPage = 1;
let query = "";
let statusFilter = "";
let speciesFilter = "";

// getting the characters
function getCharacters() {
  let url = `${apiUrl}?page=${currentPage}`;
  if (query) url += `&name=${query}`;
  if (statusFilter) url += `&status=${statusFilter}`;
  if (speciesFilter) url += `&species=${speciesFilter}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      renderCards(data.results);
      prevBtn.disabled = !data.info.prev;
      nextBtn.disabled = !data.info.next;
    })
    .catch(() => {
      container.innerHTML = `<p>No Result found </p>`;
    });
}

// render Cards
function renderCards(characters) {
  container.innerHTML = "";
  characters.forEach((char) => {
    let card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <img src=${char.image}>
        <h3>${char.name}</h3>
        <p>${char.species}</p>
        <p>${char.status}</p>
        <span class="status-badge" style="background-Color:${getStatusColor(
          char.status
        )}">${char.status}</span>
         <p>${char.location.name}</p>
        `;
    card.addEventListener("click", () => showModal(char));
    container.appendChild(card);
  });
  function getStatusColor(status) {
    if (status === "Alive") return "green";
    if (status == "Dead") return "red";
    return "grey";
  }
}
// showingModal
function showModal(char) {
  modal.classList.remove("hidden");
  modalDetails.innerHTML = `
     <h2>${char.name}</h2>
     <p> Status : ${char.status}</p>
     <p> Species :${char.species}</p>
        <p>Origin ${char.origin.name}</p>
        <p>Location ${char.location.name}</p>
        <p>Episode Count : ${char.episode.length} ${char.episode.length>30? "<span> &#x1F31F; </span>":" "}</p>
        
    `;
}
closeModal.onclick = () => {
  modal.classList.add("hidden");
};

prevBtn.onclick = () => {
  currentPage--;
  getCharacters();
};
nextBtn.onclick = () => {
  currentPage++;
  getCharacters();
};

//using debouncing in the search
let timer;
searchInput.addEventListener("input", () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    query = searchInput.value.toLowerCase();
    currentPage = 1;
    getCharacters();
  }, 500);
});

statusSelect.addEventListener("change", () => {
  statusFilter = statusSelect.value;
  currentPage = 1;
  getCharacters();
});
speciesSelect.addEventListener("change", () => {
  speciesFilter = speciesSelect.value;
  currentPage = 1;
  getCharacters();
});
getCharacters();
