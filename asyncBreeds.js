// asyncBreeds.js
const fs = require('fs');

const breedDetailsFromFile = function(breed, callback) {
  console.log('breedDetailsFromFile: Calling readFile...');
  fs.readFile(`./data/${breed}.txt`, 'utf8', (error, data) => {
    console.log("In readFile's Callback: it has the data.");
    if (error) callback(undefined)
    // ISSUE: Returning from *inner* callback function, not breedDetailsFromFile.
    if (!error) callback(data);
    // console.log("should not show"); //after the function return
  });
  // ISSUE: Attempting to return data out here will also not work.
  //        Currently not returning anything from here, so breedDetailsFromFile function returns undefined.
  // console.log("this should show"); // this is no return of this function
  // return 5; // this would overwrite the "return data"
  // console.log("this should not show either"); //after the function has returned
};

// CHANGE 1: Moved the console.log into a new function:
const printOutCatBreed = breed => {
  console.log('Return Value: ', breed) // => print out details correctly.
};

// we try to get the return value
const bombay = breedDetailsFromFile('Bombayfs', printOutCatBreed);
// console.log('Return Value: ', bombay); // => will NOT print out details, instead we will see undefined!

// console.log(breedDetailsFromFile());
// export the function
module.exports = breedDetailsFromFile;