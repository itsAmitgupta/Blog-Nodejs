const Blog = require('../Models/blog.model')
const {Router}= require('express')

const router = Router()

//Multer 
const multer  = require('multer')
const path = require('path')
const Comment = require('../Models/comment.model')

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

router.get('/:id',async(req,res)=>{
  const id = req.params.id;
    const blog = await Blog.findById(id).populate('createdBy');
    const comments = await Comment.find({blogId:id}).populate('createdBy')
    res.render('blog',{
      user:req.user,
      blog,
      comments
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

//comment
router.post('/comment/:blogId',async(req,res)=>{
  const {content} = req.body;
  const comment =await Comment.create({
    content,
    createdBy:req.user._id,
    blogId:req.params.blogId
  })
  return res.redirect(`/blog/${req.params.blogId}`)
})

module.exports = router