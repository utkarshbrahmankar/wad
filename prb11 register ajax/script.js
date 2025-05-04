function getUsers() {
    return JSON.parse(localStorage.getItem("users") || "[]");
  }
  
  function setUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
  }
  
  function registerUser(event) {
    event.preventDefault();
    const user = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      mobile: document.getElementById("mobile").value.trim(),
      dob: document.getElementById("dob").value,
      city: document.getElementById("city").value.trim(),
      address: document.getElementById("address").value.trim(),
      username: document.getElementById("username").value.trim(),
      password: document.getElementById("password").value
    };
  
    const users = getUsers();
    if (users.find(u => u.username === user.username)) {
      alert("Username already exists");
      return;
    }
  
    users.push(user);
    setUsers(users);
  
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8000/register", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(user));
  
    alert("Registration successful!");
    window.location.href = "login.html";
  }
  
  function loginUser(event) {
    event.preventDefault();
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value;
  
    const users = getUsers();
    const found = users.find(u => u.username === username && u.password === password);
    if (found) {
      alert("Login successful!");
      window.location.href = "users.html";
    } else {
      alert("Invalid credentials");
    }
  }
  
  function displayUsers() {
    const users = getUsers();
    const tbody = document.getElementById("userTableBody");
    users.forEach(user => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${user.name}</td><td>${user.email}</td>
        <td>${user.mobile}</td><td>${user.dob}</td>
        <td>${user.city}</td><td>${user.address}</td>
      `;
      tbody.appendChild(tr);
    });
  }
  