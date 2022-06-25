import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/action";
import { Textarea } from "../TextareaBox/Textarea";

export const NoticeBoard = () => {
 
  const dispatch = useDispatch();
  const userDetails=JSON.parse(localStorage.getItem("login_details"))
  const [list, setList] = useState([]);

  const getData = () => {
    axios
      .get("https://getupforchange-noticeboard.herokuapp.com/notice", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "Application/json",
          Authorization: `Bearer ${
            userDetails.accessToken
          }`,
        },
      })
      .then((res) => {
        let x= res.data.sort((a,b)=>Date.parse(b.date)-Date.parse(a.date));
        setList(x);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  useEffect(() => {
    getData();
  }, []);


  const handleDelete = (id) => {
    axios
      .delete(`https://getupforchange-noticeboard.herokuapp.com/notice/${id}`,{
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

  const handleLogout = () => {
    dispatch(logout(null))
  }

  return (
    <>
      <div className="container w-75 d-flex justify-content-between">
        <h2 className="text-success">Notice Board</h2>
        <button className="btn btn-info" onClick={() => handleLogout()}>Logout</button>
      </div>

      <div className="container">
        <div className="row">
         <Textarea getdata={getData} />
          <div className="col-md-5 m-4">
            {list.map((element, i) => {
              return (
                <>
                  <div className="card m-4 p-2" key={i}>
                    <div className="card-title"> <b>{element.username}</b> </div>
                    <p className="card-subtitle mb-2 text-muted">
                      {element.date}
                    </p>
                    <br />
                    <h4 className="card-subtitle mb-2">
                      {element.comment}
                    </h4>
                    <br />
                   
                {element.user_id===userDetails._id &&                    
                    <div className="d-flex">
                      
                        <button className="btn btn-warning w-50 m-2" onClick={(e) => handleDelete(element._id)} >
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
