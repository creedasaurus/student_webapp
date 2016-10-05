console.log('Loading Server');
const WEB = __dirname.replace('server', 'web');
const SERV = __dirname + '/server';
const PUB = __dirname.replace('server', 'public');
// __dirname === /home/ubuntu/workspace/students/server

//===================== Get Primary Modules =======================
var express = require('express');
var fs = require('fs');

//===================== Get Middleware Modules =======================
var logger = require('morgan');
var compression = require('compression');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');



//====================== Create EXPRESS App =======================
var app = express();
app.disable('x-powered-by');

// insert middleware
app.use(logger('dev'));
app.use(compression());
app.use(favicon(WEB + '/img/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));




//======================= FILE LIST DATA =======================
console.log("Checking File System");
var jsonFileList = fs.readdirSync(__dirname + '/students').map(fileName => fileName.replace('.json', ''));



//======================= ID CREATION =========================

const ID_LENGTH = 4;

// ~~ leadingZeros
// helps make ID's formated properly
function leadingZeros(number, spaces) {
    var id = `${number}`;
    while (id.length < spaces) {
        id = '0' + id;
    }
    return id;
}

// ~~ createID
// generator function that continues to generate ID's
function* createID() {
    // gets the largest student number from the file-list
    var startingID = Math.max.apply(null, jsonFileList.map(fileName => parseInt(fileName)));
    startingID++;
    while (true) {
        var newID = leadingZeros(startingID++, ID_LENGTH);
        jsonFileList.push(newID);
        yield newID;
    }
}
var getID = createID();




//===================== REST API HANDLING =======================

// CREATE
// - POST
app.post('/api/v1/students', function(req, res) {
    var student = JSON.stringify(req.body, null, '\t');
    var stuID = getID.next().value;
    
    fs.writeFile(`${__dirname}/students/${stuID}.json`, student, 'utf8');
    
    res.status(201).json(stuID);
});



// READ
// - GET :: just one student (specified in URL)
app.get('/api/v1/students/:id.json', function(req, res) {
    var id = req.params.id;
    var fileReceived;
    fs.readFile(`${__dirname}/students/${id}.json`, 'utf8', function(err, file) {
        if (err) console.log("Resource not there");
        
        res.status(200).json(JSON.parse(file));
    });
});



// UPDATE
// PUT a student (specified and given data);
app.put('/api/v1/students/:id.json', function(req, res) {
    var id = req.params.id;
    var updatedStudent = JSON.stringify(req.body, null, '\t');

    fs.writeFile(`${__dirname}/students/${id}.json`, updatedStudent, 'utf8', function(err){
        if (err) console.log(err);
        res.sendStatus(204);
    });

});




// DELETE
// - DELETE
app.delete('/api/v1/students/:id.json', function(req, res) {
    var id = req.params.id;
    var indexOfID = jsonFileList.indexOf(id);

    // If index doesn't exist send 404
    if (indexOfID === -1) {
        res.status(404).sendFile(WEB + '/404Error.html');
    }
    else { // else the ID/file exists, delete it from list and unlink file
        jsonFileList.splice(indexOfID, 1);
        fs.unlink(`${__dirname}/students/${id}.json`);
        res.sendStatus(204);
    }
});





// LIST
// - GET
app.get('/api/v1/students.json', function(req, res) {
    res.status(200).json(jsonFileList);
});

//====================== ^^ END REST API ^^ =======================





//====================== STATIC FILES =======================
app.use(express.static(WEB)); //Website Files
app.use(express.static(PUB)); //public files (images)
app.get('*', function(req, res) {
    res.status(404).sendFile(WEB + '/404Error.html');
});



//====================== START SERVER =======================

var portNum = 8080
var server = app.listen(portNum, process.env.IP, function(){
    console.log("Server Running on " + portNum);

});



//====================== SHUTDOWN HANDLING =======================
function gracefullShutdown() {
    console.log('\nStarting Shutdown');
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



//======================== END SETUP =======================
// SERVER IS A GO!!! 
