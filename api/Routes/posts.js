import Express  from "express";
import { getposts , addpost, deletepost} from "../controllers/post.js";

const router = Express.Router()


router.get('/',getposts)
router.post('/',addpost)
router.delete('/:id',deletepost)


export default router;