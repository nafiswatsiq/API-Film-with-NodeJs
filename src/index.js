const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const slugify = require('slugify');
const app = express();
const { db } = require('./model/conection');
const randomstring = require("randomstring");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//read
app.get('/api/list-film', (req, res) => {
    const sqlQuery = "SELECT * FROM film";
    
    db.query(sqlQuery, (err, result) =>{
        if(err){
            console.log(err);
        } else{
            res.send(result)
            console.log(result)
        }
    })
});

// app.get('/api/list-film', (req, res) => {
//     const sqlQuery = "SELECT * FROM `film`";
    
//     db.query(sqlQuery, (err, result) =>{
//         if(err){
//             console.log(err);
//         } else{
//             // res.send(result)
//             let result_ = [];
//             for(let i = 0; i < result.length; i++){
//                 result_.push({
//                     title: result[i].title,
//                     slug: result[i].slug,
//                     description: result[i].description,
//                     thumbnail: result[i].thumbnail,
//                     link_film: result[i].link_film,
//                     rating: result[i].rating,
//                     type: result[i].type,
//                     tgl_upload: result[i].tgl_upload,
//                     // tags: resultTags
//                 })
//             };

//             return res.status(200).json({
//                 status: true,
//                 message: 'List Data Posts',
//                 data: result_,
//             })
//         }
//     })
// });


app.get('/api/list-film/:slug', (req, res) => {
    const getFilm = req.params.slug;

    const sqlQuery = "SELECT * FROM `film` WHERE slug = ?";
    db.query(sqlQuery, getFilm, (err, result) =>{
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
    const id_film = randomstring.generate(25);
    const slug = slugify(req.body.title, options)
    const title = req.body.title,
        description = req.body.description,
        thumbnail = req.body.thumbnail,
        link_film = req.body.link_film,
        rating = req.body.rating,
        type = req.body.type,
        tags = req.body.tags;

    const sqlQuery = "INSERT INTO `film`(`id_film`, `title`, `slug`, `description`, `thumbnail`, `link_film`, `rating`, `type`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    
    db.query(sqlQuery, [id_film ,title, slug, description,thumbnail,link_film,rating,type], (err, result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result)
            console.log(result)
        }
    })

    for(let i = 0; i < tags.length; i++){
        const sqlQueryTags = "INSERT INTO `tags`(`id_film`, `tags`) VALUES (?, ?)";
        db.query(sqlQueryTags, [id_film, tags[i].tags], (err, result) => {
            if(err){
                console.log(err);
            } else{
                // res.send(result)
                console.log(result)
            }
        })
    }
})

//update
app.put('/api/update-film/:id_film', (req, res) => {
    const id_film = req.params.id_film;
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
        link_film = req.body.link_film,
        rating = req.body.rating,
        type = req.body.type,
        tags = req.body.tags;
    
    const sqlQuery = "UPDATE `film` SET `title`= ?,`slug`= ?,`description`= ?,`thumbnail`= ?,`link_film`= ?,`rating`= ?,`type`= ? WHERE id_film =?"

    db.query(sqlQuery, [title, slug, description, thumbnail, link_film, rating, type, id_film], (err, result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result)

            const sqlQueryTags = "DELETE FROM `tags` WHERE id_film = ?";
            db.query(sqlQueryTags, id_film, (err, result) => {
                if(err){
                    console.log(err);
                } else{
                    // console.log(result)
                    for(let i = 0; i < tags.length; i++){
                        const sqlQueryTags = "INSERT INTO `tags`(`id_film`, `tags`) VALUES (?, ?)";
                        db.query(sqlQueryTags, [id_film, tags[i].tags], (err, result) => {
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


