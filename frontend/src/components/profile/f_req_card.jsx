import React, { useState } from "react";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const FriendReqCard = ({ friend }) => {
  const [accept, setAccept] = useState("Accept");
  console.log(friend);
  const {_id, name, area, district } = friend;
  const sent_friend_req = async() => {
    const token = localStorage.getItem("user_token");
    if (!token) throw new Error("No token found");

    const decodedToken = jwtDecode(token);
    const my_id = decodedToken._id;
    console.log(my_id);

    const body = { my_id: my_id, frnd_id: _id};
    console.log(body)
    try {
        const response = await axios.post("http://localhost:3500/friends/accept_request", body);
        if (
          response.data.isrequested===false
        ) {
            

        }
        setAccept('Accepted')
        

      } catch (error) {
        console.error("Error fetching friends:", error);
        
      }

  }

  return (
    <div style={styles.card}>
      <div style={styles.profilePic}></div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
        }}
      >
        <div>
          <div style={styles.name}>{name}</div>
          <div style={styles.location}>
          <span style={{fontFamily:'cursive', fontSize:'13px'}}>from</span>{area}, {district}
          </div>
        </div>
        <button
          style={{
            backgroundColor: "rgb(96, 83, 70)",
            fontWeight: "bold",
            width: "auto",
            height: "auto",
            paddingLeft: "10px",
            paddingRight: "10px",
            paddingTop: "5px",
            paddingBottom: "5px",
            color: "black",
            fontSize: "11px",
            borderBlock: "2px",
            borderBlockColor: "black",
          }}
          onClick={sent_friend_req}
        >
          {accept}
        </button>
      </div>
    </div>
  );
};

FriendReqCard.propTypes = {
  name: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  district: PropTypes.string.isRequired,
};

const styles = {
  card: {
    display: "flex",
    backgroundColor: "#70655bbe",
    alignItems: "center",
    padding: "10px",
    border: "2px solid black",
    borderRadius: "5px",
    marginBottom: "10px",
  },
  profilePic: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "rgb(142, 134, 134)",
    marginRight: "10px",
  },
  name: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  location: {
    fontSize: "14px",
    color: "ddd",
  },
};

export default FriendReqCard;
