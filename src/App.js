import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import Items from './components/Items';
import Pagination from './components/Pagination';
import AddItem from './components/AddItem';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const postsLength = posts.length;

  useEffect(() => {
    const getPosts = async () => {
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setPosts(response.data);
    }
    
    if (localStorage.getItem('posts') === null || JSON.parse(localStorage.getItem('posts')).length === 0) {
      
      getPosts();
    } 
    else {
      
      setPosts(JSON.parse(localStorage.getItem('posts')))
    }
    
  }, []);

  useEffect(() => {
      localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const handleRemoveItem = (id) => {
    let items = posts.filter(item => item.id !== id);
    setPosts(items);
  }

  const setNewItem = (value, id) => {
    let newPosts = posts.map(item => {
      return item.id === id ? Object.assign({}, item, {title: value}) : item;
    })

    setPosts(newPosts)
  }

  const handleAddItem = (obj) => {
    let idPost = postsLength + 100;
    obj.id = idPost;
    obj.userId = 12;
    let newArr = [...posts, obj]

    setPosts(newArr);
  }
  
  const lastItem = currentPage * ITEMS_PER_PAGE;
  const firstItem = lastItem - ITEMS_PER_PAGE;
  const currentItems = posts.slice(firstItem, lastItem);
  const paginate = pageNumber => setCurrentPage(pageNumber);
  
  return (
    <div className="App">
      <h1 className="main-title">Тестовое задание</h1>
      <AddItem 
        handleAddItem={handleAddItem}
      />
      <Items 
        items={currentItems} 
        handleRemoveItem={handleRemoveItem}
        setNewItem={setNewItem}
      />
      <Pagination 
        ITEMS_PER_PAGE={ITEMS_PER_PAGE}
        totalItems={posts.length}
        paginate={paginate}
      />
    </div>
  );
}

export default App;
