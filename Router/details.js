const express = require("express");
const router = express.Router();
const pool = require("../db")
const mysql = require('mysql')


router.post('/details', async (req, res) => {

    const {DetailsId, Address, AlternetPhoneno, DOB} = req.body

    const sqlSearch = "SELECT * FROM details WHERE detailsId = ?"
    const search_query = mysql.format(sqlSearch, [DetailsId])
    const sqlInsert = "insert into details value(?, ?, ?, ?)"
    const insert_query = mysql.format(sqlInsert, [DetailsId, Address, AlternetPhoneno, DOB])

    const user =  pool.query(search_query, async (err, result) => {
                  console.log(user,"u");
            pool.query(insert_query, (err, result) => {
            if (err)
                throw (err);
            console.log("--------> Created new User");
            console.log(result);
            res.status(200).send("Created Sucessfully !!!");
            
        })
     }
    )
    })

module.exports = router