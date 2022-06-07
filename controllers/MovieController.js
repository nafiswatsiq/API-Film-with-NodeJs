const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const slugify = require('slugify');
const app = express();
const { db } = require('../config/conection');
const randomstring = require("randomstring");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

function getAllMovie(req, res){
    const getSort = req.query.sort;

    let sqlQuery = '';
    if(getSort == 'asc'){
        sqlQuery = "SELECT * FROM movie ORDER BY id ASC";
    }else if(getSort == 'desc'){
        sqlQuery = "SELECT * FROM movie ORDER BY id DESC";
    }else{
        sqlQuery = "SELECT * FROM movie";
    }
    
    db.query(sqlQuery, (err, result) =>{
        if(err){
            console.log(err);
        } else{
            res.send(result)
        }
    })
}

function getMovieBySlug(req, res){
    const getSlug = req.params.slug;

    const sqlQuery = "SELECT * FROM `movie` WHERE slug = ?";
    db.query(sqlQuery, getSlug, (err, result) =>{
        if(err){
            console.log(err);
        } else{
            // res.send(result)
            const sqlQueryTags = "SELECT tags.id,tags.id_movie,tags.tags FROM movie JOIN tags ON movie.id_movie = tags.id_movie WHERE movie.id_movie = ?;";
            db.query(sqlQueryTags, result[0].id_movie, (err, resultTags) =>{
                
                let result_ = [];
                for(let i = 0; i < result.length; i++){
                    result_.push({
                        id_movie: result[i].id_movie,
                        title: result[i].title,
                        slug: result[i].slug,
                        description: result[i].description,
                        duration: result[i].duration,
                        thumbnail: result[i].thumbnail,
                        link_movie: result[i].link_movie,
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
}

function getMovieByKeyword(req, res){
    const getKeyword = req.params.keyword;
    const getSort = req.query.sort;

    const getQuery = getKeyword.split(' ');
    //for looping getQuery
    let getQuery_ = [];
    for(let i = 0; i < getQuery.length; i++){
        getQuery_.push(`title LIKE '%${getQuery[i]}%'`);
    }

    let sqlQuery = '';
    if(getSort == 'asc'){
       sqlQuery = `SELECT * FROM movie WHERE ${getQuery_.join(' OR ')} ORDER BY id ASC`;
    } else if(getSort == 'desc'){
        sqlQuery = `SELECT * FROM movie WHERE ${getQuery_.join(' OR ')} ORDER BY id DESC`;
    } else{
        sqlQuery = `SELECT * FROM movie WHERE ${getQuery_.join(' OR ')}`;
    }

    db.query(sqlQuery, getQuery_, (err, result) =>{
        if(err){
            console.log(err);
        } else{
            res.send(result)
        }
    })
}

function createMovie(req, res){
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
        duration = req.body.duration,
        link_movie = req.body.link_movie,
        rating = req.body.rating,
        type = req.body.type,
        tags = req.body.tags;

    const sqlQuery = "INSERT INTO `movie`(`id_movie`, `title`, `slug`, `description`, `duration`, `thumbnail`, `link_movie`, `rating`, `type`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    db.query(sqlQuery, [id_movie ,title, slug, description, duration, thumbnail, link_movie, rating, type], (err, result) => {
        if(err){
            console.log(err);
        } else{
            // res.send(result)
            for(let i = 0; i < tags.length; i++){
                const sqlQueryTags = "INSERT INTO `tags`(`id_movie`, `tags`) VALUES (?, ?)";
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
}

function updateMovie(req, res){
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
        duration = req.body.duration,
        link_movie = req.body.link_movie,
        rating = req.body.rating,
        type = req.body.type,
        tags = req.body.tags;
    
    const sqlQuery = "UPDATE `movie` SET `title`= ?,`slug`= ?,`description`= ?,`duration`= ?,`thumbnail`= ?,`link_movie`= ?,`rating`= ?,`type`= ? WHERE id_movie =?"

    db.query(sqlQuery, [title, slug, description, duration, thumbnail, link_movie, rating, type, id_movie], (err, result) => {
        if(err){
            console.log(err);
        } else{
            // res.send(result)
            res.json({
                status: 200,
                message: 'success update movie',
                data: result
            })
            const sqlQueryTags = "DELETE FROM `tags` WHERE id_movie = ?";
            db.query(sqlQueryTags, id_movie, (err, result) => {
                if(err){
                    console.log(err);
                } else{
                    // console.log(result)
                    for(let i = 0; i < tags.length; i++){
                        const sqlQueryTags = "INSERT INTO `tags`(`id_movie`, `tags`) VALUES (?, ?)";
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
}

function deleteMovie(req, res){
    const id_movie = req.params.id_movie;

    const sqlQuery = "DELETE FROM `movie` WHERE id_movie = ?"
    db.query(sqlQuery, id_movie, (err, result) => {
        if(err){
            console.log(err);
        } else{
            res.json({
                status: 200,
                message: 'success delete movie',
                data: result
            })

            const sqlQueryTags = "DELETE FROM `tags` WHERE id_movie = ?";
            db.query(sqlQueryTags, id_movie, (err, result) => {
                if(err){
                    console.log(err);
                } else{
                    console.log(result)
                }
            })
        }
    })
}

module.exports = {
    getAllMovie,
    getMovieBySlug,
    getMovieByKeyword,
    createMovie,
    updateMovie,
    deleteMovie
}