let BASE_URL =
  "https://student-manager-387f6-default-rtdb.asia-southeast1.firebasedatabase.app/students";

let students = {};
let currentPage = 1;
let studentsPerPage = 2;
let editId = null;

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("student-form")
    .addEventListener("submit", handleSubmit);
  document.getElementById("reset").addEventListener("click", resetForm);
  document
    .getElementById("search")
    .addEventListener("input", debounce(renderStudents, 300));
  document
    .getElementById("filter-grade")
    .addEventListener("change", renderStudents);
  document
    .getElementById("filter-section")
    .addEventListener("change", renderStudents);
  document.getElementById("sort-by").addEventListener("change", renderStudents);
});
function fetchStudents() {
  fetch(`${BASE_URL}.json`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      students = data || {};
      renderStudents();
    })
    .catch((err) => console.log(err));
}
fetchStudents();
function handleSubmit(e) {
  e.preventDefault();
  let student = {
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    grade: document.getElementById("grade").value,
    section: document.getElementById("section").value,
    score: document.getElementById("score").value,
  };
  if (editId) {
    fetch(`${BASE_URL}/${editId}.json`, {
      method: "PATCH",
      body: JSON.stringify(student),
    }).then(() => {
      editId = null;
      fetchStudents();
      e.target.resetForm();
    });
  } else {
    fetch(`${BASE_URL}.json`, {
      method: "POST",
      body: JSON.stringify(student),
    }).then(() => {
      fetchStudents();
      e.target.resetForm();
    });
  }
}

function renderStudents() {
  let search = document.getElementById("search").value.toLowerCase();
  let grade = document.getElementById("filter-grade").value;
  let section = document.getElementById("filter-section").value;
  let sort = document.getElementById("sort-by").value;

  let entries = Object.entries(students || {});
  entries = entries.filter(([id, stu]) => {
    return (
      (!search ||
        stu.name.toLowerCase().includes(search) ||
        stu.grade.toLowerCase().includes(search)) &&
      (!grade || stu.grade == grade) &&
      (!section || stu.section === section)
    );
  });
  switch (sort) {
    case "name-asc":
      entries.sort((a, b) => a[1].name.localCompare(b[1].name));
      break;
    case "name-desc":
      entries.sort((a, b) => b[1].name.localCompare(a[1].name));
      break;
    case "score-asc":
      entries.sort((a, b) => a[1].score - b[1].score);
    case "score-desc":
      entries.sort((a, b) => b[1].score - a[1].score);
  }
  let total = entries.length;
  let start = (currentPage - 1) * studentsPerPage;
  let pageEntries = entries.slice(start, start + studentsPerPage);
  let container = document.getElementById("students-container");
  container.innerHTML =
    pageEntries
      .map(
        ([id, stu]) =>
          `<div class="student-card">
        <p><strong>${stu.name}</strong>(Age:${stu.age})</p>
        <p>Grade:${stu.grade}|Section:${stu.section}
        <button onclick="editStudent('${id}')">Edit</button>
        <button onclick="deleteStudent('${id}')">Deletet</button></div>
        `
      )
      .join(" ") || "<p>No students found </p>";
  renderPagination(total);
}

function renderPagination(total) {
  let pageCount = Math.ceil(total / studentsPerPage);
  let pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  for (let i = 1; i <= pageCount; i++) {
    for (let i = 1; i <= pageCount; i++) {
      let btn = document.getElementById("button");
      btn.textContent = i;
      if (i === currentPage) btn.disabled = true;
      btn.onclick = () => {
        currentPage = i;
        renderStudents();
      };
      pagination.appendChild(btn);
    }
  }
}
function editStudent(id) {
  let stu = students[id];
  document.getElementById("name").value = stu.name;
  document.getElementById("age").value = stu.age;
  document.getElementById("grade").value = stu.grade;
  document.getElementById("section").value = stu.section;
  document.getElementById("score").value = stu.score;
  editId = id;
}

function deleteStudent(id) {
  fetch(`${BASE_URL}/${id}.json`, {
    method: "DELETE",
  })
    .then(fetchStudents)
    .catch((err) => console.log(err));
}
function resetForm() {
  editId = null;
}
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
