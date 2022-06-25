import axios from 'axios';
import React, { useState } from 'react'

export const Textarea = ({getdata}) => {
    const [comment, setComment] = useState("");
    const userDetails=JSON.parse(localStorage.getItem("login_details"))
    const handleClick = () => {
        //console.log(userDetails.accessToken);
        let body = {
          username: userDetails.username,
          user_id : userDetails._id,
          comment: comment,
          date: new Date(Date.now()).toLocaleString(),
        };
        axios
          .post("https://getupforchange-noticeboard.herokuapp.com/notice", body, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-type": "Application/json",
              Authorization: `Bearer ${
                userDetails.accessToken
              }`,
            },
          })
          .then((res) => {
            getdata();
            setComment("")
          })
          .catch((err) => {
            console.log(err.message);
          });
      };
  return (
    <div className="col-md-4 m-5">
         <div >
            <textarea
              onChange={(e) => setComment(e.target.value)}
              name="text"
              cols="45"
              rows="7"
              value={comment}
              maxLength="100"
              placeholder="Enter Text Here"
            ></textarea>
            {`${comment.length}/100`}
            <br />
            <button className="btn btn-info" onClick={() => handleClick()}>
              Submit
            </button>
          </div>
    </div>
  )
}
