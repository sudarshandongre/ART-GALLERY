import React, { useEffect, useState } from "react";
import "./Home.css";
// import post from "../img/Cropped_Image.png";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/signin");
    }

    //fetching user posts
    fetch("http://localhost:5000/allposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="home">
      {/* card */}
      {data.length > 0 ? (
        data.map((posts) => (
          <div className="card" key={posts._id}>
            {/* card header */}
            <div className="card-header">
              <div className="card-pic">
                <img
                  src="https://images.pexels.com/photos/15422042/pexels-photo-15422042/free-photo-of-a-man-with-glasses-and-a-sweater-on.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt=""
                />
              </div>
              <h5>{posts.postedBy.name}</h5>
            </div>
            {/* card-image */}
            <div className="card-image">
              <img src={posts.photo} alt="" />
            </div>
            {/* card content */}
            <div className="card-content">
              <p
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <span class="material-symbols-outlined">favorite</span>2 Like
              </p>
              <p>{posts.body}</p>
            </div>
            {/* add comment */}
            <div className="add-comment">
              <span class="material-symbols-outlined">add_reaction</span>
              <input type="text" placeholder="Add comment" />
              <button className="comment">Add</button>
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
  
}
