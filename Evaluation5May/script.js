let navLinks = document.querySelectorAll(".navLinks");
let contentSection = document.querySelectorAll(".content-section");
let darkModeToggle = document.getElementById("dark-mode-toggle");
let profileDisplay = document.getElementById("profileDisplay");
let profileEditBtn = document.getElementById("editProfile");
let sortBtn = document.getElementById("sort");
let searchinput = document.getElementById("searchuser");
let loadDataBtn = document.getElementById("loadData");
let studentTableContainer = document.getElementById("studentTableContainer");
let studentTable = document.getElementById("studentTable");
let studentTableBody = document.getElementById("studentTableBody");
let profileEdit = document.getElementById("profileEdit");

let studentsData = JSON.parse(localStorage.getItem("studentsData"));
let currentProfile = JSON.parse(localStorage.getItem("currentProfile"));

navLinks.forEach((link) => {
  link.addeventListener("click", (e) => {
    e.preventDefault();
    let sectionId = `${link.dataset.section}Section`;

    navLinks.forEach((navLink) => navLink.classList.remove("active"));
    link.addclassList.add("active");

    contentSection.forEach((section) => {
      section.style.display = "none";
    });
    document.getElementById(sectionId).style.display = "block";
  });
});
darkModeToggle.addeventListener("click", () => {
  document.body.classList.toogle("dark-mode");
  localStorage.setItem(
    "darkMode",
    document.body.classList.contains("dark-mode")
  );
});
