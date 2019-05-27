const mongoClient = require('mongodb').MongoClient;
const dbUlr = 'mongodb+srv://abdulah:3boodjammad1989@cluster0-gmbiw.mongodb.net/test?retryWrites=true';
const dbName = 'Register';


function checkUserName(email , done) { 
    (async function mongo(){
        let client ;
    try {
        client = await mongoClient.connect(dbUlr,{useNewUrlParser : true});
        const db = client.db(dbName);
        const col = await db.collection('users');
        const user = await col.findOne({username: email});
        client.close();
     
        if (!user) {
            done(true)
        }else{
            done(false)
        }
    } catch (error) {
        done(false);
        client.close();
    }
    client.close();
    }())
 }


 module.exports = checkUserName ;