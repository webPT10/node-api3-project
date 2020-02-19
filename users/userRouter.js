const express = require("express");
const db = require("./userDb");

const router = express.Router();
router.use(express.json())

router.post("/users", (req, res) => {
  const body = req.body;

  db.insert(body)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => {
      res.status(500).json({ error: "Could not create user. Good-bye."})
    })
});

router.post("/users/:id/posts", (req, res) => {
  // do your magic!
});

router.get("/users/", (req, res) => {
  // do your magic!
});

router.get("/users/:id", (req, res) => {
  // do your magic!
});

router.get("/users/:id/posts", (req, res) => {
  // do your magic!
});

router.delete("/users/:id", (req, res) => {
  // do your magic!
});

router.put("/users/:id", (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;

  db.getById(id)
    .then(userId => {
      req.userId = userId;
    })
    .catch(error => {
      res.status(400).json({ message: "Invalid user id." });
    });
}

function validateUser(req, res, next) {
  const body = req.body;
  
  if (!body){
    res.status(400).json({ message: "Missing user data."})
  } else if (!body.name){
    res.status(400).json({ message: "Missing required name field."})
  } else 
  next()
}

function validatePost(req, res, next) {
  const body = req.body;

  if(!body){
    res.status(400).json({ message: "Missing post data." })
  } else if (!body.text){
    res.status(400).json({ message: "Missing required text field." })
  } else 
  next()
}

module.exports = router;
