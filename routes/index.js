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

//read
app.get('/api/list-movie', (req, res) => {
    const getSort = req.query.sort;

    let sqlQuery = '';
    if(getSort == 'asc'){
        sqlQuery = "SELECT * FROM film ORDER BY id ASC";
    }else if(getSort == 'desc'){
        sqlQuery = "SELECT * FROM film ORDER BY id DESC";
    }else{
        sqlQuery = "SELECT * FROM film";
    }
    
    db.query(sqlQuery, (err, result) =>{
        if(err){
            console.log(err);
        } else{
            res.send(result)
        }
    })
});

app.get('/api/list-movie/:slug', (req, res) => {
    const getSlug = req.params.slug;

    const sqlQuery = "SELECT * FROM `film` WHERE slug = ?";
    db.query(sqlQuery, getSlug, (err, result) =>{
        if(err){
            console.log(err);
        } else{
            // res.send(result)
            const sqlQueryTags = "SELECT tags.id,tags.id_film,tags.tags FROM film JOIN tags ON film.id_film = tags.id_film WHERE film.id_film = ?;";
            db.query(sqlQueryTags, result[0].id_film, (err, resultTags) =>{
                
                let result_ = [];
                for(let i = 0; i < result.length; i++){
                    result_.push({
                        id_film: result[i].id_film,
                        title: result[i].title,
                        slug: result[i].slug,
                        description: result[i].description,
                        thumbnail: result[i].thumbnail,
                        link_film: result[i].link_film,
                        rating: result[i].rating,
                        type: result[i].type,
                        tgl_upload: result[i].tgl_upload,
                        tags: resultTags
                    })
                };
                return res.status(200).json(result_)
            })
        }
    })
})

//search
app.get('/api/search-movie/:search', (req, res) => {
    const getKeyword = req.params.search;
    const getSort = req.query.sort;

    const getQuery = getKeyword.split(' ');
    //for looping getQuery
    let getQuery_ = [];
    for(let i = 0; i < getQuery.length; i++){
        getQuery_.push(`title LIKE '%${getQuery[i]}%'`);
    }

    let sqlQuery = '';
    if(getSort == 'asc'){
       sqlQuery = `SELECT * FROM film WHERE ${getQuery_.join(' OR ')} ORDER BY id ASC`;
    } else if(getSort == 'desc'){
        sqlQuery = `SELECT * FROM film WHERE ${getQuery_.join(' OR ')} ORDER BY id DESC`;
    } else{
        sqlQuery = `SELECT * FROM film WHERE ${getQuery_.join(' OR ')}`;
    }

    db.query(sqlQuery, getQuery_, (err, result) =>{
        if(err){
            console.log(err);
        } else{
            res.send(result)
        }
    })
})

//create
app.post('/api/add-movie', (req, res) =>{
    // Slugify config options
    const options = {
        replacement: '-',
        remove: undefined,
        lower: true,
        strict: false,
        locale: 'en',
        trim: true,
    }
    const id_movie = randomstring.generate(25);
    const slug = slugify(req.body.title, options)
    const title = req.body.title,
        description = req.body.description,
        thumbnail = req.body.thumbnail,
        link_movie = req.body.link_movie,
        rating = req.body.rating,
        type = req.body.type,
        tags = req.body.tags;

    const sqlQuery = "INSERT INTO `film`(`id_film`, `title`, `slug`, `description`, `thumbnail`, `link_film`, `rating`, `type`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    
    db.query(sqlQuery, [id_movie ,title, slug, description,thumbnail,link_movie,rating,type], (err, result) => {
        if(err){
            console.log(err);
        } else{
            // res.send(result)
            for(let i = 0; i < tags.length; i++){
                const sqlQueryTags = "INSERT INTO `tags`(`id_film`, `tags`) VALUES (?, ?)";
                db.query(sqlQueryTags, [id_movie, tags[i].tags], (err, resultTags) => {
                    if(err){
                        console.log(err);
                    } else{
                        // console.log(result)
                        res.json({
                            status: 200,
                            message: 'success create movie',
                            data: result
                        })
                    }
                })
            }
        }
    })
})

//update
app.put('/api/update-movie/:id_movie', (req, res) => {
    const id_movie = req.params.id_movie;
    // const id = req.body.id;
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
        link_movie = req.body.link_movie,
        rating = req.body.rating,
        type = req.body.type,
        tags = req.body.tags;
    
    const sqlQuery = "UPDATE `film` SET `title`= ?,`slug`= ?,`description`= ?,`thumbnail`= ?,`link_film`= ?,`rating`= ?,`type`= ? WHERE id_film =?"

    db.query(sqlQuery, [title, slug, description, thumbnail, link_movie, rating, type, id_movie], (err, result) => {
        if(err){
            console.log(err);
        } else{
            // res.send(result)
            res.json({
                status: 200,
                message: 'success update movie',
                data: result
            })
            const sqlQueryTags = "DELETE FROM `tags` WHERE id_film = ?";
            db.query(sqlQueryTags, id_movie, (err, result) => {
                if(err){
                    console.log(err);
                } else{
                    // console.log(result)
                    for(let i = 0; i < tags.length; i++){
                        const sqlQueryTags = "INSERT INTO `tags`(`id_film`, `tags`) VALUES (?, ?)";
                        db.query(sqlQueryTags, [id_movie, tags[i].tags], (err, resultTags) => {
                            if(err){
                                console.log(err);
                            } else{
                                console.log(result)
                            }
                        })
                    }
                }
            })
            // console.log(result)
        }
    })
})

// Delete
app.delete('/api/delete-movie/:id_movie', (req, res) => {
    const id_movie = req.params.id_movie;

    const sqlQuery = "DELETE FROM `film` WHERE id_film = ?"
    db.query(sqlQuery, id_movie, (err, result) => {
        if(err){
            console.log(err);
        } else{
            res.json({
                status: 200,
                message: 'success delete movie',
                data: result
            })

            const sqlQueryTags = "DELETE FROM `tags` WHERE id_film = ?";
            db.query(sqlQueryTags, id_movie, (err, result) => {
                if(err){
                    console.log(err);
                } else{
                    console.log(result)
                }
            })
        }
    })
})

app.listen(3001, () => {
    console.log('server jalan');
});


