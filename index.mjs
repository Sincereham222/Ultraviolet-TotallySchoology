import Server from 'bare-server-node';
import https from 'https';
import nodeStatic from 'node-static';
import fs from 'fs';

// Load SSL certificate and key
const options = {
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem')
};

const bare = new Server('/bare/', '');
const serve = new nodeStatic.Server('static/');

// Create an HTTPS server
const server = https.createServer(options);

server.on('request', (request, response) => {
    if (bare.route_request(request, response)) return true;
    serve.serve(request, response);
});

server.on('upgrade', (req, socket, head) => {
    if(bare.route_upgrade(req, socket, head)) return;
    socket.end();
});

// Start the server on a specified port (default to 8080 if not defined)
server.listen(process.env.PORT || 8080, () => {
    console.log('HTTPS Server running on port ' + (process.env.PORT || 8080));
});
