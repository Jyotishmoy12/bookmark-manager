import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BookmarkList from './components/BookmarkList';
import BookmarkForm from './components/BookmarkForm';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/add">Add Bookmark</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<BookmarkList />} />
          <Route path="/add" element={<BookmarkForm />} />
        </Routes>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;