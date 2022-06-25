import axios from 'axios';
import React, { useState } from 'react'

export const Textarea = ({getdata}) => {
    const [add, setAdd] = useState("");
    const userDetails=JSON.parse(localStorage.getItem("login_details"))
    const handleClick = () => {
        console.log(userDetails.accessToken);
        let body = {
          username: userDetails.username,
          user_id : userDetails._id,
          comment: add,
          date: new Date(Date.now()).toLocaleString(),
        };
        axios
          .post("http://localhost:8000/notice", body, {
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
            setAdd("")
          })
          .catch((err) => {
            console.log(err.message);
          });
      };
  return (
    <div className="col-md-4 m-5">
         <div >
            <textarea
              onChange={(e) => setAdd(e.target.value)}
              name="text"
              cols="45"
              rows="7"
              value={add}
                maxLength="100"
              placeholder="Enter Text Here"
            ></textarea>
            {`${add.length}/100`}
            <br />
            <button className="btn btn-info" onClick={() => handleClick()}>
              Submit
            </button>
          </div>
    </div>
  )
}
