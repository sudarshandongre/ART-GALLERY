import React, {useEffect, useState} from "react";
import "./Profile.css";

export default function Profile() {
  const [pic, setPic] = useState([])
  useEffect( () => {
    fetch("http://localhost:5000/myposts", {
      headers:{
        Authorization: "Bearer "+ localStorage.getItem('jwt')
      }
    })
    .then(res => res.json())
    .then((result) => {
      setPic(result)
    })
  }, [])
  return (
    <div className="profile">
      {/* profile frame */}
      <div className="profile-frame">
        {/* profile img */}
        <div className="profile-pic">
          <img
            src="https://eonlineartgallery.com/admin/public/uploads/art/1231-Paresh-Maity.jpg"
            alt=""
          />
        </div>
        <div className="profile-data">
          <h1>My Posts</h1>
          <div className="profile-info" style={{ display: "flex" }}>
            <p>35 posts</p>
            <p>50 followers</p>
            <p>80 following</p>
          </div>
        </div>
      </div>
      <hr style={{width: "90%", margin: " 25px auto", opacity: "0.8"}}/>
      {/* gallery */}
      <div className="gallery">
          {pic.map((pic) => {
              return <img key={pic._id} src={pic.photo} className="item"></img>;
          })}
      </div>
    </div>
  );
}