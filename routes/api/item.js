var express = require('express');
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'flexmix'
});
var router = express.Router();
connection.connect();

/* GET id */
router.get('/:id([0-9]+)', function(req, res, next) {
        connection.query('SELECT * FROM flexmix.item_a as a where a.id = ?',req.params.id, function(err, rows, fields) {
        if (!err) {
            console.log('The solution is: ', rows);
            res.json(rows);
        }
        else
            console.log('Error while performing Query.');
    });

});

/**Get type*/
router.get('/:id', function(req, res, next) {
    console.log(req.body);
    connection.query('SELECT * FROM flexmix.item_a as a where a.item_name= ?',req.params.id, function(err, rows, fields) {
        if (!err) {
            console.log('The solution is: ', rows);
            res.json(rows);
        }
        else
            console.log('Error while performing Query.');
    });

});

/**Add item*/
router.post('/', function(req, res, next) {
    console.log(req.body);
    connection.query('INSERT INTO flexmix.item_a (item_name) VALUES (?)',req.body.item_name, function(err, recordId){
    if  (!err){
        res.send({ status: 'OK'})
    }
    else{
        console.log(err);
    }
    })
   
});

/**Delete item*/
router.delete('/:id', function(req, res, next) {
    console.log(req.body);
    connection.query('DELETE FROM flexmix.item_a WHERE id=?',req.params.id, function(err, recordId){
    if (!err) {
        res.send({ status: 'OK'})
        console.log('Record deleted id:',recordId);
    }
        else {
        console.log(err);
    }
    })
});

module.exports = router;