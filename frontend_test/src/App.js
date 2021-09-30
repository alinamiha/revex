import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import { getAll } from './api/post.api';

import './App.css';

function App() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    async function fetchAll() {
      const resp = await getAll()
      setPosts(resp)
    }
    fetchAll()

  }, [])
  return (
    <div className="App">
      <ul>
        {
          posts.map(post => {
            return <li>
              {post.title}
            </li>
          })
        }
      </ul>
    </div>
  );
}

export default App;
