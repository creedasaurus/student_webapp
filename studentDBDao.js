/**
 * Created by creedh on 3/16/17.
 */

let mongo = require('mongodb').MongoClient;
let ObjectID = require('mongodb').ObjectID;
const URL = 'mongodb://localhost:27017/students';

// exports.create = function(err, id) {

// }

exports.read = function(err, callbackFunc) {
	mongo.connect(URL, function(err, db) {
		if (err) return callbackFunc(err, null);

		db.collection('s_info').findOne({_id: new ObjectID("58da9401e10ce35240102273")}, {}, function(err, result) {
			if (err) throw err;
			console.log('in read()');
			console.log(result);
			callbackFunc(err, result);
			db.close();
		});

	});
}

/* TEST CODE */
// exports.read('58da9401e10ce35240102273', function(err, task) {
// 	if (err) throw err;
// 	console.log('in callback');
// 	console.log(task);
// });
