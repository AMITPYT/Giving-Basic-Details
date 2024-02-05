const express = require("express");
const router = express.Router();
const pool = require("../db")
const mysql = require('mysql')



router.post('/createuser', async (req, res) => {

    const {UserId, Name, Email, Phoneno} = req.body
    const sqlSearch = "SELECT * FROM user WHERE Email = ?"
    const search_query = mysql.format(sqlSearch, [Email])
    const sqlInsert = "insert into user value(?, ?, ?, ?)"
    const insert_query = mysql.format(sqlInsert, [UserId, Name, Email, Phoneno])

    const user = pool.query(search_query, async (err, result) => {
        console.log(user,"u");
            pool.query(insert_query, (err, result) => {
            if (err)
                throw (err);
            console.log("--------> Created new User");
            res.send(result);
            res.status(200).send("Created Sucessfully !!!");
        })
        }
    )
})

router.get('/getdata/:id', (req, res) => {

    const userId = req.params.id;
    console.log(userId);
    pool.query('select * from user where UserId = ?', userId, (err, result) => {
        if (err) {
            res.send(err)
            console.log(err);
        }
        else {
            res.send(result)
            console.log(result);
        }
    })
});

router.get('/getdata', (req, res) => {

    pool.query('select * from user ', (err, result) => {
        if (err) {
            res.send(err)
            console.log(err);
        }
        else {
            res.send(result)
            console.log(result);
        }
    })

});

router.get('/getdetails/:id', (req, res) => {

    const details = 'SELECT * FROM user INNER JOIN details ON details.DetailsId = user.UserId WHERE user.UserId = ?;'
    pool.query(details, req.params.id, (err, result) => {
        if (err) {
            res.send(err)
            console.log(err);
        }
        else {
            res.send(result)
            res.json({result})
            console.log(result);
        }
    })

});

module.exports = router;