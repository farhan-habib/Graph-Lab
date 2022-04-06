const fs = require("fs");
const path = require("path");


//commandline input
//Read the file input from the command line in the form "node index.js <filename>"
const fileName = process.argv[2];

//turn the filename into a filepath
const filePath = path.join(__dirname, fileName);

//get the contents of the file
const fileContents = fs.readFileSync(filePath, "utf8");
