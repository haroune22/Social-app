import { db}  from '../Connect.js'
import jwt from 'jsonwebtoken'
import moment from 'moment/moment.js';




export const getposts = (req,res)=>{
    const userId = req.query.userId
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not Logged In")

    jwt.verify(token,"secretkey",(err,userInfo)=>{
if(err) return res.status(403).json("Token is Not Valid!")

    const q = userId !== "undefined" ? `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC` 
    :`SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followeRUserId = ? OR p.userId = ?
    ORDER BY p.createdAt DESC`
    db.query(q, userId !== "undefined" ? [userId] : [userInfo.id,userInfo.id],(err,data)=>{
        if(err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
    })
}
export const addpost = (req,res)=>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not Logged In")

    jwt.verify(token,"secretkey",(err,userInfo)=>{
if(err) return res.status(403).json("Token is Not Valid!")

    const q = "INSERT INTO posts (`desc`,`img`,`createdAt`,`userId`) VALUES(?)"
    const Values = [
        req.body.desc,
        req.body.img,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        userInfo.id
    ]
    db.query(q,[Values],(err,data)=>{
        if(err) return res.status(500).json(err)
        return res.status(200).json("post has been created")
    })
    })
}
export const deletepost = (req,res)=>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not Logged In")

    jwt.verify(token,"secretkey",(err,userInfo)=>{
if(err) return res.status(403).json("Token is Not Valid!")

    const q = "DELETE FROM posts WHERE `id`=? AND `userId`=?"
  
    db.query(q,[req.params.id, userInfo.id],(err,data)=>{
        if (err) return res.status(500).json(err);
        if(data.affectedRows > 0 ) return res.status(200).json("Post has been deleted.");
        return res.status(403).json("You can delete only your post")
    })
    })
}
