const express = require('express');
const ejs = require('ejs')
const path = require('path')

const app = express();
const PORT = 8000;

app.set('view engine','ejs');
app.set('Views',path.resolve("./Views"));


app.get('/',(req,res)=>{
    res.render('home');
})

app.listen(PORT , ()=>{
    console.log(`server is started and running on http://localhost:${PORT}`);
})