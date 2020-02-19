const express = require("express");
const db = require("./userDb");
const postDb = require("../posts/postDb");

const router = express.Router();
router.use(express.json());

router.post("/users", validateUser, (req, res) => {
  const body = req.body;

  db.insert(body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({ error: "Could not create user. Good-bye." });
    });
});

router.post("/users/:id/posts", (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const userId = body.user_id;

  if(userId && userId === id){
    postDb.insert(body)
      .then(post => {
        res.status(200).json(post)
      })
      .catch(error => {
        res.status(500).json({ error: `User ${id} could not be updated. Good-bye.` })
      })
  } else {
    res.status(400).json({ error: `Missing user_id field or user_id does not match expected user ${id}.` })
  }
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

  if (!body) {
    res.status(400).json({ message: "Missing user data." });
  } else if (!body.name) {
    res.status(400).json({ message: "Missing required name field." });
  } else next();
}

function validatePost(req, res, next) {
  const body = req.body;

  if (!body) {
    res.status(400).json({ message: "Missing post data." });
  } else if (!body.text) {
    res.status(400).json({ message: "Missing required text field." });
  } else next();
}

module.exports = router;
