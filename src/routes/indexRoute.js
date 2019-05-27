const express = require ('express');

const indexRouter = express.Router();
const session = require('express-session');
indexRouter.use(session({secret:'loginsession'}));


indexRouter.route('/').get((req,res)=>{
    req.session.destroy();
    res.render('index');
})
indexRouter.route('/about').get((req,res)=>{
    res.render('about');
})
indexRouter.route('/blog').get((req,res)=>{
    res.render('blog');
})
indexRouter.route('/contact').get((req,res)=>{
    res.render('contact');
})
indexRouter.route('/listings-single').get((req,res)=>{
    res.render('listings-single');
})
indexRouter.route('/listings').get((req,res)=>{
    res.render('listings');
})
indexRouter.route('/login').get((req,res)=>{
    req.session.login = true;
    res.render('login',{loginMessage:''});
})
indexRouter.route('/register').get((req,res)=>{
    res.render('register',{registerMessage:''});
})
indexRouter.route('/admin').get((req,res)=>{
    if (req.session.login === true) {
        res.render('admin'); 
    }else{
        res.redirect('login'); 
    }
    
});

module.exports = indexRouter;