import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const BookmarkList = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const { user } = useAuth();  // Access the authenticated user

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` }
    };

    try {
      const response = await axios.get('http://localhost:5000/api/bookmarks', config);
      setBookmarks(response.data);
    } catch (error) {
      console.log('Error fetching bookmarks:', error);
    }
  };

  const deleteBookmark = async (id) => {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` }
    };

    try {
      await axios.delete(`http://localhost:5000/api/bookmarks/${id}`, config);
      fetchBookmarks();  // Refresh the bookmarks list
    } catch (error) {
      console.error('Error deleting bookmark:', error);
    }
  };

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
};

export default BookmarkList;
