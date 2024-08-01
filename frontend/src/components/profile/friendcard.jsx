import React from "react";
import PropTypes from "prop-types";

const FriendCard = ({ friend }) => {
  console.log(friend);
  const { name, area, district } = friend;
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
            from {area}, {district}
          </div>
        </div>

      </div>
    </div>
  );
};

FriendCard.propTypes = {
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

export default FriendCard;
