// require the dependencies we installed
var express = require('express');
var responseTime = require('response-time')
var redis = require('redis');
var blogs = require('./generated.json')

// create a new redis client and connect to our local redis instance
var client = redis.createClient();

// if an error occurs, print it to the console
client.on('error', function (err) {
    console.log("Error " + err);
});

const app = express();

app.set('port', (process.env.PORT || 5000));
// set up the response-time middleware
app.use(responseTime());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

app.post('/api/signin', ( req, res) => {
    if(req.body){
        if(req.body.username) {
            if(req.body.password) {
                client.get(req.body.username, (err, reply) => {
                    console.log(reply)

                    if(err) {
                        res.json({success: false, message: err })
                    } else {
                        let user = JSON.parse(reply)
                        if(user) {
                            if(user.password === req.body.password) {
                                res.json({ success: true, message: 'ok', user: user })
                            } else {
                                res.json({ success: false, message: 'username or password incorrect'})
                            }
                        } else {
                            res.json({ success: false, message: 'username or password incorrect'})
                        }
                    }
                })
            }
            else {
                res.json({ success: false, message: 'password not found'})
            }
        } else {
            res.json({ success: false, message: 'username not found'}) 
        }
    } else {
        res.json({ success: false, message: 'No data found'})
    }
})

app.post('/api/signup', (req, res) => {

    if(req.body){
        if(req.body.username) {
            if(req.body.email){
                if(req.body.password) {

                    client.get(req.body.username, (err, reply) => {
                        console.log(reply)
                        if(reply) {
                            res.json({ success: false, message: 'username already exist' })
                        } else {
                            client.set(req.body.username, JSON.stringify(req.body), (err, reply) => {
                                if(err) {
                                    res.json({ success: false, message: err })
                                } else {
                                    res.json({ success: true, message: reply })
                                }
                                
                            });
                        }
                    })
                }
                else {
                    res.json({ success: false, message: 'password not found'})
                }
            } else {
                res.json({ success: false, message: 'email not found'})
            }
        } else {
            res.json({ success: false, message: 'username not found'}) 
        }
    } else {
        res.json({ success: false, message: 'No data found'})
    }
})

app.get('/api/blog', (req, res) => {
    res.json({ success: true, message: 'ok', blogs: blogs})
})

app.listen(app.get('port'), function(){
  console.log('Server listening on port: ', app.get('port'));
});