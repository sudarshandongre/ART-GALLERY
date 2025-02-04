import React, { useState, useEffect } from "react";
import "./CreatePost.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const notifyE = (msg) => toast.error(msg);

  const notifyA = (msg) => toast.success(msg);

  // Posting image to cloudinary
  const postDetails = () => {
    console.log(body, image);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "artify");
    data.append("cloud_name", "ppalkar");
    fetch("https://api.cloudinary.com/v1_1/ppalkar/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => console.log(setUrl(data.url)))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    //saving post to mongodb
    if (url) {
      fetch("http://localhost:5000/createPost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            notifyE(data.error);
          } else {
            notifyA("Succesfully Posted.");
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [url]);

  const preview = (event) => {
    let output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src);
    };
  };

  return (
    <div className="create-post">
      {/* header */}
      <div className="post-header">
        <h4 style={{ margin: "3px auto" }}>Create new Post</h4>
        <button id="post-btn" onClick={() => postDetails()}>
          Post
        </button>
      </div>
      <div className="main-div">
        <img
          src="https://cdn-icons-png.flaticon.com/128/9789/9789495.png"
          id="output"
          alt=""
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            preview(e);
            setImage(e.target.files[0]);
          }}
        />
      </div>
      {/* details */}
      <div className="details">
        <div className="card-header">
          <div className="card-pic">
            <img
              src="https://images.pexels.com/photos/15422042/pexels-photo-15422042/free-photo-of-a-man-with-glasses-and-a-sweater-on.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
            />
          </div>
          <h5>Patty</h5>
        </div>
        <textarea
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          type="text"
          placeholder="Add Caption..."
        ></textarea>
      </div>
    </div>
  );
}
