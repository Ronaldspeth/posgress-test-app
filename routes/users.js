var express = require('express');
var router = express.Router();

const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.send([
    {username: "Person1", fullName: "Person One"},
    {username: "Person2", fullName: "Person Two"}
  ]);
});

router.post("/", function (req, res) {
  let result;
  console.log(req.body)
  const user = { username: req.body.username, email: req.body.email, password: req.body.password };
  if (user.username && user.email && user.password) {
    //const existingUserIndex = users.findIndex(
    //  (oldUser) => oldUser.email === user.email
    //);
    //existingUserIndex === -1
    //  ? users.push(user)
    //  : users.splice(existingUserIndex, 1, user);

    result = {
      status: "success",
      message: "The account has been successfully created",
    };
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
