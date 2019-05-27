const mongoClient = require('mongodb').MongoClient;
const dbUlr = 'mongodb+srv://abdulah:3boodjammad1989@cluster0-gmbiw.mongodb.net/test?retryWrites=true';
const dbName = 'Register';

function checkUser(email , password, done) { 
    (async function mongo(){
        let client ;
    try {
        client = await mongoClient.connect(dbUlr,{useNewUrlParser : true});
        const db = client.db(dbName);
        const col = await db.collection('users');
        const user = await col.findOne({username: email , pass: password});
        client.close();
        if (!user) {
            done(false)
        }else{
            done(true)
        }
    } catch (error) {
        done(false);
        client.close();
    }
    client.close();
    }())
 }
 module.exports = checkUser ;