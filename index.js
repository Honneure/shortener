var express = require ("express");
var app = express();
var path = require("path"); 
var mongoose = require("mongoose");
var Url = require("./url.js");
var base58 = require("./base58");
var url = require("url");

var theUrl = "http://urlshortener-honneure.c9users.io/";
/* function theUrl(req) {
  return url.format({
    protocol: req.protocol,
    hostname: req.hostname,
    pathname: req.originalUrl
  });
} */ 


// var favicon = require('serve-favicon');


var bodyParser = require('body-parser');

/* var index = require('./routes/index');
var users = require('./routes/users'); */


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// catch 404 and forward to error handler


module.exports = app;

mongoose.connect('mongodb://localhost:27017/test'); //pas de données rajoutées dans la DB (data base)

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, 'views/index.html'));
    console.log(theUrl);
});

app.post("/api/shorten", function (req, res) {
    var longUrl = req.body.url;
    var shortUrl = ""; 
    
    Url.findOne({long_url: longUrl}, function(err, doc) {
        if (err) throw err; 
        
        if (doc) {
            
            shortUrl = theUrl + base58.encode(doc._id);
            res.send({'shortUrl': shortUrl});
        }
        
        else {
            
            var newUrl = Url({
                long_url: longUrl
            });
            
            newUrl.save(function(err) {
                if (err) throw err; 
                
                shortUrl = theUrl + base58.encode(newUrl._id);
                
                res.send({'shortUrl': shortUrl}); 
            });
        }
    });
});


app.get("/:encoded_id", function (req, res) {
    var base58Id = req.params.encoded_id;
    var id = base58.decode(base58Id);
    
    // check if url already exists in database 
    Url.findOne({_id: id}, function (err, doc) {
        if (err) throw err; 
        if (doc) {
            // found an entry on the Data Base, redirect the user to their destination 
            res.redirect(doc.long_url);
        }
        else{
            // nothing found, let's take them home 
            res.redirect(theUrl);
        }
    });
    
});


app.listen(process.env.PORT || 5000, function () {
    console.log("Server is running yeaaaah!");

});
