const express = require("express");
const db = require("./userDb");

const router = express.Router();

router.post("/", (req, res) => {
  // do your magic!
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

router.get("/", (req, res) => {
  // do your magic!
});

router.get("/:id", (req, res) => {
  // do your magic!
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
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
