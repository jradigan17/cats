// https://api.thecatapi.com/v1/images/search?breed_ids={breed-id}
// https://api.thecatapi.com/v1/breeds
// Being read with index.js

//----------------------------------------------------------
// Required aspects/files
const request = require('request');
//----------------------------------------------------------


//----------------------------------------------------------
// Fetch function
// fs.writeFile( file, data, options, callback )
const fetchBreedDescription = (breed, callback) => {
  breed = breed.toLowerCase().slice(0, 4);
  const url = "https://api.thecatapi.com/v1/breeds/search?q=" + breed;
  request(url, (error, response, body) => {
    const data = JSON.parse(body);
    if (error) {
      return callback(error, null);
    } else if (!data[0]) {
      return callback('BREED NOT FOUND', null);
    } else {
      return callback(error, data[0]["description"]);
    }
  });
};
//----------------------------------------------------------

module.exports = {fetchBreedDescription};