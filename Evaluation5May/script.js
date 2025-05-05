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


document.getElementById('dark-mode-toggle').addEventListener('click',()=>{
  document.body.classList.toggle("dark-mode");
    localStorage.setItem(
      "darkMode",
      document.body.classList.contains("dark-mode")
    );
    if(localStorage.getItem('darkMode')=="true"){
      document.body.classList.add('dark-Mode');
    }
  }
)

editProfileBtn.addeventListener('click',()=>{
    profileDisplay.style.display='none';
    profileEdit.style.display='block';
})
if(currentProfile){
    document.getElementById('name').value=currentProfile.name||' '
    document.getElementById('age').value=currentProfile.age||' ';
    document.getElementById('email').value=currentProfile.email||' ';
    document.getElementById('course').value=currentProfile.course||' '
}
