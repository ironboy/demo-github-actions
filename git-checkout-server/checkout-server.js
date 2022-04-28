// Use the build in mini web server in node - http
const http = require('http');
// Use the built in execSync commando that cat run
// command line/bash commands
const { execSync } = require('child_process');

// Set up a small server that only check out things if know
// the secret hash
const server = http.createServer(function (req, res) {
  res.end('Ok');
  if (req.url === '/AC0071D2F4348364A725AA647A24BB2F05C2D05D7F80A7BBB90C1198E768D752') {
    // do a git pull
    execSync('git pull');
    console.log('has run git pull');
  }
});

// Start up the server
server.listen(9876, () => console.log('Listening on http://localhost:9876'));