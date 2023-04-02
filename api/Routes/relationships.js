import Express  from "express";
import { getrelationship,deleterelationship,addrelationship} from "../controllers/relationship.js";

const router = Express.Router()


router.get('/',getrelationship)
router.post('/',addrelationship)
router.delete('/',deleterelationship)


export default router;