var express = require('express');
var router = express.Router();
const fs = require('fs');


const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',    
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

//const studentInfo = JSON.parse(fs.readFileSync('./data/students.json'));
var studentInfo = []

pool.query('SELECT * FROM students ORDER BY "studentId" ASC', (error, results) => {
  if (error) {
    throw error
  }
  //console.log(results.rows)
  studentInfo = results.rows
  //res.send(results.rows)
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(studentInfo)
});

router.get('/:id', function (req, res, next) {
  
  if (req.params.id === 'search')
  {
    //console.log(req)
    //console.log(req.query)
    const searchTerm = req.query.searchTerm
    //console.log(searchTerm)
    if (searchTerm === undefined)
    {
      oneStudent = "Improperly defined search"
    }
    else
    {
      oneStudent = studentInfo.filter(student => student.studentName.indexOf(req.query.searchTerm) !== -1)
    }
  }
  else
  {
    oneStudent = studentInfo.find(student => Number(student.studentId) === Number(req.params.id))
  }
  //console.log(oneStudent)
  if (oneStudent === undefined)
  {
  res.send("Student Record not found")
  }
  else
  {
  res.send(oneStudent)
  }
});

module.exports = router;