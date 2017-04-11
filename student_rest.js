/**
 * Created by creedh on 3/16/17.
 */

let express = require('express');
let bodyParser = require('body-parser');
let mysql = require('mysql2');
let nconf = require('nconf');
let router = express.Router();
let colors = require('colors');

router.use(bodyParser.json());
nconf.argv()
    .env()
    .file({file:'s_config.json'});

let connection = mysql.createConnection({
    host: 'localhost',
    user: nconf.get('mysql:user'),
    password: nconf.get('mysql:password'),
    database: 'students',
    dateStrings: 'true'
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.code.red);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

let shutdownFunc = () => {
    connection.end(function (err) {
        if (err) {
            console.log('Error closing MySQL' + err.code.red);
        }
        console.log('\nmysql closed');
    });
};


//===================== REST API HANDLING =======================

// CREATE
// - POST
// router.post('/students', function (req, res) {

//     let student = req.body;

//     connection.query(
//          'INSERT INTO s_info (fname, lname, startDate, street, city, state, zip, phone, s_year) VALUES (?,?,?,?,?,?,?,?,?)',
//      [student.fname, student.lname, student.startDate, student.street, student.city, student.state, student.zip, student.phone, student.s_year],
//         function (err, results, field) {
//             if (err) throw err;
//             let newId = "";

//             connection.query('SELECT id FROM s_info ORDER BY id DESC LIMIT 1', function (err, rslts, field) {
//                 newId = rslts[0].id;
//             }).on('end', function () {
//                 res.status(201).json(newId);
//             });
//         });
// });


// READ
// - GET :: just one student (specified in URL)
router.get('/students/:id.json', function (req, res) {
    let id = req.params.id;
    // let fileReceived;
    console.log(id)
    res.set("Connection", "close");
    connection.query('SELECT * FROM s_info WHERE id=?', [id], function (error, results, fields) {
        res.status(200).json(results[0]);
    });
});


// UPDATE
// PUT a student (specified and given data);
// router.put('/students/:id.json', function (req, res) {
//     let id = req.params.id;
//     let updatedStudent = JSON.stringify(req.body, null, '\t');

//     fs.writeFile(`${__dirname}/students/${id}.json`, updatedStudent, 'utf8', function (err) {
//         if (err) console.log(err);
//         res.sendStatus(204);
//     });

// });


// DELETE
// - DELETE
// router.delete('/students/:id.json', function (req, res) {
//     let id = req.params.id;
//     // let indexOfID = jsonFileList.indexOf(id);
//     console.log(id);

//     connection.query('UPDATE s_info SET active=FALSE WHERE id=?', [id], function (err, rslts, flds) {
//         if (err) {
//             res.status(404).sendFile(WEB + '/404Error.html');
//         }

//     }).on('end', function () {
//         res.sendStatus(204);
//     });
// });


// LIST
// - GET
router.get('/students.json', function (req, res) {
    console.log("got to the GET!");
    let ids = [];


    res.set("Connection", "close");


    connection.query('SELECT id FROM s_info WHERE active = true', [], function (error, results, fields) {

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


module.exports = {
    'router': router,
    'shutdownFunc': shutdownFunc
};
