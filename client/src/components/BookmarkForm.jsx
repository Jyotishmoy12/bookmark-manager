import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const BookmarkForm = () => {

    const [title, setTitle]=useState('')
    const [url, setUrl] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState('')
    const [source, setSource] = useState('browser')
    const navigate=useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:5000/api/bookmarks', {
                title,
                url,
                description,
                source,
                userId:'60a5f5b5e5c8d21234567890'
            });
            navigate('/')
        } catch (error) {
            console.error("Error creating bookmark", error);
        }
    }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Bookmark</h2>
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