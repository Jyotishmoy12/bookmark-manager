import React, {useEffect, useState} from 'react'
import axios from 'axios'

const BookmarkList = () => {
    const [bookmarks, setBookmarks]=useState([])
    useEffect(()=>{
        fetchBookmarks()
    },[])
    

    const fetchBookmarks=async()=>{
        try {
          const response=await axios.get('http://localhost:5000/api/bookmarks')
          setBookmarks(response.data)
        } catch (error) {
          console.log('Error fetching bookmarks:', error)
        }
    }

    const deleteBookmark=async()=>{
      try {
        await axios.delete(`http://localhost:5000/api/bookmarks/${id}`)
        fetchBookmarks()
      } catch (error) {
        console.error('Error deleting bookmarks:', error)
      }
    }



    return (
      <div>
        <h2>Bookmarks</h2>
        <ul>
          {bookmarks.map((bookmark) => (
            <li key={bookmark._id}>
              <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
                {bookmark.title}
              </a>
              <p>{bookmark.description}</p>
              <button onClick={() => deleteBookmark(bookmark._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default BookmarkList;