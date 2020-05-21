var express = require('express');
var router = express.Router();
const fs = require('fs');

const studentInfo = JSON.parse(fs.readFileSync('./data/students.json'));
/* GET users listing. */
router.get('/', function(req, res, next) {
  
  res.send(studentInfo)
});

router.get('/:id', function (req, res, next) {
  
  if (req.params.id === 'search')
  {
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
    oneStudent = studentInfo.find(student => student.studentId === Number(req.params.id))
  }
  console.log(oneStudent)
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