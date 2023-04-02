import './Navbar.scss'
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { DarkmodeContext } from '../../Context/DarkmodeContext';
import { AuthContext } from '../../Context/AuthContext';


const Navbar = () => {

    const {darkmode,toggle}=useContext(DarkmodeContext)
    const {currentUser,Login }=useContext(AuthContext)

  return (
    <div className='navbar'>
        <div className="left">
            <Link style={{textDecoration:"none"}} to={'/'}>
                <span>Haroune Social</span>
            </Link>
            <div className="icon">
                <HomeOutlinedIcon/>
               {darkmode? <WbSunnyOutlinedIcon onClick={toggle}/> : <DarkModeOutlinedIcon onClick={toggle}/>}
                <GridViewOutlinedIcon/>
            </div>
                <div className="search">
                    <SearchOutlinedIcon/>
                    <input type="text" placeholder='Search' />
                </div>
        </div>
        <div className="right">
        <PersonOutlinedIcon/>
        <EmailOutlinedIcon/>
        <NotificationsOutlinedIcon/>
        <div className="user">
            <img src={"/upload/"+currentUser.profilePic} alt="" />
            <Link style={{ textDecoration: "none", color: "inherit" }} to={`/profile/${currentUser.id}`}><span>{currentUser.name}</span></Link>
        </div>
        </div>
    </div>
  )
}

export default Navbar