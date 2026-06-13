let students = [];

// ---------- GENERATE 100 STUDENTS ----------
function generateStudents() {

  const departments = ["CSE", "IT", "ECE", "EEE", "MECH"];

  const names = [
    "Aarav Sharma","Vivaan Reddy","Aditya Kumar","Arjun Naidu","Sai Teja",
    "Rohit Singh","Rahul Verma","Karthik Rao","Nikhil Jain","Manish Yadav",
    "Suresh Babu","Harsha Vardhan","Vikram Patel","Abhinav Gupta","Pranav Shetty",
    "Lokesh Kumar","Dinesh Reddy","Ganesh Rao","Prakash Singh","Kiran Kumar",
    "Aditi Sharma","Pooja Reddy","Sneha Iyer","Ananya Das","Meera Nair",
    "Divya Patel","Kavya Rao","Nandini Singh","Swathi Kumar","Ishita Jain",
    "Bhavana Reddy","Lakshmi Devi","Priya Sharma","Reshma Khan","Sanjana Reddy",
    "Ritika Gupta","Shruti Verma","Neha Yadav","Sakshi Singh","Keerthi Rao",
    "Manoj Kumar","Ajay Singh","Vijay Reddy","Deepak Sharma","Sandeep Yadav",
    "Varun Jain","Anil Kumar","Mahesh Babu","Ramesh Rao","Naresh Singh"
  ];

  for (let i = 1; i <= 100; i++) {
    const name = names[i % names.length] + " " + i;

    students.push({
      id: i,
      name: name,
      email: name.toLowerCase().replace(/ /g,"") + "@mail.com",
      phone: "98" + Math.floor(10000000 + Math.random()*90000000),
      department: departments[i % departments.length]
    });
  }
}

generateStudents();


// ---------- RENDER TABLE ----------
function renderTable() {

  const search = document.getElementById("search").value.toLowerCase();
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  let filtered = students.filter(s =>
    s.name.toLowerCase().includes(search) ||
    s.email.toLowerCase().includes(search) ||
    s.department.toLowerCase().includes(search)
  );

  filtered.forEach(s => {
    tbody.innerHTML += `
      <tr>
        <td>${s.id}</td>
        <td>${s.name}</td>
        <td>${s.email}</td>
        <td>${s.phone}</td>
        <td>${s.department}</td>
        <td>
          <button onclick="editStudent(${s.id})">Edit</button>
          <button onclick="deleteStudent(${s.id})">Delete</button>
        </td>
      </tr>
    `;
  });

  updateStats();
}


// ---------- ADD STUDENT ----------
function addStudent() {

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const department = document.getElementById("department").value;

  if (!name || !email || !phone || !department) {
    alert("Fill all fields");
    return;
  }

  const newId = students.length ? Math.max(...students.map(s => s.id)) + 1 : 1;

  students.push({
    id: newId,
    name,
    email,
    phone,
    department
  });

  clearForm();
  renderTable();
}


// ---------- EDIT ----------
function editStudent(id) {

  const s = students.find(x => x.id === id);

  document.getElementById("name").value = s.name;
  document.getElementById("email").value = s.email;
  document.getElementById("phone").value = s.phone;
  document.getElementById("department").value = s.department;

  deleteStudent(id);
}


// ---------- DELETE ----------
function deleteStudent(id) {
  students = students.filter(s => s.id !== id);
  renderTable();
}


// ---------- CLEAR FORM ----------
function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("department").value = "";
}


// ---------- STATS (DASHBOARD + DEPARTMENTS PAGE) ----------
function updateStats() {

  document.getElementById("totalStudents").innerText = students.length;

  const cse = students.filter(s => s.department === "CSE").length;
  const it = students.filter(s => s.department === "IT").length;
  const ece = students.filter(s => s.department === "ECE").length;
  const eee = students.filter(s => s.department === "EEE").length;
  const mech = students.filter(s => s.department === "MECH").length;

  // Dashboard stats
  if (document.getElementById("cseCount")) {
    document.getElementById("cseCount").innerText = cse;
    document.getElementById("itCount").innerText = it;
    document.getElementById("eceCount").innerText = ece;
  }

  // Departments page stats
  if (document.getElementById("depCSE")) {
    document.getElementById("depCSE").innerText = cse;
    document.getElementById("depIT").innerText = it;
    document.getElementById("depECE").innerText = ece;
    document.getElementById("depEEE").innerText = eee;
    document.getElementById("depMECH").innerText = mech;
  }
}


// ---------- SORT ----------
function sortData(key) {
  students.sort((a, b) => (a[key] > b[key] ? 1 : -1));
  renderTable();
}


// ---------- PAGE NAVIGATION ----------
function showPage(page) {

  document.querySelectorAll(".page").forEach(p => {
    p.classList.add("hidden");
  });

  document.getElementById(page).classList.remove("hidden");

  if (page === "departments") {
    updateStats();
  }
}


// ---------- LOGOUT ----------
function logout() {
  alert("Logged out successfully!");
  location.reload();
}


// ---------- INIT ----------
renderTable();
showPage("dashboard");