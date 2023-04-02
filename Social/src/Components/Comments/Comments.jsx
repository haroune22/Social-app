import { useContext, useState } from 'react';
import './Comments.scss'
import {AuthContext} from '../../Context/AuthContext'
import {
  useMutation,
  useQuery, useQueryClient
} from '@tanstack/react-query'
import { makeRequest } from '../../axios';
import moment from 'moment/moment.js';


const Comments = ({ postId }) => {
  const [desc,setDesc]=useState("")
  const{currentUser} = useContext(AuthContext)

    const { isLoading, error, data } = useQuery(["comments"],()=>
    makeRequest.get('/comments?postId='+ postId).then((res)=>{
      return res.data;
    })
    );

    
  const queryClient = useQueryClient()
  const mutation = useMutation((newComment)=>{
    return makeRequest.post('/comments', newComment)
  },{
    onSuccess: () => {
      queryClient.invalidateQueries(['comments'] )
    }})
  const halndleClick = async(e)=>{
e.preventDefault()
mutation.mutate({desc,postId:postId})

setDesc("")
  }


  return (
    <div className='comments'>
        <div className="write">
            <img src={"/upload/"+currentUser.profilePic} alt="" />
            <input type="text"placeholder='Write a Comment' onChange={(e)=>setDesc(e.target.value)} value={desc}/>
            <button onClick={halndleClick}>Send</button>
        </div>
        {isLoading? "Loading...": data.map((comment)=>(
            <div className='comment'>
                <img src={comment.profilePic} alt="" />
            <div className="info">
                <span>
                    {comment.name}
                </span>
                <p>
                    {comment.desc}
                </p>
            </div>
            <span className='date'>
        {moment(comment.createdAt).fromNow()}
               </span>
            </div>
        ))}
    </div>
  )
}

export default Comments