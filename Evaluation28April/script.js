let homeSection = document.getElementById("home-section");
let addRecipeSection = document.getElementById("add-recipe-section");
let viewRecipeSection = document.getElementById("view-recipes-section");
let homeLink = document.getElementById("home-link");
let addRecipeLink = document.getElementById("add-recipe-link");
let viewRecipesLink = document.getElementById("view-recipe-link");
let recipeForm = document.getElementById("recipe-form");
let recipesContainer = document.getElementById("recipe-container");
let categoryFilter = document.getElementById("category-filter");
let themeToggle = document.getElementById("theme-toggle");
let stepsTextarea = document.getElementById("recipe-steps");
let formatButtons = document.querySelectorAll(".format-btn");

initTheme();
displayRecipes();
showSection(homeSection);

homeLink.addEventListener("click", () => {
  showSection(homeSection);
});

addRecipeLink.addEventListener("click", () => {
  showSection(addRecipeSection);
});

viewRecipesLink.addEventListener("click", () => {
  showSection(viewRecipeSection);
  displayRecipes();
});

recipeForm.addEventListener("submit", handleFormSubmit);

categoryFilter.addEventListener("change", displayRecipes);

themeToggle.addEventListener("click", toggleTheme);

function showSection(section) {
  document.querySelectorAll("main section").forEach((sec) => {
    sec.classList.remove("active");
  });
  section.classList.add("active");
}

function handleFormSubmit(e) {
  e.preventDefault();
  let recipeName = document.getElementById("recipe-name").value.trim();
  let recipeCategory = document.getElementById("recipe-category").value;
  let recipeIngredients = document
    .getElementById("recipe-ingredients")
    .value.trim();
  if (!recipeName || !recipeIngredients || !recipeCategory) {
    alert("Please fill in all fields!");
    return;
  }
  let newRecipe = {
    name: recipeName,
    category: recipeCategory,
    ingredients: recipeIngredients.split("\n"),
  };
  saveRecipe(newRecipe);
  recipeForm.reset();
  alert("Recipe Added Successfully!");
  showSection(viewRecipeSection);
  displayRecipes();
}

function saveRecipe(recipe) {
  let recipes = getRecipes();
  recipes.push(recipe);
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

function getRecipes() {
  return JSON.parse(localStorage.getItem("recipes") || "[]");
}

function displayRecipes() {
  let selectedCategory = categoryFilter.value;
  let recipes = getRecipes();
  let filterRecipes = recipes;

  if (selectedCategory !== "all") {
    filterRecipes = recipes.filter(
      (recipe) => recipe.category === selectedCategory
    );
  }

  if (filterRecipes.length === 0) {
    recipesContainer.innerHTML = "<p>No recipes found. Add a new recipe!</p>";
    return;
  }

  recipesContainer.innerHTML = "";

  filterRecipes.forEach((recipe) => {
    let recipeCard = document.createElement("div");
    recipeCard.className = "recipe-card";
    let ingredients = Array.isArray(recipe.ingredients)
      ? recipe.ingredients
      : [];

    recipeCard.innerHTML = `
            <h3>${recipe.name}</h3>
            <span id="recipe-category">${recipe.category}</span>
            <div id="recipe-ingredients">
                <h2>Ingredients</h2>
                <table>
                    <tbody>
                        ${ingredients
                          .map((ing) => `<tr><td>${ing}</td></tr>`)
                          .join("")}
                    </tbody>
                </table>
            </div>
        `;
    recipesContainer.appendChild(recipeCard);
  });
}

function initTheme() {
  let savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeButton(savedTheme);
}

function toggleTheme() {
  let currentTheme = document.documentElement.getAttribute("data-theme");
  let newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeButton(newTheme);
}

function updateThemeButton(theme) {
  themeToggle.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
}
