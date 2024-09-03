import React, {useEffect, useState} from 'react'
import axios from 'axios'

const BookmarkList = () => {
    const [bookmarks, setBookmarks]=useState([])
    useEffect(()=>{
        fetchBookmarks()
    })
    

    const fetchBookmarks=async(()=>{
        
    })



  return (
    <div>BookmarkList</div>
  )
}

export default BookmarkList