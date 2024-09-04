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

router.post('/', async (req, res) => {
  console.log('Received POST request to /api/bookmarks');
  console.log('Request body:', JSON.stringify(req.body, null, 2));
  console.log('Request headers:', JSON.stringify(req.headers, null, 2));
  
  const { title, url, description, tags, source, userId } = req.body;

  console.log('Extracted fields:', { title, url, description, tags, source, userId });

  // Detailed validation
  const missingFields = [];
  if (!title) missingFields.push('title');
  if (!url) missingFields.push('url');
  if (!userId) missingFields.push('userId');

  if (missingFields.length > 0) {
      console.log('Validation failed. Missing fields:', missingFields);
      return res.status(400).json({ 
          message: 'Title, URL, and userId are required',
          missingFields: missingFields
      });
  }

  const bookmark = new Bookmark({
      title,
      url,
      description,
      tags,
      source,
      userId,
  })

  try {
      console.log('Attempting to save bookmark:', bookmark);
      const newBookmark = await bookmark.save()
      console.log('Bookmark saved successfully:', newBookmark);
      res.status(201).json(newBookmark)
  } catch (error) {
      console.error('Error saving bookmark:', error);
      res.status(400).json({ message: error.message, details: error })
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