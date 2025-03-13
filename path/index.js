const path = require('path');

console.log(path.dirname(__filename));
console.log(path.normalize(__filename));

console.log("Directory name:", path.dirname(__filename));

console.log("File name", path.basename(__filename));

console.log("file extension", path.extname(__filename));