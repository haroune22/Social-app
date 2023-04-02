import Stories from '../../Components/Stories/Stories'
import './Home.scss'
import Posts from '../../Components/Posts/Posts'
import Shares from '../../Components/Share/Share'

const Home = () => {
  return (
    <div className='home'>
   <Stories/>
  <Shares/>
   <Posts/>
    </div>
  )
}

export default Home