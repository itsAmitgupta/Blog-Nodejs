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
    console.log(email,password)
    const isMatched = await User.matchPassword(email , password)

    return res.redirect('/');
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

module.exports = router;