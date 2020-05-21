var express = require('express');
var router = express.Router();

const bodyParser = require("body-parser");
const fs = require('fs');

const studentData = JSON.parse(fs.readFileSync('./data/studentData.json'));

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  //fs.readFile('./data/students.json', (err, json) => {
  //  let obj = JSON.parse(json);
  //  res.json(obj);
  //});
  //res.send(
  //  'students'
  //);
  
  res.send("A student id is rqquired.")
});

router.get('/:id', function (req, res, next) {
  //oneStudent = "";
  //console.log("***")
  console.log(`Params: ${req.params.id}`)
  //console.log(req.query)
  console.log("***")
  
  const oneStudent = studentData.filter(student => student.studentId === Number(req.params.id))
  
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
      //reviews.push({
      //  email: review.email,
      //  movieId: review.movieId,
      //  reviewTitle: review.reviewTitle,
      //  reviewText: review.reviewText,
      //});
  
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