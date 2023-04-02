import { useContext } from 'react';
import './Stories.scss'
import {AuthContext} from '../../Context/AuthContext'
const Stories = () => {
 //dummydata
  const stories = [
    {
      id: 1,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 2,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 3,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
 
  ];
  const {currentUser }=useContext(AuthContext)
  return (
    <div className='stories'>
      <div className="story">
          <img src={ "/upload/"+currentUser.profilePic} alt="" />
          <span>
            {currentUser.name}
          </span>
          <button>+</button>
        </div>
      {stories.map((story)=>(
        <div className="story">
          <img src={story.img} alt="" />
          <span>
            {story.name}
          </span>
        </div>
      ))}
    </div>
  )
}

export default Stories