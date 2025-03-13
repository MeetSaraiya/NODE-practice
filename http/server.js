const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req,res)=>{
    res.end("qqqqqqqqqqqq");
})
server.listen(3455,'localhost', () => {
    console.log('Server is running at http://localhost:3455/');
})
// const options = {
//     key: fs.readFileSync(path.join(__dirname, 'key.pem')),
//     cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
// };

// const httpsServer = https.createServer(options,(req,res)=>{
//     res.writeHead(200,{
//         'content-type':'text/plain'
//     });
//     res.end("https server");
// });
// httpPort = 3212;
// httpsServer.listen(httpPort,()=>{
//     console.log(`Server is running at https://localhost:${httpPort}/`);

// })