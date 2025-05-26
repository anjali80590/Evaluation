const BASE_URL = `https://student-manager-387f6-default-rtdb.asia-southeast1.firebasedatabase.app/`;
let students = {};
let editingId = null;

function createOrUpdateStudent() {
    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value.trim();
    const grade = document.getElementById("grade").value.trim();
    const section = document.getElementById("section").value.trim();
    const score = document.getElementById("score").value.trim();

    if (!name || !age || !grade || !section || !score) {
        alert("Please fill in all fields");
        return;
    }

    const student = { name, age, grade, section, score };

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${BASE_URL}${editingId}.json` : `${BASE_URL}.json`;

    fetch(url, {
        method: method,
        body: JSON.stringify(student),
        headers: { "Content-Type": "application/json" },
    })
        .then((res) => res.json())
        .then((data) => {
            if (editingId) {
                students[editingId] = student;
                editingId = null;
            } else if (data.name) {
                students[data.name] = student;
            }
            resetForm();
            renderStudents();
        })
        .catch((err) => {
            console.error("Error:", err);
        });
}

function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("grade").value = "";
    document.getElementById("section").value = "";
    document.getElementById("score").value = "";
    editingId = null;
}

function fetchStudents() {
    fetch(`${BASE_URL}.json`)
        .then((res) => res.json())
        .then((data) => {
            students = data || {};
            renderStudents();
        })
        .catch((err) => {
            console.error("Fetch error:", err);
        });
}

function renderStudents() {
    const search = document.getElementById("search").value.trim().toLowerCase();
    const gradeFilter = document.getElementById("grade-filter").value;
    const sectionFilter = document.getElementById("section-filter").value;
    const sortOrder = document.getElementById("sort-order").value;

    const studentContainer = document.getElementById("students");
    studentContainer.innerHTML = "";

    let entries = Object.entries(students || {});


    entries = entries.filter(([_, stu]) =>
        stu && stu.name && stu.age && stu.grade && stu.section && stu.score
    );

  
    entries = entries.filter(([_, stu]) => {
        const matchesSearch =
            !search ||
            stu.name.toLowerCase().includes(search) ||
            stu.grade.toLowerCase().includes(search);
        const matchesGrade = !gradeFilter || stu.grade === gradeFilter;
        const matchesSection = !sectionFilter || stu.section === sectionFilter;
        return matchesSearch && matchesGrade && matchesSection;
    });


    switch (sortOrder) {
        case "name-asc":
            entries.sort((a, b) => a[1].name.localeCompare(b[1].name));
            break;
        case "name-desc":
            entries.sort((a, b) => b[1].name.localeCompare(a[1].name));
            break;
        case "score-asc":
            entries.sort((a, b) => Number(a[1].score) - Number(b[1].score));
            break;
        case "score-desc":
            entries.sort((a, b) => Number(b[1].score) - Number(a[1].score));
            break;
    }

    if (entries.length === 0) {
        studentContainer.innerHTML = "<p>No students found.</p>";
        return;
    }

    entries.forEach(([id, stu]) => {
        const div = document.createElement("div");
        div.className = "student";
        div.innerHTML = `
  <strong>${stu.name}</strong><br/>
  Age: ${stu.age}<br/>
  Grade: ${stu.grade}<br/>
  Section: ${stu.section}<br/>
  Score: ${stu.score}<br/>
  <button onclick="editStudent('${id}')">Edit</button>
  <button onclick="deleteStudent('${id}')">Delete</button>
`;
        studentContainer.appendChild(div);
    });
}

function editStudent(id) {
    const stu = students[id];
    document.getElementById("name").value = stu.name;
    document.getElementById("age").value = stu.age;
    document.getElementById("grade").value = stu.grade;
    document.getElementById("section").value = stu.section;
    document.getElementById("score").value = stu.score;
    editingId = id;
}

function deleteStudent(id) {
    if (!confirm("Are you sure you want to delete this student?")) return;

    fetch(`${BASE_URL}${id}.json`, { method: "DELETE" })
        .then(() => {
            delete students[id];
            renderStudents();
        })
        .catch((err) => {
            console.error("Delete error:", err);
        });
}


fetchStudents();
