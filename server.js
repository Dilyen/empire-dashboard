//Install express server
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname+'/dist/index.html'));
res.cookie("statusUrl", process.env.STATUS_URL);
res.cookie("turntablproject_url", process.env.TURNTABLPROJECT_URL);
res.cookie("addNewProject_url", process.env.ADDNEWPROJECT);
res.cookie("addNewEndpoint_url", process.env.ADDNEWENDPOINT);
res.cookie("statusByCurrentDate_url", process.env.STATUSBYCURRENTDATE_URL);
});


// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080, () => {
    console.log('Server started...');
});
    