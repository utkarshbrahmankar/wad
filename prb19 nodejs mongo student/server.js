const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

mongoose.connect('mongodb://127.0.0.1/student')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const studentSchema = new mongoose.Schema({
  Name: String,
  Roll_No: Number,
  WAD_Marks: Number,
  CC_Marks: Number,
  DSBDA_Marks: Number,
  CNS_Marks: Number,
  AI_marks: Number,
});

const Student = mongoose.model('studentmarks', studentSchema);

const students = [
  { Name: "Alice", Roll_No: 101, WAD_Marks: 45, CC_Marks: 38, DSBDA_Marks: 42, CNS_Marks: 35, AI_marks: 40 },
  { Name: "Bob", Roll_No: 102, WAD_Marks: 30, CC_Marks: 26, DSBDA_Marks: 18, CNS_Marks: 25, AI_marks: 28 },
  { Name: "Charlie", Roll_No: 103, WAD_Marks: 28, CC_Marks: 27, DSBDA_Marks: 22, CNS_Marks: 29, AI_marks: 27 },
  { Name: "David", Roll_No: 104, WAD_Marks: 35, CC_Marks: 30, DSBDA_Marks: 29, CNS_Marks: 32, AI_marks: 34 },
  { Name: "Eve", Roll_No: 105, WAD_Marks: 22, CC_Marks: 24, DSBDA_Marks: 21, CNS_Marks: 20, AI_marks: 23 },
  { Name: "Frank", Roll_No: 106, WAD_Marks: 38, CC_Marks: 37, DSBDA_Marks: 35, CNS_Marks: 39, AI_marks: 40 },
  { Name: "Grace", Roll_No: 107, WAD_Marks: 18, CC_Marks: 15, DSBDA_Marks: 17, CNS_Marks: 22, AI_marks: 19 }
];

async function insert() {
  const count = await Student.countDocuments();
  if (count === 0) {
    try {
      await Student.insertMany(students, { ordered: false });
      console.log("Sample data inserted successfully!");
    } catch (err) {
      console.error("Error inserting sample data:", err);
    }
  }
}

insert();

app.get('/', async (req, res) => {
  res.send(`
    <h1>Student Database Operations</h1>
    <ul>
      <li><a href="/list-all">List All Documents</a></li>
      <li><a href="/dsbda-above-20">Students with DSBDA Marks > 20</a></li>
      <li><a href="/update-marks">Update Marks</a></li>
      <li><a href="/all-above-25">Students with All Marks > 25</a></li>
      <li><a href="/below-40">Students with Marks < 40</a></li>
      <li><a href="/remove-student/">Remove Student</a></li>
      <li><a href="/display-table">Display Student Data in Table</a></li>
    </ul>
  `);
});

// d) Display count and list all documents
app.get('/list-all', async (req, res) => {
  try {
    const count = await Student.countDocuments();
    const students = await Student.find({});
    
    let response = `<h2>Total Documents: ${count}</h2>`;
    response += '<h3>All Student Documents:</h3>';
    response += '<table border="1">';
    response += '<tr><th>Name</th><th>Roll No</th><th>WAD</th><th>CC</th><th>DSBDA</th><th>CNS</th><th>AI</th></tr>';
    
    response += students.map(s => `
      <tr>
        <td>${s.Name}</td>
        <td>${s.Roll_No}</td>
        <td>${s.WAD_Marks}</td>
        <td>${s.CC_Marks}</td>
        <td>${s.DSBDA_Marks}</td>
        <td>${s.CNS_Marks}</td>
        <td>${s.AI_marks}</td>
      </tr>
    `).join(''); 
    
    response += '</table>';
    
    res.send(response);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

// e) List students with DSBDA marks > 20
app.get('/dsbda-above-20', async (req, res) => {
  try {
    const students = await Student.find({ DSBDA_Marks: { $gt: 20 } });
    
    let response = '<h2>Students with DSBDA Marks > 20:</h2>';
    response += '<ul>';
    students.forEach(student => {
      response += `<li>${student.Name} (DSBDA Marks: ${student.DSBDA_Marks})</li>`;
    });
    response += '</ul>';
    
    res.send(response);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

// f) Update marks of specified student
app.get('/update-marks/:rollno', async (req, res) => {
  try {
    const rollno = parseInt(req.params.rollno); // Convert to number

    const result = await Student.updateOne(
      { Roll_No: rollno },
      { $inc: { 
          WAD_Marks: 10, 
          CC_Marks: 10,
          DSBDA_Marks: 10,
          CNS_Marks: 10,
          AI_marks: 10 
        } 
      }
    );

    if (result.modifiedCount === 1) {
      const updatedStudent = await Student.findOne({ Roll_No: rollno });
      res.send(`
        <h2>Student Updated Successfully</h2>
        <p>Updated ${result.modifiedCount} document</p>
        <h3>Updated Student Details:</h3>
        <pre>${JSON.stringify(updatedStudent, null, 2)}</pre>
        <a href="/list-all">Back to List</a>
      `);
    } else {
      res.send('No student was updated. Student might not exist.');
    }
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

// g) List students with all marks > 25
app.get('/all-above-25', async (req, res) => {
  try {
    const students = await Student.find({
      WAD_Marks: { $gt: 25 },
      CC_Marks: { $gt: 25 },
      DSBDA_Marks: { $gt: 25 },
      CNS_Marks: { $gt: 25 },
      AI_marks: { $gt: 25 }
    });
    
    let response = '<h2>Students with All Marks > 25:</h2>';
    
    if (students.length === 0) {
      response += '<p>No students found with all marks greater than 25.</p>';
    } else {
      response += '<ul>';
      students.forEach(student => {
        response += `<li>${student.Name}</li>`;
      });
      response += '</ul>';
    }
    
    res.send(response);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

// h) List students with marks < 40 in both subjects
app.get('/below-40', async (req, res) => {
  try {
    const students = await Student.find({
      WAD_Marks: { $lt: 40 },
      CC_Marks: { $lt: 40 }
    });
    
    let response = '<h2>Students with WAD and CC Marks < 40:</h2>';
    
    if (students.length === 0) {
      response += '<p>No students found with WAD and CC marks less than 40.</p>';
    } else {
      response += '<ul>';
      students.forEach(student => {
        response += `<li>${student.Name} (WAD: ${student.WAD_Marks}, CC: ${student.CC_Marks})</li>`;
      });
      response += '</ul>';
    }
    
    res.send(response);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

// i) Remove specified student
app.get('/remove-student/:name', async (req, res) => {
  try {
    const studentName = req.params.name;
    
    const result = await Student.deleteOne({ Name: studentName });
    
    if (result.deletedCount === 1) {
      res.send(`
        <h2>Student Removed Successfully</h2>
        <p>Removed student: ${studentName}</p>
        <a href="/list-all">Back to List</a>
      `);
    } else {
      res.send('No student was removed. Student might not exist.');
    }
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

// j) Display student data in tabular format
app.get('/display-table', async (req, res) => {
  try {

    const students = await Student.find({});
    
    let table = `
      <h2>Student Data in Tabular Format</h2>
      <table border="1" cellpadding="5" cellspacing="0">
        <tr>
          <th>Name</th>
          <th>Roll No</th>
          <th>WAD</th>
          <th>DSBDA</th>
          <th>CNS</th>
          <th>CC</th>
          <th>AI</th>
        </tr>
    `;
    
    students.forEach(student => {
      table += `
        <tr>
          <td>${student.Name}</td>
          <td>${student.Roll_No}</td>
          <td>${student.WAD_Marks}</td>
          <td>${student.DSBDA_Marks}</td>
          <td>${student.CNS_Marks}</td>
          <td>${student.CC_Marks}</td>
          <td>${student.AI_marks}</td>
        </tr>
      `;
    });
    
    table += '</table>';
    
    res.send(table);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});