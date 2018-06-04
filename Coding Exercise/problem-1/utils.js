const fs = require('fs');
const os = require('os');
const readlineSync = require('readline-sync');
const readline = require('readline');
const stream = require('stream');


let writeToFile = (fileName) =>
{
 let fileReadComplete = 0;
 let writeLine = '';

 while (fileReadComplete!=3)
 {
   //keep reading line and appending
   let line = readlineSync.question('');
   writeLine = writeLine.concat(line).concat(os.EOL);
   if (line.length === 0)
   {
     fileReadComplete = fileReadComplete+1;
   }
   else {
     fileReadComplete = 0;
   }



 }
//now write all at once.
try{
fs.writeFileSync(fileName, writeLine);
}
catch(err)
{
 console.log(err);
}
}


let getFileNameNoExt = (fn) =>
{
 fn = fn.toLowerCase();
 fn = fn.substring(0,fn.lastIndexOf('.'));
 return fn;
}


let buildFinalFile = (fileNames, fileExtension) => {
 let finalFileName='';
 let newFileString='';
 for (let i=0; i<fileNames.length; i++)
 {
   if (i === 0 )
   {
     let fn = getFileNameNoExt(fileNames[0]);
     finalFileName = finalFileName.concat(fn);

   }
   else {
     let temp = getFileNameNoExt(fileNames[i]);
     temp = temp.replace(temp.charAt(0), temp.charAt(0).toUpperCase())
     finalFileName = finalFileName.concat(temp);
   }
 }
 finalFileName  = finalFileName.concat(fileExtension);
 for(let i=0;i<fileNames.length; i++)
 {
   let instream = fs.createReadStream(fileNames[i]);
   let outstream = new stream;
   outstream.readable = true;
   outstream.writable = true;
   let rl = readline.createInterface({
   input: instream,
   output: outstream,
   terminal: false



 });


 rl.on('line', (line)=>{
   let lineString = line.toString();
   line = line.replace(/\$/g,'');
   if (line.length!==0)
   {
     try{
        fs.appendFileSync(finalFileName,line+os.EOL)
     }
     catch(err){
       console.log(err);
     }

   }
 });


rl.on ('close', ()=>{
  if (i===fileNames.length-1)
  readAndDisplayFile(finalFileName);
});



}
}


let readAndDisplayFile = (fileName) =>
{
  console.log(fileName);
  let outstream = new stream;
  let instream = fs.createReadStream(fileName);
  let rl = readline.createInterface({
    input: instream
  })

  rl.on('line', (line) => {
    let lineString = line.toString();
    console.log(lineString);
  })
}


module.exports = {
  writeToFile,
  buildFinalFile

}
