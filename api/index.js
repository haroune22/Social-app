import  express from 'express'
const app = express()
import apiRoutes from './Routes/index.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import multer from 'multer'



//midelwares
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials",true)
    next()
})
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
}))
app.use(cookieParser())

//multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../social/public/upload')
    },
    filename: function (req, file, cb) {
      
      cb(null,Date.now() + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

app.post("/api/upload",upload.single("file"),(req,res)=>{
    const file = req.file
    res.status(200).json(file.filename)
})


app.use("/api",apiRoutes)

app.listen(8800,()=>{
    console.log("Backend Started")
})