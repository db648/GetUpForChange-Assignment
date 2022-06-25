import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"

export const NoticeBoard = () => {
    const [add, setAdd] = useState("")
    const [list,setList]=useState([]);
    const user = useSelector((state) => state.authReducer.AuthReducer.loginUser)

    const handleClick = () => {
        console.log(JSON.parse(localStorage.getItem("login_details")).accessToken)
        let body={
            username: JSON.parse(localStorage.getItem("login_details")).username,
            comment:add,
            date:Date.now(),
        }
        axios.post("http://localhost:8000/notice",body,{
            headers: {
                "Access-Control-Allow-Origin" : "*",
                "Content-type": "Application/json",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("login_details")).accessToken}`
                } 
              
        }).then((res) => console.log("notice",res))
        .catch((err) => {
            console.log(err.message)
        })
    }

    useEffect(()=>{
        axios.get("http://localhost:8000/notice",{
            headers: {
                "Access-Control-Allow-Origin" : "*",
                "Content-type": "Application/json",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("login_details")).accessToken}`
            } 
              
        }).then((res) => {
            console.log("data",res)
            setList(res.data);
        })
        .catch((err) => {
            console.log(err.message)
        })
    },[])
    return(
        <>
        <h2 className="d-flex justify-content-center">Notice Board</h2>
            <div className="row">
                <div className="col-md-4 m-5">
                    <textarea onChange={(e) => setAdd(e.target.value)} name="text" cols="45" rows="7" placeholder="Enter Text Here"></textarea> <br />
                    <button className="btn btn-info"  onClick={() => 
                        handleClick()
                    }>Submit</button>
                </div>

                <div className="col-md-4 m-5 w-50">
                    {/* <h2>{user.username}</h2> <br /> */}
                    <p>{Date(Date.now())}</p> <br />
                    <h6>{add}</h6>                    
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-6 m-auto ">
                            {list.map((element,i)=>{
                                return <>
                                <div className="card col-3">
                                    <div className="card-title">{element.comment}</div>
                                    <h6 class="card-subtitle mb-2 text-muted">{element.date}</h6>
                                    <h6 class="card-subtitle mb-2 text-muted">{element.username}</h6>
                                    <div className="d-flex">

                                    <button className="btn btn-secondary w-50 m-2 ">edit</button>
                                    <button className="btn btn-warning w-50 m-2">delete</button>
                                    </div>


                                </div>
                                </>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}