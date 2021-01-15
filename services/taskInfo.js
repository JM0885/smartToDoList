require('dotenv').config();

const request = require('request');
const zomatoKey = process.env.ZOMATO_KEY;
const ombdKey = process.env.OMDB_KEY;

//-----------------------------------------------------------------

//fetches tv show information from api
const fetchShow = function(title, cb) {
  const showInfo = {
    method: 'GET',
    url: `http://api.tvmaze.com/singlesearch/shows?q=${title}`
  //:query = user input
  };

  request(showInfo, function(error, response, body) {
    if (error) throw new Error(error);

    cb(body);
  });
};

//-------------------------------------------------------------------

//fetches restaurant information from api
const fetchRestaurant = function(title, cb) {
  const restaurantInfo = {
    method: 'GET',
    url: `https://developers.zomato.com/api/v2.1/locations?query=${title}`,
    headers: {'user-key': zomatoKey}
  };

  request(restaurantInfo, function(error, response, body) {
    if (error) throw new Error(error);

    cb(body);
  });
};

//------------------------------------------------------------------

//fetches books information from api
const fetchBook = function(title, cb) {
  const url = `http://openlibrary.org/search.json?title=${title}`;

  const bookInfo = {
    method:'GET',
    uri: url,
  };

  request(bookInfo, function(error, response, body) {
    if (error) throw new Error(error);

    cb(body);
  });
};

//---------------------------------------------------------------------

//fetches movies information from api
const fetchMovie = function(title, cb) {
  const movieInfo = {
    method: 'GET',
    url: `http://www.omdbapi.com/?t=${title}&apikey=${ombdKey}`
  };

  request(movieInfo, function(error, response, body) {
    if (error) throw new Error(error);

    cb(body);
  });
};

//---------------------------------------------------------------------

//returns rlevant api information based on the category
//based on task title

function fetchTaskInfo(title, category, cb)  {
  console.log(title, category);
  if (category === "1") {
    fetchMovie(title, function(e){
      let result = JSON.parse(e);
      cb({
        img_url: result.Poster,
      });
    });
  };

  if (category === "2") {
    fetchShow(title, function(e){
      let result = JSON.parse(e);
      cb({
        img_url: result.image.medium,
        info_url: result.officialSite
      });
    });
  };

  if (category === "3") {
    fetchBook(title, function(e){
      let result = JSON.parse(e);
      cb({
        author: result.docs[0].author_name[0]
      });
    });
  };

  if (category === "4") {
    fetchRestaurant(title, function(e){
      let result = JSON.parse(e);
      cb({
        resto_title: result.location_suggestions[0].title
      });
    });
  };
};
module.exports = { fetchTaskInfo }
