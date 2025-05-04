const displayTasks = () => {
    document.getElementById("task-list").innerHTML = "";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8000/tasks", true);
    xhr.onload = function () {
      if (this.status === 200) {
        const tasks = JSON.parse(this.responseText);
        tasks.forEach((element, index) => {
          let li = document.createElement("li");
          li.innerHTML = `
            <span id="task-${index}">${element}</span>
            <button onclick="deleteTask(${index})">Delete</button>
            <button onclick="editTask(${index})">Edit</button>
          `;
          document.getElementById("task-list").append(li);
        });
      } else console.log("error");
    };
    xhr.send();
  };
  
  const addTasks = () => {
    const task = document.getElementById("task-input").value;
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8000/tasks", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
      if (this.status === 201) {
        document.getElementById("task-input").value = "";
        displayTasks();
      } else console.log("error");
    };
    xhr.send(JSON.stringify({ task }));
  };
  
  const deleteTask = (index) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8000/tasks/delete", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
      if (this.status === 200) {
        displayTasks();
      } else console.log("error");
    };
    xhr.send(JSON.stringify({ index }));
  };
  
  const editTask = (index) => {
    const currentText = document.getElementById(`task-${index}`).innerText;
    const newTask = prompt("Edit the task:", currentText);
    if (newTask !== null && newTask.trim() !== "") {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:8000/tasks/update", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onload = function () {
        if (this.status === 200) {
          displayTasks();
        } else console.log("error");
      };
      xhr.send(JSON.stringify({ index, task: newTask.trim() }));
    }
  };
  
  window.onload = displayTasks;
  