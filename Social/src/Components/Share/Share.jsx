import "./Share.scss";
import Image from "../../Assets/img.png";
import Map from "../../Assets/map.png";
import Friend from "../../Assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { makeRequest } from "../../axios";

const Share = () => {
  const [file,setFile]=useState(null)
  const [desc,setDesc]=useState("")

  const upload = async ()=>{
    try {
      const formData = new FormData();
      formData.append("file",file)
      const res = await makeRequest.post('/upload',formData)
      return res.data
    } catch (err) {
      console.log(err)
    }
  }

  const {currentUser} =useContext(AuthContext)

  const queryClient = useQueryClient()
  const mutation = useMutation((newPost)=>{
    return makeRequest.post('/posts/', newPost)
  },{
    onSuccess: () => {
      queryClient.invalidateQueries(['posts'] )
    }})
  const halndleClick = async(e)=>{
e.preventDefault()
let  imgurl = "";
if(file) imgurl = await upload()
mutation.mutate({desc,img:imgurl})
setDesc("")
setFile(null)
  }
    return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
          <img
            src={"/upload/" +currentUser.profilePic}
            alt=""
          />
          <input type="text" placeholder={`What's on your mind ${currentUser.name}?`} onChange={e=>setDesc(e.target.value)} value={desc}/>
          </div>
          <div className="right">
            {file && <img className="file" alt="" src={URL.createObjectURL(file)}/>}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{display:"none"}} onChange={e=>setFile(e.target.files[0])} />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={halndleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;