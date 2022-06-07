const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const slugify = require('slugify');
const app = express();
const { db } = require('../model/conection');
const randomstring = require("randomstring");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//get
app.get('/api/get-list-series/:id_film', (req, res) => {
    const getIdFilm = req.params.id_film;
    
    const sqlQuery = "SELECT * FROM `series` WHERE id_film = ?";
    db.query(sqlQuery, getIdFilm, (err, result) =>{
        if(err){
            console.log(err);
        } else{
            res.send(result)
            console.log(result)
        }
    })
});

app.listen(3002, () => {
    console.log('server jalan');
});