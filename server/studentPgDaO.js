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
    host: nconf.get('postgres:host'),
    port: nconf.get('postgres:port'),
    database: nconf.get('postgres:database'),
    max: 10,
    idleTimeoutMillis: 1000
});


pool.on('error', function (e, client) {
    // handles an error from a client here
});

router.get('/students.json', function (req, res) {
        let ids = [];
        res.set("Connection", "close");
        pool.query('SELECT id FROM s_info WHERE active = true', [], function (error, results, fields) {
            if (error) {
                console.log("Error: " + error);
            } else {
                ids = results.rows.map(function (r) { return r.id });
                console.log(ids);
                res.status(200).json(ids);
            }
        });
});

// - GET :: just one student (specified in URL)
router.get('/students/:id.json', function (req, res) {
    let id = req.params.id;

    console.log(parseInt(id))
    res.set("Connection", "close");
    pool.query('SELECT * FROM s_info WHERE id=$1::int',[id], function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.json(result.rows);      
        }
    });

});

module.exports = router;