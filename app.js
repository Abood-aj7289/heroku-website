const express = require ('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const {MongoClient} = require('mongodb');//it the same when i write it like this const mongoClient = require('mongodb').MongoClient

const dbUlr = 'mongodb+srv://abdulah:3boodjammad1989@cluster0-gmbiw.mongodb.net/test?retryWrites=true';
const dbName = 'Register';

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //body-parser is a middelware when the client send a request he will take the value od the requset from it 
app.use(bodyParser.urlencoded({ extended : false }))


app.use(express.static(path.join(__dirname,'/public')));
app.set('views', path.join(__dirname,'/src/views'));
app.set('view engine','ejs');




const indexRoute = require ('./src/routes/indexRoute');
app.use('/', indexRoute);


const checkUserName = require('./src/modules/checkUserName');
app.post('/register', (req, res) => {
    const email = req.body.email
    const password = req.body.password;
    const repassword = req.body.repassword;
    checkUserName(email,(check)=>{
        if(check){
            if (password === repassword) {
                (async function mongo(){
                    let client ;
                try {
                    client = await MongoClient.connect(dbUlr,{useNewUrlParser : true});
                    const db = client.db(dbName);
                    const col = await db.collection('users');
                    const user = await col.insertOne({username: email , pass: password});
                    res.redirect('/login');
                } catch (error) {
                res.send('error.message');
                }
                client.close();
                }())
                
            }else{
                res.render('register',{registerMessage:"your passwords are not the same"});
            }
        }else{
            res.render('register',{registerMessage:"your email is already in used"});
        }
    })
    
    
});





const checkUser = require('./src/modules/checks');
app.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password;
    
    checkUser(email,password, (check)=>{
        if (check){
            
            res.redirect('/admin');
        }else{
            res.render('login',{loginMessage:'your email or Password is wrong'})
        }
    })
     
});




app.listen(port,()=>{
    console.log(`App listening on port ${port}`)
})