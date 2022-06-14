const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const movieController = require('../controllers/MovieController');
const seriesController = require('../controllers/SeriesController');
const sendEmail = require('../controllers/SendEmail');

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
// update viewers
app.put('/api/update-viewers/:id_movie', movieController.updateViewers);

// Create Series
app.post('/api/add-series/:id_movie', seriesController.createSeries);
// Update Series
app.put('/api/update-series/:id_series', seriesController.updateSeries);
// Get Series by movie
app.get('/api/list-series/:id_movie', seriesController.getSeriesByMovie);
// get series by episode
app.get('/api/episde-series/:id_series', seriesController.getSeriesByEpisode);
// delete series
app.delete('/api/delete-series/:id_series', seriesController.deleteSeries);

// post send email
app.post('/api/verify-account', sendEmail.verifyEmail);


app.listen(3001, () => {
    console.log('server jalan');
});


