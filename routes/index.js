const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const movieController = require('../controllers/MovieController');

// Get All Movie
app.get('/api/list-movie', movieController.getAllMovie);
// Get Movie By Slug
app.get('/api/list-movie/:slug', movieController.getMovieBySlug);
// Get Movie Search
app.get('/api/search-movie/:keyword', movieController.getMovieByKeyword);
// create Movie
app.post('/api/add-movie', movieController.createMovie);
// update Movie
app.put('/api/update-movie/:id_movie', movieController.updateMovie);
// delete Movie
app.delete('/api/delete-movie/:id_movie', movieController.deleteMovie);

app.listen(3001, () => {
    console.log('server jalan');
});


