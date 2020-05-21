var express = require('express');
var router = express.Router();

const bodyParser = require("body-parser");
//const fs = require('fs');

//const studentData = JSON.parse(fs.readFileSync('./data/studentData.json'));
var studentData = []

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',    
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

pool.query('SELECT * FROM "studentData" ORDER BY "studentId" ASC', (error, results) => {
  if (error) {
    throw error
  }
  //console.log(results.rows)
  studentData = results.rows
  //console.log(studentData)
  //res.send(results.rows)
})

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send("A student id is rqquired.")
});

router.get('/:id', function (req, res, next) {
  //oneStudent = "";
  //console.log("***")
  console.log(`Params: ${req.params.id}`)
  //console.log(req.query)
  console.log("***")
  
  console.log(studentData)
  const oneStudent = studentData.filter(student => Number(student.studentId) === Number(req.params.id))
  //const oneStudent = studentData.filter(student => student.studentId == req.params.id)
  console.log(oneStudent)

  if ((oneStudent === undefined) || (oneStudent.length < 1))
  {
    res.send("No grades found for Student.")
  }
  else
  {
    res.send(oneStudent)
  }
});

router.post("/", function (req, res) {
    let result;
    const newGrade = req.body;
    if (
      newGrade.studentId &&
      newGrade.className &&
      newGrade.grade 
    ) {
        //console.log(newGrade)
        pool.query('INSERT INTO "studentData" ("studentId", "className", "grade") VALUES ($1, $2, $3)', [newGrade.studentId, newGrade.className, newGrade.grade], (error, results) => {
          if (error) {
            throw error
          }
        })

        // Add ins here could be a select to see if the grade already exists and an update if the new grade is better than the old grade.
        
        pool.query('SELECT * FROM "studentData" ORDER BY "studentId" ASC', (error, results) => {
          if (error) {
            throw error
          }
          //console.log(results.rows)
          studentData = results.rows
          //console.log(studentData)
          //res.send(results.rows)
        })
  
      result = {
        status: "success",
        message: "This grade data has been successfully added",
      };
    
    } else {
      result = {
        status: "failed",
        message: "The grade data has not been added",
      };
      res.status(400);
    }
  
    res.json(result);
  });

module.exports = router;