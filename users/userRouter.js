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

router.post("/users/:id/posts", validateUserId, validatePost, (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const userId = body.user_id;

  if (userId && userId === id) {
    postDb
      .insert(body)
      .then(post => {
        res.status(200).json(post);
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: `User ${id} could not be updated. Good-bye.` });
      });
  } else {
    res.status(400).json({
      error: `Missing user_id field or user_id does not match expected user ${id}.`
    });
  }
});

// tested +
router.get("/users/", (req, res) => {
  db.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ error: "Could not retrieve users. Good-bye." });
    });
});

router.get("/users/:id", validateUserId, (req, res) => {
  const { id } = req.params;

  db.getById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: `Could not retrieve user at id ${id}. Good-bye.` });
    });
});

router.get("/users/:id/posts", validateUserId, (req, res) => {
  const { id } = req.params;

  db.getUserPosts(id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: `Unable to retrieve posts for user ${id}.` });
    });
});

router.delete("/users/:id", validateUserId, (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(user => {
      if (user === 1) {
        res.status(200).json(user);
      } else res.status(400).json({ error: "Nothing deleted." });
    })
    .catch(error => {
      res.status(500).json({ error: `Could not delete user ${id}` });
    });
});

// NOT FINISHED!
router.put("/users/:id", validateUserId, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.update(id, changes)
    .then(updated => {
      if(updated === 1){
        db.getById(id)
          .then(user => {
            res.status(200).json(user)
          })
          .catch(error => {
            res.status(500).json({ error: "Server error." })
          })
      } else 
          res.status(400).json({ error: "Nothing updated." })
    })
    .catch(error => {
      res.status(500).json({ error: `Unable to updated user ${id}.` })
    });
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
  next();
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
