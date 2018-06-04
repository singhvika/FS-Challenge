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
 console.log(finalFileName);
 var outstream = new stream;
 outstream.readable = true;
 outstream.writable = true;

 for(let i=0;i<fileNames.length; i++)
 {
   let instream = fs.createReadStream(fileNames[i]);
   var rl = readline.createInterface({
   input: instream,
   output: outstream,
   terminal: false



 });


 rl.on('line', (line)=>{
   let lineString = line.toString();
   line = line.replace(/\$/g,'');
   if (line.length!==0)
   {
     fs.appendFile(finalFileName,line+os.EOL, (err)=>{
       if (err)
       console.log(err);
       console.log(line);
     })
   }
 });

}
}


module.exports = {
  writeToFile,
  buildFinalFile

}
