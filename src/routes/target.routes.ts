import { Router } from 'express';
import { getTarget, createTarget, deleteTarget } from '../controllers/target.controllers';
import {verifyTokenMiddleware} from '../middleware/jwt.middleware';

const router = Router();

router.get('/',verifyTokenMiddleware, getTarget);
/* router.get('/all', getAllTarget); */
router.post('/',createTarget )
/* router.delete('/',deleteTarget ) */

export default router;