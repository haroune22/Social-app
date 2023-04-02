import './Post.scss'
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import Comments from '../Comments/Comments';
import moment from 'moment/moment.js';
import {
  useMutation,
  useQuery, useQueryClient
} from '@tanstack/react-query'
import { makeRequest } from '../../axios';
import { AuthContext } from '../../Context/AuthContext';


const Post = ({post}) => {

  const [commentOpen,setCommentOpen]=useState(false)

  const [menuOpen,setMenuOpen]=useState(false)

  const {currentUser}=useContext(AuthContext)

  const { isLoading, error, data } = useQuery(["likes",post.id],()=>
  makeRequest.get('/likes?postId='+ post.id).then((res)=>{
    return res.data;
  })
);

const queryClient = useQueryClient()
const mutation = useMutation((liked)=>{
  if(liked) return makeRequest.delete('/likes?postId='+ post.id)
   return makeRequest.post('/likes', {postId:post.id})
},{
  onSuccess: () => {
    queryClient.invalidateQueries(['likes'] )
  }})
  const deleteMutation = useMutation(
    (postId) => {
      return makeRequest.delete("/posts/" + postId);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

const handlelike = async()=>{
mutation.mutate(data.includes(currentUser.id))
}
const handledelete = async()=>{
  deleteMutation.mutate(post.id);
}


  return (
    <div className='post'>
      <div className="container">
      <div className="user">
      <div className="userInfo"> 
      <img src={"/upload/"+post.profilePic} alt="" />
       
        <div className="details">
          <Link style={{ textDecoration: "none", color: "inherit" }} to={`/profile/${post.userId}`}>
<span className='name'>
  {post.name}
</span>
          </Link>
<span className='date'>
{moment(post.createdAt).fromNow()}
</span>
        </div>
      </div>
        <MoreHorizIcon onClick={(e)=>setMenuOpen(!menuOpen)}/>
        {menuOpen && post.userId === currentUser.id && (
        <button onClick={handledelete}>
        Delete
        </button>
        )
}
      </div>
      <div className="content">
    <p>{post.desc}</p>
    <img src={"/upload/" + post.img} alt="" />
      </div>
      <div className="info">
      <div className="items">
    {data && data.includes(currentUser.id) ? (<FavoriteOutlinedIcon style={{color:'red'}} onClick={handlelike}/> ) :(<FavoriteBorderOutlinedIcon onClick={handlelike}/>)}
   {data && data.length} Likes
      </div>
      <div className="items" onClick={()=>setCommentOpen(!commentOpen)}>
      <TextsmsOutlinedIcon/>
    Comments
      </div>
      <div className="items">
   <ShareOutlinedIcon/>
   Share
      </div>
      </div>
      {commentOpen && <Comments postId= {post.id}/>}
      </div>
    </div>
  );
};

export default Post