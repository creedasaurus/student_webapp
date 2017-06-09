let express = require('express');
let bodyParser = require('body-parser');
let nconf = require('nconf');
let router = express.Router();

nconf.argv()
    .env()
    .file({
        file: 's_config.json'
    });


let Pool = require('pg').Pool;
let pool = new Pool({
    user: nconf.get('postgres:user'),
    password: nconf.get('postgres:password'),
    host: 'localhost',
    port: '5433',
    database: 'school',
    max: 10,
    idleTimeoutMillis: 1000
});


pool.on('error', function (e, client) {
    // handles an error from a client here
});

router.get('/students.json');

// - GET :: just one student (specified in URL)
router.get('/students/:id.json', function (req, res) {
    let id = req.params.id;

    console.log(parseInt(id))
    res.set("Connection", "close");
    pool.query('SELECT * FROM student_info WHERE id=$1::int',[id], function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.json(result.rows);      
        }
    });

});

module.exports = router;