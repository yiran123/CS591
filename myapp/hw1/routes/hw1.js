/**
 * Created by yiranpan on 6/5/17.
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/:name', function (req, res, next) {
    let theName = req.params.name
    res.send(JSON.stringify({"string": theName, "length": theName.length}))
});

// router.param('name', function (req, res, next, value) {
//     req.params.name
//     next()
// });

router.post('/', function (req, res, next) {
    // let theName = req.params.name
    // res.send(JSON.stringify({"string": theName, "length": theName.length}))
    let value = req.body.keys
    res.json({"string": value, "length": value.length})
    // res.json(req.body)
});

// router.post('/', function (req, res, next) {
//     let value = req.body.keystring
//     res.json({"string": value, "length": value.length})
// })



module.exports = router;
