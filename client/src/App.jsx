import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import BookmarkList from './components/BookmarkList';
// import BookmarkForm from './components/BookmarkForm';

function App() {
  return (
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
          <Route exact path="/" component={BookmarkList} />
          <Route path="/add" component={BookmarkForm} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;