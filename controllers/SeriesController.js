const { db } = require('../config/conection');
const randomstring = require("randomstring");
const today = new Date();
const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
const dateTime = date+' '+time;

// Create Series
function createSeries(req, res){
    const id_movie = req.params.id_movie;

    const id_series = randomstring.generate(25);
    const episode = req.body.episode,
        link_series = req.body.link_series;

    const sqlQuery = "INSERT INTO `list_series`(`id_series`, `id_movie`, `episode`, `link_series`) VALUES (?, ?, ?, ?)";
    
    db.query(sqlQuery, [id_series, id_movie, episode, link_series], (err, result) => {
        if(err){
            console.log(err);
        } else{
            // res.send(result)
            res.json({
                status: 200,
                message: 'success create Series',
                data: result
            })
        }
    })
}

// update series
function updateSeries(req, res){
    const id_series = req.params.id_series;
    const episode = req.body.episode,
        link_series = req.body.link_series;

    const sqlQuery = "UPDATE `list_series` SET `episode`=?, `link_series`=?, `updateAt`=? WHERE `id_series`=?";

    db.query(sqlQuery, [episode, link_series, dateTime, id_series], (err, result) => {
        if(err){
            console.log(err);
        } else{
            // res.send(result)
            res.json({
                status: 200,
                message: 'success update Series',
                data: result
            })
        }
    })
}
// get series by movie
function getSeriesByMovie(req, res){
    const id_movie = req.params.id_movie;
    const sqlQuery = "SELECT * FROM `list_series` WHERE `id_movie` = ?";
    db.query(sqlQuery, [id_movie], (err, result) => {
        if(err){
            console.log(err);
        } else{
            // res.send(result)
            res.json({
                status: 200,
                message: 'success get Series',
                data: result
            })
        }
    })
}

// get series by episode
function getSeriesByEpisode(req, res){
    const id_series = req.params.id_series;
    const sqlQuery = "SELECT * FROM `list_series` WHERE `id_series` = ?";
    db.query(sqlQuery, [id_series], (err, result) => {
        if(err){
            console.log(err);
        } else{
            // res.send(result)
            res.json({
                status: 200,
                message: 'success get Series',
                data: result
            })
        }
    })
}

//delete series
function deleteSeries(req, res){
    const id_series = req.params.id_series;

    const sqlQuery = "DELETE FROM `list_series` WHERE id_series = ?"
    db.query(sqlQuery, id_series, (err, result) => {
        if(err){
            console.log(err);
        } else{
            res.json({
                status: 200,
                message: 'success delete Series',
                data: result
            })
        }
    })
}

module.exports = {
    createSeries,
    getSeriesByMovie,
    getSeriesByEpisode,
    updateSeries,
    deleteSeries
}