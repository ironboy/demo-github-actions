// Use the build in mini web server in node - http
const http = require('http');
// Use the built in execSync commando that cat run
// command line/bash commands
const { execSync } = require('child_process');
// Path helps build file paths
const path = require('path');

// Path to db-template
const dbTemplatePath = path.join(__dirname, '../backend', 'database', 'bookshop-template.db');
const dbPath = path.join(__dirname, '../backend', 'database', 'bookshop.db');

// A function that does all necessary git checkout, clean up etc
function checkout() {
  execSync('git pull'); // pull latest changes
  execSync('rm ' + dbPath); // remove the database
  execSync('cp ' + dbTemplatePath + ' ' + dbPath); // copy dbTemplate to db
  execSync('npm run build'); // build the dist folder that will be served
  execSync('pm2 restart main-app'); // restart our main app
  console.log('Pulled, copied db and restarted the server');
}

// Set up a small server that only check out things if know
// the secret hash
const server = http.createServer(function (req, res) {
  res.end('Ok');
  if (req.url === '/AC0071D2F4348364A725AA647A24BB2F05C2D05D7F80A7BBB90C1198E768D752') {
    checkout();
  }
});

// Start up the server
server.listen(9876, () => console.log('Listening on http://localhost:9876'));