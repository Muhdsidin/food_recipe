import React, { useState, useEffect } from 'react';
import { FiSearch, FiHome, FiShoppingCart } from 'react-icons/fi';
import { BsBoxArrowInRight } from 'react-icons/bs';
import './Header.css';
import { Link,  useNavigate } from 'react-router-dom'; // Import useHistory for navigation
import axios from 'axios';

function Header() {
  const [cat, setCat] = useState([]);
  const [select, setSelect] = useState('');
  const navigate = useNavigate()

  const FetchCategory = async () => {
    const response = await axios('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    setCat(response.data.meals);
  };

  useEffect(() => {
    FetchCategory();
  }, []);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelect(selectedCategory);
    navigate(`/category/${selectedCategory}`)
    location.reload()
  };

  const data = localStorage.getItem("token")

  const logOut = ()=>{
    localStorage.clear()
    location.reload()
  }

  return (
    <div className="rectangle-12">
      <input id="user-input" type="text" placeholder="Type here to search..." />
      <FiSearch className="icon" style={{ fontSize: '30px', marginLeft: '10px' }} />

      <select id="Category" value={select} onChange={handleCategoryChange}>
        <option disabled>Category</option>
        {cat.map((val) => (
          <option key={val.strCategory} value={val.strCategory} onClick={()=> console.log("l")}>
            {val.strCategory}
          </option>
        ))}
      </select>

      <Link to="/" style={{ color: 'black' }}>
        <FiHome className="icon" style={{ fontSize: '30px', marginLeft: '24px' }} />
      </Link>

      <FiShoppingCart className="icon" style={{ fontSize: '30px', marginLeft: '24px' }} />

     {data? <button className="login-btn" onClick={logOut}>
          LogOut <BsBoxArrowInRight />
      </button>: <button className="login-btn">
        <Link to="/signup">
          Login <BsBoxArrowInRight />
        </Link>
      </button> }
    </div>
  );
}

export default Header;
