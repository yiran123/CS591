/**
 * Created by yiranpan on 6/12/17.
 */
const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connection successful.')
});

const Schema = mongoose.Schema
const strSchema = new Schema({
    string: String,
    length: Number
});
const strings = mongoose.model('string', strSchema)

// 1. GET: When passing a string on the query (i.e. http://localhost:3000/hw2/
// longstring), first look in the database to see if the string is already present.
//     If it is, return the string and its length as read from the database. If it isn’t,
//     compute the length, store the string and its length in the database, and
// return both to the client.


router.get('/:nstring', function (req, res, next) {
    strings.find({string: req.params.nstring}, function (err, results) {
        if (Object.keys(results).length == 0) {

            console.log("New String: ", req.params.nstring);
            let str = req.params.nstring;
            let len = str.length;
            const newString = new strings({
                string: str,
                length: len
            });
            newString.save(function(err) {
                if (err) {res.send(err)}
                else {res.json({"string": str, "length": len});
                }
            })
        }
        else {
            console.log("String found");
            res.json({string: results[0].string, length: results[0].length})
        }

    })
});

//GET Fetch all strings
router.get('/', function (req, res, next) {
    strings.find({}, function (err, results) {
        res.json(results);
    })
});

// 3. POST: Similar to the GET, when passed a string, first look in the database
// to see if the string is already present. If it is, return the string and its length
// as read from the database. If it isn’t, compute the length, store the string
// and its length in the database, and return both to the client. If no string is
// passed, return a message in JSON format prompting the user to provide a
// string.

router.post('/', function(req, res, next) {

    // The request body has a valid string field
    if(req.body.string){

        strings.find({string: req.body.string}, function (err, results) {


            if(Object.keys(results).length == 0){

                console.log("New string:", req.body.string);

                let str = req.body.string;
                let len = str.length;
                const newString = new strings({
                    string: str,
                    length: len
                });

                newString.save(function(err) {
                    if (err) {res.send(err)}

                    else {
                        res.json({string: str, length: len});
                    }
                })
            }
            else{
                console.log("String", results[0].string, "found");
                res.json({"string": results[0].string, length: results[0].length});
            }
        })

    }

    else{
        res.send("Please provide a string")
    }
});

//DELETE Delete the specified string
router.delete('/:_str', function (req, res, next) {
    strings.findOneAndRemove({string: req.params._str}, function (err, doc, results) {
        if(doc === null) {res.json({message: 'String not found'});}
        else {res.json({message: 'String deleted.'});}
    })
});



module.exports = router;