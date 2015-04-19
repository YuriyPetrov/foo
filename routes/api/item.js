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

/**GET id */
router.get('/:id([0-9]+)', function(req, res, next) {
        connection.query('SELECT b.id, b.count, b.medium_description, a.name, a.decription FROM flexmix.item as a, flexmix.item2 as b where a.id=b.id_item and a.id=?',req.params.id, function(err, rows, fields) {
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
    connection.query('SELECT b.id, b.count, b.medium_description, a.name, a.decription FROM flexmix.item as a, flexmix.item2 as b where a.id=b.id_item and a.id= ?',req.params.id, function(err, rows, fields) {
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
    var input = JSON.parse(JSON.stringify(req.body));
    var data = {
        name               : input.name,
        decription         : input.decription,
        medium_description : input.medium_description,
        count              : input.count
    };
    console.log("fields :",data.name,data.decription,data.medium_description,data.count);
    connection.query('select flexmix.inserting(?,?,?,?)',[data.name,data.decription,data.medium_description,data.count], function(err, rows){
        if  (!err){
            console.log('Inserted ID:', rows);
        res.send({ status: 'OK'})
    }
    else{
        console.log(err);
    }
    })
});

/**Delete item*/
router.delete('/:id', function(req, res, next) {
    connection.query('DELETE FROM flexmix.item2 WHERE id_item=?',req.params.id, function(err, recordId){
    if (!err) {
        connection.query('DELETE FROM flexmix.item WHERE id=?',req.params.id, function(err, recordId){})
        res.send({ status: 'OK'})
        console.log('Record deleted id:',recordId);
    }
        else {
        console.log(err);
    }
    })
});

module.exports = router;