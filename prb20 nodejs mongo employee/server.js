const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/employeeDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define schema
const employeeSchema = new mongoose.Schema({
  id: Number,
  name: String,
  department: String,
  designation: String,
  salary: Number,
  joiningDate: Date
});

const Employee = mongoose.model('Employee', employeeSchema);

// Get all employees
app.get('/api/employees', async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

// Get one employee by custom id
app.get('/api/employees/custom/:id', async (req, res) => {
  const emp = await Employee.findOne({ id: parseInt(req.params.id) });
  if (!emp) return res.status(404).json({ error: 'Not found' });
  res.json(emp);
});

// Add a new employee
app.post('/api/employees', async (req, res) => {
  const emp = new Employee(req.body);
  await emp.save();
  res.json(emp);
});

// Update by custom id
app.put('/api/employees/custom/:id', async (req, res) => {
  const emp = await Employee.findOneAndUpdate(
    { id: parseInt(req.params.id) },
    req.body,
    { new: true }
  );
  res.json(emp);
});

// Delete by custom id
app.delete('/api/employees/custom/:id', async (req, res) => {
  const emp = await Employee.findOneAndDelete({ id: parseInt(req.params.id) });
  res.json({ message: 'Deleted' });
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
