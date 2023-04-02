import  express from  "express"
const Router = express.Router();
import userRoutes from './users.js'
import postsRoutes from './posts.js'
import authRoutes from './auth.js'
import likesRoutes from './likes.js'
import commentsRoutes from './comments.js'
import relationshipsRoutes from  './relationships.js'

Router.use("/users", userRoutes)
Router.use("/posts", postsRoutes)
Router.use("/likes", likesRoutes)
Router.use("/comments",commentsRoutes)
Router.use("/relationships",relationshipsRoutes)
Router.use("/auth", authRoutes)

export default Router