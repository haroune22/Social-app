import "./Profile.scss"
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from '../../Components/Posts/Posts'
import {
  useMutation,
  useQuery, useQueryClient
} from '@tanstack/react-query';
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Update from "../../Components/update/update";


const Profile = () => {
  const [openupdate,setOpenupdate]=useState(false)  
  const {currentUser}=useContext(AuthContext)
  const userId = parseInt(useLocation().pathname.split("/")[2])

  const { isLoading, error, data } = useQuery(["user"],async()=>
await  makeRequest.get('/users/find/'+ userId).then((res)=>{
    return res.data;
  })
);
  const { isLoading:rlLoading ,data:relationshipData } = useQuery(["relationship"],async()=>
await  makeRequest.get('/relationships?followedUserId='+ userId).then((res)=>{
    return res.data;
  })
);

const queryClient = useQueryClient()
const mutation = useMutation((following)=>{
  if(following) return makeRequest.delete('/relationships?userId='+ userId)
   return makeRequest.post('/relationships', {userId})
},{
  onSuccess: () => {
    queryClient.invalidateQueries(['relationship'] )
  }})

const handlefollow = ()=>{
mutation.mutate(relationshipData.includes(currentUser.id))
}

  return (
    <div className="profile">
     {isLoading ? "Loading..." : <> <div className="images">
       { data && <img className="cover"  src={"/upload/"+ data.coverPic} alt="" />}
        {data && <img className="profilePic" src={ "/upload/"+ data.profilePic}alt="" />}
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
          <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
    {data &&  <span>{data.name}</span>}
      <div className="info">
        <div className="item">
          <PlaceIcon/>
         { data && <span>{ data.city}</span>}
        </div>
        <div className="item">
          <LanguageIcon/>
          {data && <span>{ data.website}</span>}
        </div>
      </div>
       {rlLoading ?"Loading..." : userId === currentUser.id ?(
        <button onClick={()=>setOpenupdate(true)}>Update</button>
       ):(
       <button onClick={handlefollow}>
        {relationshipData.includes(currentUser.id) ?
        "following" : "Follow"}
       </button>
       )
      }
          </div>
          <div className="right">
<EmailOutlinedIcon/>
<MoreVertIcon/>
          </div>
        </div>
      <Posts userId={userId}/>
      </div> 
      </>
      }
  {openupdate && <Update setOpenupdate={setOpenupdate} user={data}/>}
    </div>
  )
}

export default Profile