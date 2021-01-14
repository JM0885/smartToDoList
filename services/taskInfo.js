

//pseudo for attaching t api info to 'todo'
// if (todo.id === 1) {
//   api.fetchShow(title/*will be from HTML (container)*/, body => {console.log(body.Title)});
// }; request to API if id === 1



require('dotenv').config();

const request = require('request');
const zomatoKey = process.env.ZOMATO_KEY;
const ombdKey = process.env.OMDB_KEY;

//-----------------------------------------------------------------

//fetches tv show information, STATUS: WORKING!
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

//fetches restaurant information, STATUS:WORKING!
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

//fetches books information, STATUS: WORKING! NEEDS LIMIT
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

//fetches movies information, STATUS: WORKING!
const fetchMovie = function(title, cb) {
  const movieInfo = {
    method: 'GET',
    url: `http://www.omdbapi.com/?t=${title}&apikey=${ombdKey}`
  };
  console.log('before request to movieInfo');
  request(movieInfo, function(error, response, body) {
    if (error) throw new Error(error);

    cb(body);
  });
};

//---------------------------------------------------------------------

//fetchMovie(title, info => {console.log(info)});

//returns api img and url information based on the category
//based on task title


function fetchTaskInfo(title, category, cb)  {
  console.log(title, category);
  if (category === "1") {
    fetchMovie(title, function(e){
      let result = JSON.parse(e);

      cb({
        img_url: result.Poster,
        //info_url: result.URL
      });
    });
  };

  if (category === "2") {
    fetchShow(title, function(e){
      let result = JSON.parse(e);
      cb({
        img_url: result.image.medium});
    });
  };

  //books API being troublesome
  if (category === "3") {
    fetchBook(title, function(e){

      let result = JSON.parse(e);
      console.log(result);

      result.docs[0].author_name.forEach(function(element){
          console.log(element);
      });
    });
  };

  if (category === "4") {
    fetchRestaurant(title, function(e){
      let result = JSON.parse(e);
      console.log(result);
      console.log(result.location_suggestions[0].title);
    });
  };
};
module.exports = { fetchTaskInfo }
