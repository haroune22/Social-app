import { db}  from '../Connect.js'
import jwt from 'jsonwebtoken'


export const getrelationship = (req,res)=>{

    const q = "SELECT followerUserId from relationships WHERE followedUserId = ?"
    db.query(q,[req.query.followedUserId],(err,data)=>{
        if(err) return res.status(500).json(err)
        return res.status(200).json(data.map(relationship=>relationship.followerUserId))
    })
}
export const addrelationship= (req,res)=>{

    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not Logged In")

    jwt.verify(token,"secretkey",(err,userInfo)=>{
if(err) return res.status(403).json("Token is Not Valid!")

    const q = "INSERT INTO relationships (`followerUserId`,`followedUserId`) VALUES (?)"
    const Values = [
        userInfo.id,
        req.body.userId
    ];
    db.query(q,[Values],(err,data)=>{
        if(err) return res.status(500).json(err)
        return res.status(200).json("Following")
    })
    })
}
export const deleterelationship = (req,res)=>{

    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not Logged In")

    jwt.verify(token,"secretkey",(err,userInfo)=>{
if(err) return res.status(403).json("Token is Not Valid!")

    const q = "DELETE FROM relationships WHERE `followerUserId` = ? AND `followedUserId` = ?";
  
    db.query(q,[userInfo.id,req.query.userId],(err,data)=>{
        if(err) return res.status(500).json(err)
        return res.status(200).json("Unfollow")
    });
    });
}