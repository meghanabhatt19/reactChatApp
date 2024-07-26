import React from "react";
import "./details.css";
import { auth } from "../firebase";
function Details() {
  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }
  return (
    <div className="detail">
      <div className="user">
        <img src="./avatar.png" alt="" />
        <h3>Jane Doe</h3>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>privacy & help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          {/* <div className="title"> */}
            {/* <span>Shared photo</span>
            <img src="./arrowDown.png" alt="" /> */}
            <div className="photos">
              <div className="photoItem">
                <div className="photoDetail">
                  <img
                    src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                    alt=""
                  />
                  <span>photo_2024_2.png</span>
                </div>
                <img src="./download.png" alt="" className="icon"/>
              </div>
              <div className="photoItem">
                <div className="photoDetail">
                  <img
                    src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                    alt=""
                  />
                  <span>photo_2024_2.png</span>
                </div>
                <img src="./download.png" alt="" className="icon"/>
              </div>
              <div className="photoItem">
                <div className="photoDetail">
                  <img
                    src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                    alt=""
                  />
                  <span>photo_2024_2.png</span>
                </div>
                <img src="./download.png" alt="" className="icon"/>
              </div>
              <div className="photoItem">
                <div className="photoDetail">
                  <img
                    src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                    alt=""
                  />
                  <span>photo_2024_2.png</span>
                </div>
                <img src="./download.png" alt="" className="icon"/>
              </div>
            </div>
          {/* </div> */}
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
  
        <button >Block User</button>
        <button className="logOut" onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
}

export default Details;
