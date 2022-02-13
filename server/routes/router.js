const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// retrieves tasks from the database and sends them to client.js
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

// adds new tasks from client.js to the database
router.post('/', (req, res) => {
    const newTask = req.body;
    const queryText = `
      INSERT INTO "tasks" ("task", "owner", "due", "complete")
      VALUES ($1, $2, $3, 'FALSE');
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

// updates the status of task to complete in the database
router.put('/:id', (req, res) => {
    let idToUpdate = req.params.id;
    console.log(idToUpdate);
    console.log(req.body);

    let sqlText = `
        UPDATE tasks
        SET complete = 'true'
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

// deletes the task from the database
router.delete('/:id', (req, res) => {
    let reqId = req.params.id;
    console.log('Delete ID', reqId);
    let queryText = 'DELETE FROM "tasks" WHERE "id" = $1;'
    pool.query(queryText, [reqId])
        .then((result) => {
            console.log('Task deleted');
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('Error making database query', queryText, error);
            res.sendStatus(500);
        })
})


module.exports = router;