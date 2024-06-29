const express = require('express')
const User = require('../Models/user.model')
const router = express.Router();

router.get('/signin',(req,res)=>{
    return res.render("signin");
});
router.get('/signup',(req,res)=>{
    return res.render("signup");
});

router.post('/signin',async (req,res)=>{
    const {email,password} = req.body;
    try {
        // console.log(email,password)
        const token = await User.matchPasswordAndGenerateToken(email , password)
        return res.cookie('token',token).redirect('/');
    } catch (error) {
        return res.render('signin',{
            err:'incorrect Email or password'
        })
        console.log(err)
    }
})

router.post('/signup',async(req,res)=>{
        const{fullName,email,password} = req.body;
        console.log(fullName,email,password);
        await User.create({
            fullName,
            email,
            password
        });
        return res.redirect("/")
});

router.get('/logout',(req,res)=>{
    res.clearCookie("token").redirect("/");
})

module.exports = router;