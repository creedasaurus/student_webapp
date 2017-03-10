console.log('Loading Server');
const WEB = __dirname + '/web';
// const SERV = __dirname + '/server';


//===================== Get Primary Modules =======================
let express = require('express');
let fs = require('fs');

//===================== Get Middleware Modules =======================
let logger = require('morgan');
let compression = require('compression');
let favicon = require('serve-favicon');
let bodyParser = require('body-parser');
let mysql = require('mysql2');
let pswds = require('./pswd');


//====================== Create EXPRESS App =======================
let app = express();

app.disable('x-powered-by');
// insert middleware
app.use(logger('dev'));
app.use(compression());
app.use(favicon(WEB + '/img/favicon.ico'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true}));

let connection = mysql.createConnection({
    host: 'localhost',
    user: pswds.mysql.user,
    password: pswds.mysql.password,
    database: 'students',
    dateStrings: 'true'
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});



//===================== REST API HANDLING =======================

// CREATE
// - POST
app.post('/api/v1/students', function(req, res) {
    // let student = JSON.stringify(req.body, null, '\t');
    let student = req.body;
    // console.log(student);
    // console.log(student.fname);
    connection.query('INSERT INTO s_info (fname, lname, startDate, street, city, state, zip, phone, s_year) VALUES (?,?,?,?,?,?,?,?,?)',
        [student.fname, student.lname, student.startDate, student.street, student.city, student.state, student.zip, student.phone, student.s_year],
        function (err, results, field) {
            if (err) throw err;
            let newId = "";

            connection.query('SELECT id FROM s_info ORDER BY id DESC LIMIT 1', function (err, rslts, field) {
                newId = rslts[0].id;
            }).on('end', function () {
                res.status(201).json(newId);
            });
    });
});



// READ
// - GET :: just one student (specified in URL)
app.get('/api/v1/students/:id.json', function(req, res) {
    let id = req.params.id;
    // let fileReceived;
    console.log(id)

    connection.query('SELECT * FROM s_info WHERE id=?', [id], function (error, results, fields) {
        res.status(200).json(results[0]);
    });
});



// UPDATE
// PUT a student (specified and given data);
app.put('/api/v1/students/:id.json', function(req, res) {
    let id = req.params.id;
    let updatedStudent = JSON.stringify(req.body, null, '\t');

    fs.writeFile(`${__dirname}/students/${id}.json`, updatedStudent, 'utf8', function(err){
        if (err) console.log(err);
        res.sendStatus(204);
    });

});




// DELETE
// - DELETE
app.delete('/api/v1/students/:id.json', function(req, res) {
    let id = req.params.id;
    // let indexOfID = jsonFileList.indexOf(id);
    console.log(id);

    connection.query('UPDATE s_info SET active=FALSE WHERE id=?', [id], function(err, rslts, flds) {
        if (err) {
            res.status(404).sendFile(WEB + '/404Error.html');
        }

    }).on('end', function() {
        res.sendStatus(204);
    });
});





// LIST
// - GET
app.get('/api/v1/students.json', function(req, res) {
    let ids = [];
    connection.query('SELECT id FROM s_info WHERE active = true', [],function (error, results, fields) {

        if (error) {
            console.log("Error: " + error);
        } else {
            for (let stu in results) {
                ids.push(results[stu].id);
            }
            console.log(ids);
            res.status(200).json(ids);
        }
    });
});

//====================== ^^ END REST API ^^ =======================


//====================== STATIC FILES =======================
app.use(express.static(WEB)); //Website Files
app.use('/student-images', express.static('student-images')); //Student images
app.get('*', function (req, res) {
    res.status(404).sendFile(WEB + '/404Error.html');
});


//====================== START SERVER =======================

let portNum = 3000
let server = app.listen(portNum, process.env.IP, function(){
    console.log("Server Running on " + portNum);
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
