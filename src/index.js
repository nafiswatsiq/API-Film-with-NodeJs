const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const slugify = require('slugify');
const app = express();
const { db } = require('./model/conection');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//read
app.get('/api/list-film', (req, res) => {
    const sqlQuery = "SELECT * FROM `film` WHERE 1";

    db.query(sqlQuery, (err, result) =>{
        if(err){
            console.log(err);
        } else{
            res.send(result)
            console.log(result)
        }
    })
});

app.get('/api/list-film/:slug', (req, res) => {
    const getFilm = req.params.slug;

    const sqlQuery = "SELECT * FROM `film` WHERE slug = ?";
    db.query(sqlQuery, getFilm, (err, result) =>{
        if(err){
            console.log(err);
        } else{
            res.send(result)
            console.log(result)
        }
    })
})

//create
app.post('/api/add-film', (req, res) =>{
    // Slugify config options
    const options = {
        replacement: '-',
        remove: undefined,
        lower: true,
        strict: false,
        locale: 'en',
        trim: true,
    }
    const slug = slugify(req.body.title, options)
    const title = req.body.title,
        description = req.body.description,
        thumbnail = req.body.thumbnail,
        link_film = req.body.link_film,
        rating = req.body.rating,
        id_tags = req.body.id_tags;

    const sqlQuery = "INSERT INTO `film`(`title`, `slug`, `description`, `thumbnail`, `link_film`, `rating`, `id_tags`) VALUES (?, ?, ?, ?, ?, ?, ?)";
    
    db.query(sqlQuery, [title, slug, description,thumbnail,link_film,rating,id_tags], (err, result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result)
            console.log(result)
        }
    })
})

//update
app.put('/api/update-film/:id', (req, res) => {
    const id = req.params.id;
    // const id = req.body.id;
    const slug = slugify(req.body.title)
    const title = req.body.title,
        description = req.body.description,
        thumbnail = req.body.thumbnail,
        link_film = req.body.link_film,
        rating = req.body.rating,
        id_tags = req.body.id_tags;
    
    const sqlQuery = "UPDATE `film` SET `title`= ?,`slug`= ?,`description`= ?,`thumbnail`= ?,`link_film`= ?,`rating`= ?,`id_tags`= ? WHERE id =?"

    db.query(sqlQuery, [title, slug, description, thumbnail, link_film, rating, id_tags, id], (err, result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result)
            console.log(result)
        }
    })
})

// Delete
app.delete('/api/delete-film/:id', (req, res) => {
    const id = req.params.id;

    const sqlQuery = "DELETE FROM `film` WHERE id = ?"
    db.query(sqlQuery, id, (err, result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result)
            console.log(result)
        }
    })
})

app.listen(3001, () => {
    console.log('server jalan');
});


