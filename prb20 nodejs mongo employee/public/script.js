window.onload = async () => {
    const res = await fetch('/api/employees');
    const employees = await res.json();
    const table = document.getElementById('employeeTable');
    table.innerHTML = `
      <tr>
        <th>ID</th><th>Name</th><th>Department</th><th>Designation</th>
        <th>Salary</th><th>Joining Date</th><th>Actions</th>
      </tr>` +
      employees.map(e => `
        <tr>
          <td>${e.id}</td>
          <td>${e.name}</td>
          <td>${e.department}</td>
          <td>${e.designation}</td>
          <td>${e.salary}</td>
          <td>${new Date(e.joiningDate).toLocaleDateString()}</td>
          <td>
            <a href="update.html?id=${e.id}">Edit</a> |
            <a href="#" onclick="deleteEmp(${e.id})">Delete</a>
          </td>
        </tr>`).join('');
  };
  
  async function deleteEmp(id) {
    if (confirm("Are you sure?")) {
      await fetch(`/api/employees/custom/${id}`, { method: 'DELETE' });
      alert('Deleted!');
      window.location.reload();
    }
  }
  