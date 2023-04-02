import Express  from "express";
import { getUser ,updateUser} from "../controllers/user.js";

const router = Express.Router()


router.get('/find/:userId',getUser)

router.put('/',updateUser)


export default router;