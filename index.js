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

let app = express();

app.disable('x-powered-by');
app.use(logger('dev'));
app.use(compression());
app.use(favicon(WEB + '/img/favicon.ico'));
app.use('/api/v1', rest);



//====================== STATIC FILES =======================
app.use(express.static(WEB)); //Website Files
app.use('/student-images', express.static('student-images')); //Student images
app.get('*', function (req, res) {
    res.status(404).sendFile(WEB + '/404Error.html');
});


//====================== START SERVER =======================

let portNum = 3000
let IP = 'localhost'
let server = app.listen(portNum, IP, function(){
    console.log("Server Running on " + portNum);
    console.log(`http://${IP}:${portNum}`)
});



//====================== SHUTDOWN HANDLING =======================
function gracefullShutdown() {
    console.log('\nStarting Shutdown');

    console.log('\nClosing mysql connection');
    connection.end(function (err) {
        console.log('\nmysql closed');
    });

    server.close(function() {
        console.log('\nShutdown Complete');
    });
}

process.on('SIGTERM', function() {
    gracefullShutdown();
});

process.on('SIGINT', function() {
    gracefullShutdown();
})

// SIGKILL (kill -9) can't be caught by any process, including node
// SIGSTP/SIGCONT (stop/continue)
