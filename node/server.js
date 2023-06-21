const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { log } = require('console');

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodeTest',
});

app.post('/webhook', (req, res) => {
  const data = req.body;
  const arrayOfArrays = data.map(obj => {
    const { id, ...rest } = obj;
    return Object.values(rest);
  });
  
  pool.query('INSERT INTO employees (employee_name, employee_salary, employee_age, profile_image) VALUES ?', [arrayOfArrays], (error) => {
    if (error) {
      console.error('Error inserting data:', error);
      res.sendStatus(500);
    } else {
        console.log("done")
      res.sendStatus(200);
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
