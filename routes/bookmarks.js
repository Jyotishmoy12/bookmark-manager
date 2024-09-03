const express=require('express')
const router=express.Router()
const Bookmark=require('../models/Bookmark')



// getting all the bookmarks
router.get('/', async(req, res)=>{
    try {
       const bookmarks=await Bookmark.find(); 
       res.json(bookmarks);
    } catch (error) {
       res.status(500).json({message: error.message}) 
    }
})


router.post('/', async(req, res)=>{
    const bookmark=new Bookmark({
       title: req.body.title,
       url: req.body.url,
       description: req.body.description,
       tags: req.body.tags,
       source:req.body.source,
       userId:req.body.userId,
    })

    try {
        const newBookmark = await bookmark.save()
       res.status(201).json(newBookmark) 
    } catch (error) {
       res.status(400).json({message:error.message}) 
    }
})

// get the specific bookmark

router.get('/:id', getBookmark, async(req, res)=>{
    if(req.body.title!=null){
        res.bookmark.title=req.body.title;
    }
    if (req.body.url != null) {
        res.bookmark.url = req.body.url;
      }
      if (req.body.description != null) {
        res.bookmark.description = req.body.description;
      }
      if (req.body.tags != null) {
        res.bookmark.tags = req.body.tags;
      }
      if (req.body.source != null) {
        res.bookmark.source = req.body.source;
      }
      res.bookmark.updatedAt = Date.now();
      try{
        const updatedBookmark = await res.bookmark.save()
        res.json(updatedBookmark)
      }
      catch(err){
        res.status(400).json({message:err.message})
      }
})

// delete a bookmark

router.delete('/:id', getBookmark, async(req, res)=>{
    try {
        await res.bookmark.remove()
    } catch (error) {
       res.status(500).json({message:error.message}) 
    }
})

async function getBookmark(req, res, next) {
    let bookmark;
    try {
      bookmark = await Bookmark.findById(req.params.id);
      if (bookmark == null) {
        return res.status(404).json({ message: 'Bookmark not found' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  
    res.bookmark = bookmark;
    next();
  }
  
  module.exports = router;