var express = require('express');
var router = express.Router();

//var pgp = require('pg-promise')(/* options */)
//var poolConnection = require('./postgres-connection');
const bodyParser = require("body-parser");

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',    
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      res.send(results.rows)
    })
});

router.get('/:id', function (req, res, next) {
  
  var userQuery = "This is a test"

  if (req.params.id === 'search')
  {
    console.log("**** in search")
    //console.log(req.query)
    const searchTerm = req.query.searchTerm
    console.log(searchTerm)
    if (searchTerm === undefined)
    {
      userQuery = "Improperly defined search"
    }
    else
    {
      console.log(`*** doing select with searchTerm of ${searchTerm}`)
      pool.query('SELECT * FROM users WHERE email = $1', [searchTerm], (error, results) => {
        if (error) {
          throw error
        }
        console.log("**** User select")
        console.log(results.rows)
      })
      
      console.log("setting user query to something good happened")
      userQuery = "Somthing good happened"
    }
  }
  else
  {
     //res.send("Improperly setup search")
     userQuery = "Improperly setup search"
    //oneStudent = studentInfo.find(student => Number(student.studentId) === Number(req.params.id))
  }
  console.log(userQuery)
  res.send(userQuery)
  
});


router.post("/", function (req, res) {
  let result;
  var rowsReturned = 0

  console.log(req.body)
  const user = { username: req.body.username, email: req.body.email, password: req.body.password };
  if (user.username && user.email && user.password) {
    
    pool.query('SELECT * FROM users WHERE email = $1', [user.email], (error, results) => {
      if (error) {
        throw error;
      }
      console.log("**** User select");
      console.log(results.rows);
      rowsReturned = results.rows.length;
      console.log(rowsReturned);
      //res.send(results.rows)
    })

    console.log("outside of select")
    console.log(rowsReturned)
    if (rowsReturned < 1)
    {
        pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [user.username, user.email], (error, results) => {
          if (error) {
            throw error
          }
        })
      
      result = {
        status: "success",
        message: "The account has been successfully created",
      };
    }
    else
    {
      result = {
        status: "exists",
        message: "The account already exists",
      }
    }
    

  } else {
    result = {
      status: "failed",
      message: "The account has not been created",
    };
    res.status(400);
  }
  res.json(result);
});

module.exports = router;
