// https://api.thecatapi.com/v1/images/search?breed_ids={breed-id}
// https://api.thecatapi.com/v1/breeds

//----------------------------------------------------------
// Required aspects/files
const fs = require('fs');
const request = require('request');
const {conColor, conLine} = require('../../formatting/globalvar');
const readline = require('readline');
//----------------------------------------------------------


//----------------------------------------------------------
// Create Readline Interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
//----------------------------------------------------------


//----------------------------------------------------------
// Fetch function
// fs.writeFile( file, data, options, callback )
const fetch = (url, path, breed) => {
  breed = breed.toLowerCase().slice(0, 4);
  url = url + breed;
  request(url, (error, response, body) => {
    // Resource URL Checking
    if (response && response.statusCode === 404) {
      return console.log(`${conColor.red} ERROR 404: Resource Not Found${conColor.reset}`);
    } else if (error) {
      return console.log(`${conColor.red} ERROR: URL is Invalid${conColor.reset}`);
    // Error Free - continue with code
    } else {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      const data = JSON.parse(body);
      if (!data[0]) {
        console.log(`${conColor.cyan}Oops - Looks like ${breed} is not found.${conColor.reset}`);
      } else {
        fs.writeFile(path, data, err => {
          if (err) {
            console.error(err);
          } else {
            // file written successfully
            // Read file stats
            fs.stat(path, (err, stats) => {
              if (err) {
                console.log(`File doesn't exist.`);
              } else {
                // console.log(stats);
                console.log(`${conLine.centeredHalfLineDash("[LHL Page Downloader Challenge]", conColor.orange)}`);
                console.log(`${conColor.cyan}${conColor.bright}Congratulations! Downloaded and saved ${stats.size} bytes to ${path}${conColor.reset}`);
                console.log(`${conLine.halfLineDash(conColor.orange)}`);
                console.log(`${conColor.cyan}${data[0]["description"]}${conColor.reset}`);
              }
            });
          }
        });
      }
    }
  });
};
//----------------------------------------------------------


//----------------------------------------------------------
// Does File Exist
const fileExists = (path, callbackPath, callbackFile, breed) => {
  let filePath = path.split("/");
  const file = filePath.pop();
  filePath = filePath.join("/");

  fs.access(filePath, (err) => {
    if (err) {
      callbackPath();
    } else {
      fs.access(file, (err) => {
        let check = false;
        if (err) {
          check = false;
        } else {
          check = true;
        }
        callbackFile(check, breed);
      });
    }
  });
};
//----------------------------------------------------------


//----------------------------------------------------------
// Function callback function to run fetch if valid file path and existing or not existing file
const helper = (check, breed) => {
  if (!check) {
    // File does not exist - Call fetch function http://www.example.edu/ ./index.html
    fetch("https://api.thecatapi.com/v1/breeds/search?q=", process.argv[2], breed);
    rl.close();
  } else {
    rl.question(`${conColor.red}File already exists. Do you wish to overwrite? (yes or no) ${conColor.green}`, (answer) => {
      if (answer === "yes") {
        console.log(`${conColor.reset}`);
        // Overwrite existing file - Call fetch function http://www.example.edu/ ./index.html
        fetch("https://api.thecatapi.com/v1/breeds/search?q=", process.argv[2], breed);
      } else if (answer === "no") {
        console.log(`${conColor.red}Program Ended - No Changes Made${conColor.reset}`);
      } else {
        console.log(`${conColor.red}ERROR: Input Not Recognized${conColor.reset}`);
      }
      rl.close();
    });
  }
};
//----------------------------------------------------------


//----------------------------------------------------------
// Error Invalid File Path
const invalidPath = () => {
  rl.close();
  return console.log(`${conColor.red}ERROR: Invalid File Path${conColor.reset}`);
};
//----------------------------------------------------------


//----------------------------------------------------------
//Error Checking for Command Line Arguments
if (process.argv.slice(2).length < 2) {
  rl.close();
  return console.log(`${conColor.red}ERROR: Incorrect input data \n${conColor.cyan}EXAMPLE: node breedFetcher.js ./catfetch.html Siberian${conColor.reset}`);
} else {
  fileExists(process.argv[2], invalidPath, helper, process.argv[3]);
}
//---------------------------------------------------------
