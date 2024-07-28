import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import FriendCard from './friend.jsx'; // Adjust the path accordingly
import { jwtDecode } from 'jwt-decode';

import axios from 'axios';

const FriendsList = () => {
  const [open, setOpen] = useState(false);
  const [friends, setFriends] = useState([]);

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
    <>
      <div className='Navbar'>
        <h1 className='friendsCount'>You have {friends.length} friends</h1>
        <Button type="primary" onClick={showDrawer}>
          Open Friends List
        </Button>
      </div>
      
      <Drawer title="Friends List" onClose={onClose} open={open}>
        <div className='friends'>
          {friends.map((friend, index) => (
            <FriendCard
              key={index}
              friend={friend}
            />
          ))}                
        </div>
      </Drawer>
    </>
  );
};

export default FriendsList;
