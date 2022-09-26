//----------------------------------------------------------
// Required aspects/files
// Being read with breedFetcherRefactor.js
const { fetchBreedDescription } = require('./breedFetcherRefactor');
//----------------------------------------------------------

//----------------------------------------------------------
// Fetch Breed Description
// index.js
const breedName = process.argv[2];

fetchBreedDescription(breedName, (error, desc) => {
  if (error) {
    console.log('Error fetch details:', error);
  } else {
    console.log(desc);
  }
});