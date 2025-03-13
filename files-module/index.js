const path = require("path");
const fs = require("fs");

// console.log("Directory name:", path.dirname(__filename));
newFileDir = path.join(path.dirname(__filename),"new folder","t1.txt");
if(!fs.existsSync(newFileDir)){
    console.log('creating file:' );
     fs.writeFileSync(newFileDir,"1233444444444");
    console.log("created");
}

// f = newFileDir.slice(0,-6)
f = fs.opendirSync(newFileDir.slice(0,-6));
console.log(f.path)

// f = newFileDir.slice(0,-6)
// console.log(f);

// newDir = path.join(path.dirname(__filename), "new folder");

// if(fs.existsSync(newDir)){
//     console.log("folder exists");
// }else{
//     fs.mkdirS(newDir,(err)=>{
//         if (err) {
//             console.error("Error creating directory:", err);
//         } else {
//             console.log("Directory created successfully");
//         }
//     });
// }




// console.log(`       nchanging directory name:       `);
// res = fs.opendirSync(newDir);
// console.log(res.path)
// console.log("Directory name:", __dirname);



// console.log("File name", path.basename(__filename));

// console.log("file extension", path.extname(__filename));
