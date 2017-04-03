console.log('Loading Server');
const WEB = __dirname + '/web';

//===================== Get Primary Modules =======================
let express = require('express');
let fs = require('fs');

//===================== Get Middleware Modules =======================
let logger = require('morgan');
let compression = require('compression');
let favicon = require('serve-favicon');
let rest = require('./student_rest');
// TESTING v
let otherRest = require('./studentDBDao.js');
// TESTING ^
let colors = require('colors');

let app = express();

app.disable('x-powered-by');
app.use(logger('dev'));
app.use(compression());
app.use(favicon(WEB + '/img/favicon.ico'));
app.use('/api/v1', rest.router);


//====================== STATIC FILES =======================
app.use(express.static(WEB)); //Website Files
app.use('/student-images', express.static('student-images')); //Student images
app.get('*', function (req, res) {
    res.status(404).sendFile(WEB + '/404Error.html');
});

let nconf = require('nconf');
nconf.argv()
    .env()
    .file({file:'s_config.json'});


//====================== START SERVER =======================

let PORT = nconf.get("PORT");
let IP = nconf.get("IP");
let server = app.listen(PORT, IP, function () {
    console.log("Server Running on " + PORT);
    console.log(`http://${IP}:${PORT}`.green.underline)
});


//====================== SHUTDOWN HANDLING =======================
function gracefullShutdown() {
    console.log('\nStarting Shutdown');

    console.log('\nClosing mysql connection');
    rest.shutdownFunc();

    server.close(function (err) {
        if (err) {
            console.log('Error closing: ' + err.code.red);
        }
        console.log('\nShutdown Complete');
    });
}

process.on('SIGTERM', function () {
    gracefullShutdown();
});

process.on('SIGINT', function () {
    gracefullShutdown();
})
