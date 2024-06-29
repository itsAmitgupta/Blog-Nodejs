const Blog = require('../Models/blog.model')
const {Router}= require('express')

const router = Router()

//Multer 
const multer  = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('./public/uploads'))
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`
    cb(null, filename)
  }
})

const upload = multer({ storage: storage })




router.get('/Addblog',(req,res)=>{
    res.render('addblog',{
        user:req.user
    })
})

router.post('/',upload.single('coverImage'),async (req,res)=>{
    const {title,body} = req.body;
    const blog = await Blog.create({
        title,
        body,
        createdBy:req.user._id,
        coverImageUrl:`/uploads/${req.file.filename}`
    });
    return res.redirect(`/blog/${blog._id}`)
})

module.exports = router