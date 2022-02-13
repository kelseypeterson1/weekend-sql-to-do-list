const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "tasks" ORDER BY "due" DESC;';
    pool.query(queryText)
      .then((result) => {
        console.log('tasks retrieved from server');  
        res.send(result.rows);
      })
      .catch((err) => {
          console.log('Error making query', queryText, err);
          res.sendStatus(500);
      });
});

router.post('/', (req, res) => {
    const newTask = req.body;
    const queryText = `
      INSERT INTO "tasks" ("task", "owner", "due")
      VALUES ($1, $2, $3);
    `;

    pool.query(queryText, [newTask.task, newTask.owner, newTask.date])
      .then((result) => {
          res.sendStatus(201);
      })
      .catch((err) => {
          console.log('Error querying', queryText, err);
          res.sendStatus(500);
      })
});

router.put('/:id', (req, res) => {
    let idToUpdate = req.params.id;
    console.log(idToUpdate);
    console.log(req.body);

    let sqlText = `
        UPDATE tasks
        SET status = 'complete'
        WHERE id = $1;
    `
    let sqlValues = [idToUpdate];

    pool.query(sqlText, sqlValues)
    .then(result => {
        res.sendStatus(200);
    }).catch(err => {
        console.log(err)
        res.sendStatus(500);
    })

})


module.exports = router;