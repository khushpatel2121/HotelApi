import express from 'express';
import { getRoombyAttribute , createRoom,getRoom} from '../Controllers/Room.js';

const router = express.Router();



router.get("/get", getRoombyAttribute);
router.get('/:id', getRoom);

router.post("/createRoom", createRoom);

export default router;