import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import FriendCard from './friend';
import "../home/home_before.css"
import { Button, Drawer } from 'antd';




const Myprofile = () => {
  const [open, setOpen] = useState(false);
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate()

  const showDrawer = async () => {
    const token = localStorage.getItem('user_token');
    if (!token) throw new Error('No token found');

    const decodedToken = jwtDecode(token);
    const my_id = decodedToken._id;
    console.log(my_id);

    const body = { my_id: my_id };
    try {
      const response = await axios.post('http://localhost:3500/friends', body);
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        const friendsList = response.data[0].friends;
        if (Array.isArray(friendsList)) {
          setFriends(friendsList);
        } else {
          console.error('Unexpected friends format:', friendsList);
          setFriends([]);
        }
      } else {
        console.error('Unexpected response format:', response.data);
        setFriends([]);
      }
      setOpen(true);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching friends:', error);
      setFriends([]);
    }
  };

  const onClose = () => {
    setOpen(false);
  };
  



  return (

    <body class="header">
    <header>
    <nav class="nav">
      <div class="logo">My profile</div>
      <div class="menu">
        <a>Home</a>
        <a>Feed</a>
        <a>My library</a>
      </div>
      <div id='buttons'>
      <button >Wishlist</button>
      <button type="primary" onClick={showDrawer}>Friends</button>


      </div>
      <Drawer style={{backgroundColor:'rgb(96, 83, 70)'}} onClose={onClose} open={open} closeIcon={null}>
        <div style={{display: 'flex', gap:'10px'}}>
          <h3>Friends</h3>
        <button>Requests</button>
        <button>Requests</button>
        
          
          
          </div>
        <div className='friends'>
          {friends.map((friend, index) => (
            <FriendCard
              key={index}
              friend={friend}
            />
          ))}                
        </div>
      </Drawer>
    </nav>
    <section class="h-txt">
      <h3 id="h2">About us</h3>
      <h4 id="h3">

      </h4>
      <br />
    </section>
    </header>
    </body> 

  );
}

export default Myprofile;


