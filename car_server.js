var express = require('express');
var app = express();
var basicAuth = require('basic-auth');



var auth = function (req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
  };
  var user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };

  if (user.name === 'foo' && user.pass === 'bar') {
    return next();
  } else {
    return unauthorized(res);
  };
};


app.use(auth);

var car_request = null;

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/car_api',function(req,res){
  if(car_request != null){
	res.send(car_request);
	car_request=null;
   }
   else{
	res.send("{}");
   }
});

app.get('/set_start_car',function(req,res){
   car_request = "start";
   res.send('ok starting car');
});
app.get('/lock_car', function(req,res){
   car_request = "lock";
   res.send('ok locking car');
});
app.get('/unlock_car', function(req,res){
   car_request = "unlock";
   res.send('ok unlocking car');
});

app.get('/roll_down_windows', function(req,res){
   car_request = "windows";
   res.send('ok rolling down windows');
});

app.listen(3000, function () {
  console.log('listening on port 3000!');
});
