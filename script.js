
const nameInput = document.getElementById("studentName");
const rollInput = document.getElementById("rollNumber");
const emailInput = document.getElementById("email");

const addButton = document.getElementById("addButton");

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const clearSearchButton = document.getElementById("clearSearchButton");

const tableBody = document.getElementById("studentTableBody");


// Students data
let students = JSON.parse(localStorage.getItem("students")) || [];


// Display students
function displayStudents(studentList = students) {

    tableBody.innerHTML = "";

    if (studentList.length === 0) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td colspan="4" class="empty-message">
                No students found
            </td>
        `;

        tableBody.appendChild(row);

        return;
    }


    studentList.forEach(function(student, index) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.roll}</td>
            <td>${student.email}</td>
            <td>
                <button class="edit-button" onclick="editStudent(${index})">
                    Edit
                </button>

                <button class="delete-button" onclick="deleteStudent(${index})">
                    Delete
                </button>
            </td>
        `;

        tableBody.appendChild(row);

    });
}


// Add student
addButton.addEventListener("click", function() {

    const name = nameInput.value.trim();
    const roll = rollInput.value.trim();
    const email = emailInput.value.trim();


    // Validation
    if (name === "" || roll === "" || email === "") {

        alert("Please fill all fields.");

        return;
    }


    // Add student
    const student = {
        name: name,
        roll: roll,
        email: email
    };


    students.push(student);


    // Save in browser
    localStorage.setItem("students", JSON.stringify(students));


    // Clear form
    nameInput.value = "";
    rollInput.value = "";
    emailInput.value = "";


    displayStudents();


    alert("Student added successfully!");

});


// Delete student
function deleteStudent(index) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this student?"
    );


    if (confirmDelete) {

        students.splice(index, 1);

        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );

        displayStudents();
    }
}


// Edit student
function editStudent(index) {

    const student = students[index];


    const newName = prompt(
        "Enter student name:",
        student.name
    );


    if (newName === null) {
        return;
    }


    const newRoll = prompt(
        "Enter roll number:",
        student.roll
    );


    if (newRoll === null) {
        return;
    }


    const newEmail = prompt(
        "Enter email:",
        student.email
    );


    if (newEmail === null) {
        return;
    }


    if (
        newName.trim() === "" ||
        newRoll.trim() === "" ||
        newEmail.trim() === ""
    ) {

        alert("Fields cannot be empty.");

        return;
    }


    students[index].name = newName.trim();
    students[index].roll = newRoll.trim();
    students[index].email = newEmail.trim();


    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );


    displayStudents();

}


// Search student
searchButton.addEventListener("click", function() {

    searchStudents();

});


// Search while typing
searchInput.addEventListener("input", function() {

    searchStudents();

});


// Search function
function searchStudents() {

    const searchValue = searchInput.value
        .trim()
        .toLowerCase();


    if (searchValue === "") {

        displayStudents();

        return;
    }


    const filteredStudents = students.filter(function(student) {

        return (
            student.name.toLowerCase().includes(searchValue) ||
            student.roll.toLowerCase().includes(searchValue)
        );

    });


    displayStudents(filteredStudents);

}


// Clear search
clearSearchButton.addEventListener("click", function() {

    searchInput.value = "";

    displayStudents();

});


// Show students when page opens
displayStudents();