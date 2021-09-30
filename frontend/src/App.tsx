import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { PostAPI } from './api/post.api';
import { CreatePostDTO } from './api/dto/post.dto';

function App() {

  const [posts, setPosts] = useState<CreatePostDTO[]>([])
  useEffect(() => {
    async function fetchAll() {
      const resp = await PostAPI.getAll()
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
