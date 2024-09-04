import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const BookmarkForm = () => {
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState('')
    const [source, setSource] = useState('browser')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { user } = useAuth()

    const handleSubmit = async (e) => {
      e.preventDefault()
      setError('')

      const bookmarkData = {
          title,
          url,
          description,
          tags: tags.split(',').map(tag => tag.trim()),
          source,
          userId: user?.id
      };

      console.log('Attempting to submit bookmark with data:', bookmarkData);

      if (!bookmarkData.title || !bookmarkData.url || !bookmarkData.userId) {
          setError('Title, URL, and user authentication are required');
          console.log('Validation failed:', { title: !bookmarkData.title, url: !bookmarkData.url, userId: !bookmarkData.userId });
          return;
      }

      const config = {
          headers: { Authorization: `Bearer ${user?.token}` }
      };

      try {
          console.log('Sending request to:', 'http://localhost:5000/api/bookmarks');
          console.log('Request config:', config);
          const response = await axios.post('http://localhost:5000/api/bookmarks', bookmarkData, config);
          console.log('Server response:', response.data);
          navigate('/');
      } catch (error) {
          console.error("Error creating bookmark:", error);
          console.log("Error response:", error.response);
          setError(error.response?.data?.message || 'An error occurred while creating the bookmark');
      }
  }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Bookmark</h2>
            {error && <div style={{color: 'red'}}>{error}</div>}
            <div>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
                <label>URL:</label>
                <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} required />
            </div>
            <div>
                <label>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
                <label>Tags (comma-separated):</label>
                <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
            </div>
            <div>
                <label>Source:</label>
                <select value={source} onChange={(e) => setSource(e.target.value)}>
                    <option value="browser">Browser</option>
                    <option value="pinterest">Pinterest</option>
                    <option value="twitter">Twitter</option>
                </select>
            </div>
            <button type="submit">Add Bookmark</button>
        </form>
    );
}

export default BookmarkForm