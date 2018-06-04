const fs = require('fs');
const os = require('os');
const readlineSync = require('readline-sync');
const readline = require('readline');
const stream = require('stream');
const utils = require('./utils.js');
// variables required for program

var inputComplete = false;
var numberOfFiles;
var fileNames = [];
var fileExtension= '';
const fileExtRegex = new RegExp('^.+\..+$');//





  while(!numberOfFiles)
  {
    numberOfFiles =parseInt(readlineSync.question('Enter the numberOfFiles: ')  ) ;

  }
  console.log(typeof(numberOfFiles));
  console.log(`total number of FIles to read: ${numberOfFiles}`);

  for (let i=0; i < numberOfFiles; i++)
  {
    let fileName;

    while (fileName === undefined )
    {
      let temp = readlineSync.question(`Enter Filename for file${i} with .* extension: `);
      console.log(fileExtRegex.test(temp));
      if ( fileExtRegex.test(temp))
      {

          if (fileNames.length==0)
          {
            fileName = temp;
            fileNames.push(fileName);
            utils.writeToFile(fileName);
            fileExtension  = fileName.substring(fileName.lastIndexOf('.'),fileName.length);
          }
          else {
              if ( temp.endsWith(fileExtension) )
              {
                fileName = temp;
                fileNames.push(fileName);
                utils.writeToFile(fileName);


              }
              else {
                console.log('file extensions do not match');
              }
          }

      }


    }
  }






  utils.buildFinalFile(fileNames,fileExtension);


  //now write at once
  //fs.writeFileSync(finalFileName,newFileString);
