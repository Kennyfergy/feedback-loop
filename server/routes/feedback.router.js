const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

router.get("/", (req, res) => {
  // Find all orders and return them
  pool
    .query('SELECT * FROM "feedback" ORDER BY "id" DESC;')
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error GET /feedback", error);
      res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
  let feedback = req.body;
  const queryText = `
      INSERT INTO "feedback"
        ("feeling", "understanding", "support", "comments")
      VALUES
        ($1, $2, $3, $4);
    `;
  if ((!feedback.feeling, !feedback.understanding, !feedback.support)) {
    console.log("Missing data in request");
    res.sendStatus(400);
    return;
  }
  pool
    .query(queryText, [
      feedback.feeling,
      feedback.understanding,
      feedback.support,
      feedback.comments,
    ])
    .then((response) => res.sendStatus(201))

    .catch((err) => {
      console.log("There was an error:", err);
      res.sendStatus(500);
    });
});

router.delete("/delete/:id", (req, res) => {
  let id = req.params.id;
  let queryText = 'DELETE FROM "feedback" WHERE id=$1;';
  pool
    .query(queryText, [id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error DELETE /feedback", error);
      res.sendStatus(500);
    });
});

router.put("/flagged/:id", (req, res) => {
  let id = req.params.id;
  let flagged = req.body.flagged;

  const queryText = 'UPDATE "feedback" SET "flagged" = $1 WHERE "id" = $2;';

  pool
    .query(queryText, [id, flagged])
    .then((dbRes) => res.sendStatus(200))
    .catch((err) => {
      console.log("There was an error:", err);
      res.sendStatus(500);
    });
});

module.exports = router;
