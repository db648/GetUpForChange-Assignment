import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export const NoticeBoard = () => {
  const [add, setAdd] = useState("");
  const userDetails=JSON.parse(localStorage.getItem("login_details"))
  console.log(userDetails)
  const [list, setList] = useState([]);

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
        getData();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const getData = () => {
    axios
      .get("http://localhost:8000/notice", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "Application/json",
          Authorization: `Bearer ${
            userDetails.accessToken
          }`,
        },
      })
      .then((res) => {
        console.log("data", res);
        let x= res.data.sort((a,b)=>Date.parse(b.date)-Date.parse(a.date));
        console.log(x)
        setList(x);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  useEffect(() => {
    getData();
  }, []);

  const handleEdit = () => {
    axios
      .patch(`http://localhost:8000/notice/${id}`,{
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "Application/json",
          Authorization: `Bearer ${
            userDetails.accessToken
          }`,
        },
      })
      .then((res) => {
        getData();
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  const handleDelete = () => {
    axios
      .delete(`http://localhost:8000/notice/${user_id}`,{
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "Application/json",
          Authorization: `Bearer ${
            userDetails.accessToken
          }`,
        },
      })
      .then((res) => {
        getData();
        console.log("delete",res)
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  return (
    <>
      <div className="container">
      <h2 className="d-flex justify-content-center">Notice Board</h2>
      <button className="btn btn-info">Logout</button>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-4 m-5">
            <textarea
              onChange={(e) => setAdd(e.target.value)}
              name="text"
              cols="45"
              rows="7"
              placeholder="Enter Text Here"
            ></textarea>{" "}
            <br />
            <button className="btn btn-info" onClick={() => handleClick()}>
              Submit
            </button>
          </div>
          <div className="col-md-4 m-5">
            {list.map((element, i) => {
              return (
                <>
                  <div className="card m-2" key={i}>
                    <div className="card-title"> <b>{element.username}</b> </div>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {element.date}
                    </h6>
                    <br />
                    <h6 className="card-subtitle mb-2 text-muted">
                      {element.comment}
                    </h6>

                {element.user_id===userDetails._id && 
                    <div className="d-flex">
                      <button className="btn btn-secondary w-50 m-2" onClick={() => handleEdit()} >
                        edit
                      </button>
                      <button className="btn btn-warning w-50 m-2" onClick={() => handleDelete()} >
                        delete
                      </button>
                    </div>
                    }
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
