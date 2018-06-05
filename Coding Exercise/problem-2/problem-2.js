const readlineSync = require('readline-sync')


let numberOfStrings;

String.prototype.XyloHack =  function (numberOfStrings) {


  if (numberOfStrings%2===0)
  {
    console.log(this.toLowerCase());
  }
  else {
    console.log(this.toUpperCase());
  }

}


while (!numberOfStrings)
{
  numberOfStrings = parseInt(readlineSync.question('enter the number of Strings to evaluate: '));
}

var stringArray = [];
const inputRegex = new RegExp(/^'.+'\.XyloHack\(\d+\)$/);
const matchRegex = new RegExp(/^'.+'/);
const matchRegex2 = new RegExp(/\(\d*\)$/)

 while (stringArray.length!== numberOfStrings)
 {
  let stringLine = readlineSync.question("Enter Stringin the pattern '*'.XyloHack(n) :");

  // console.log(`stringLine: ${stringLine}`);
  if (inputRegex.test(stringLine))
  {
      stringArray.push(stringLine);

  }
  else {
    console.log('invalid');
  }

  // console.log(stringArray);

 }

 stringArray.forEach(function(text){
   let matchString = matchRegex.exec(text);
   matchRegex.lastIndex = 0;
   matchString = matchString[0];
   matchString = matchString.substring(1,matchString.length-1);
   // console.log(`string: ${matchString} type: ${typeof(matchString)}`);
   let matchNumber = matchRegex2.exec(text);
   matchRegex2.lastIndex = 0;
   matchNumber = matchNumber.toString();
   matchNumber = matchNumber.substring(1,matchNumber.length-1);
   matchNumber = parseInt(matchNumber);
   // console.log(`number: ${matchNumber} type: ${typeof(matchNumber)}`);



   matchString.XyloHack(matchNumber);

 });
