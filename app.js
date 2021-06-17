const express = require('express');
const session = require('express-session')
const path = require('path');
const app = express();
var mongoose = require('mongoose');
var bodyparser = require('body-parser');

const port = 3000;
//middleware
app.use(session({
    secret: 'Keep it secret'
    , name: 'uniqueSessionID'
    , saveUninitialized: false
}))

//mongodb
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('db connected');
})

var EntrySchema = new mongoose.Schema({
    name: String,
    email: String,
    phonenumber: String,
    password: String
});

var UserSchema = new mongoose.Schema({
    date: String,
    content: String
});

var Entry = mongoose.model('register', EntrySchema);

//pug
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'));

app.use('/static', express.static('static'));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

//requests
app.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.status(200).render('userhome.pug', { success: true, login:req.session.username.replace("@gmail.com","")});
    } else {
        res.status(200).render('home.pug', { success: true, registered:true, login:'Login'});
    }
})

app.get('/mydiary', (req, res) => {
    if (req.session.loggedIn) {
        db.db.listCollections({name:req.session.username.replace("@gmail.com","")}).toArray(function(err, collinfo) {
            // console.log('err -', err);
            // console.log('collinfo -', collinfo.length);
            if(collinfo.length>0){
                var UserEntry = mongoose.model(collinfo[0].name, UserSchema,collinfo[0].name);
                UserEntry.findOne({ date: req.query.date}, function (err, doc) {
                    if(doc != null && doc.content != null){
                        res.status(200).render('mydiary.pug', { date: req.query.date, content: doc.content,login:req.session.username.replace("@gmail.com","") });
                    }else{
                        res.status(200).render('mydiary.pug', { date: req.query.date, content: "",login:req.session.username.replace("@gmail.com","") });
                    }
                });
            }else{
                res.status(200).render('mydiary.pug', { date: req.query.date, content: "",login:req.session.username.replace("@gmail.com","") });
            }
        })

    } else {
        res.status(200).redirect("/");
    }
})

app.post('/save', (req, res) => {
    console.log('save request body -', req.body);
    if (req.session.loggedIn) {
        //TODO:check
        db.db.listCollections({name:req.session.username.replace("@gmail.com","")}).toArray(function(err, collinfo) {
            console.log('save - err -', err);
            console.log('save - collinfo -', collinfo.length);
            if(collinfo.length>0){
                console.log('save - collinfo -', collinfo[0].name);
                var UserEntry = mongoose.model(collinfo[0].name, UserSchema,collinfo[0].name);
                
                UserEntry.findOneAndUpdate({date: req.body.date},req.body,{useFindAndModify: false,upsert: true}, function(err, doc) {
                    if (err) return console.log("save - Error save - ", err);
                });
            }else{
                console.log("save - Collections doesnt exist");
                //console.log("req - ", req);
                console.log("save - new data - ", req.session.username);
                var User = mongoose.model(`${req.session.username.replace("@gmail.com","")}`, UserSchema,`${req.session.username.replace("@gmail.com","")}`);
                var userentry = new User(req.body);
                userentry.save(function (err, entry) {
                    if (err) return console.error(err);
                });
            }

        })
        res.status(200).send("Saved Successfully");
    }else{
        res.status(200).render('home.pug',{success:true, registered:true, login:"Login"});
    }
    //res.status(200).render('userhome.pug',{success:true});
})

app.post('/register', (req, res) => {
    // console.log(`name ${req.body.name}`);
    Entry.find({ email: req.body.email }, function (err, docs) {
        // console.log('Errh ', err);
        // console.log('docs length ', docs.length);
        if (docs.length < 1) {
            console.log('Error if');
            var entry = new Entry(req.body);
            entry.save(function (err, entry) {
                if (err) return console.error(err);
            });
            req.body.loginemail = req.body.email;
            req.body.loginpassword = req.body.password;
            console.log('data saved out');
            res.redirect(307,'/login');
        } else {
            res.status(200).render('home.pug', { success: false, registered:true, login:"Login" });
            //res.status(200).send(alert('User already registered!!'));
        }
    });

})

app.post('/login'
    , bodyparser.urlencoded()
    , (req, res, next) => {
        // console.log("login req body ", req.body);
        Entry.find({ email: req.body.email, password: req.body.password }, function (err, docs) {
            // console.log(`err ${err}`);
            // console.log('docs length ', docs.length);
            if (docs.length == 1) {
                // console.log(`${docs.name}`);
                res.locals.username = req.body.email;
                next()

            } else {
                // res.sendStatus(401)
                res.status(200).render('home.pug', { success: true, registered:false, login:'Login' });
                // res.status(200).send(alert('User already registered!!'));
            }
        });

    }
    , (req, res) => {
        req.session.loggedIn = true;
        req.session.username = res.locals.username;
        // console.log(req.session);
        res.status(200).render('userhome.pug', { success: true, login:req.session.username.replace("@gmail.com","") });
    }
)

app.get('/contactus', (req, res) => {
    console.log("CONTACT US");
    if (req.session.loggedIn) {
        res.status(200).render('contactus.pug', {login:req.session.username.replace("@gmail.com","")});
    } else {
        res.redirect("/");
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy((err) => { })
    res.redirect('/');
    //res.send('Thank you! Visit again')
})

app.listen(port, () => {
    console.log(`Application has started on ${port}`);
})