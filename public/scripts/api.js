require('dotenv').config();

const request = require('request');
const testInput = process.argv.slice(2);
const zomatoKey = process.env.ZOMATO_KEY;
const ombdKey = process.env.OMDB_KEY;

//-----------------------------------------------------------------

//fetches tv show information, STATUS: WORKING!
const fetchShow = function(testInput, cb) {
  const showInfo = {
    method: 'GET',
    url: `http://api.tvmaze.com/singlesearch/shows?q=${testInput}`
  //:query = user input
  };

  request(showInfo, function(error, response, body) {
    if (error) throw new Error(error);

    cb(body);
  });
};

//-------------------------------------------------------------------

//fetches restaurant information, STATUS:WORKING!
const fetchRestaurant = function(testInput, cb) {
  const restaurantInfo = {
    method: 'GET',
    url: `https://developers.zomato.com/api/v2.1/locations?query=${testInput}`,
    headers: {'user-key': zomatoKey}
  };
  request(restaurantInfo, function(error, response, body) {
    if (error) throw new Error(error);

    cb(body);
  });
};

//------------------------------------------------------------------

//fetches books information, STATUS: WORKING! NEEDS LIMIT
const fetchBook = function(testInput, cb) {
  const url = `http://openlibrary.org/search.json?q=${testInput}`; // limit!!!

  const bookInfo = {
    method:'GET',
    uri: url,
    limit: 10 // not working?
  };

  request(bookInfo, function(error, response, body) {
    if (error) throw new Error(error);

    cb(body);
  });
};

//---------------------------------------------------------------------

//fetches movies information, STATUS: WORKING!
const fetchMovie = function(testInput, cb) {
  const movieInfo = {
    method: 'GET',
    url: `http://www.omdbapi.com/?t=${testInput}&apikey=${ombdKey}`
  };
  request(movieInfo, function(error, response, body) {
    if (error) throw new Error(error);

    cb(body);
  });
};

//---------------------------------------------------------------------

//test functionality:
//fetchRestaurant(testInput, info => {console.log(info)});

module.exports = {
  fetchShow,
  fetchRestaurant,
  fetchBook,
  fetchMovie
};

