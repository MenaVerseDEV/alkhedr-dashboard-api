import { Router } from 'express';
import { register, login, getAllEmployees, deleteUser } from '../controllers/user.controller';
import authorize from '../middlewares/authorize';
import verifyToken from '../middlewares/verifyToken';
const router = Router();
router.post('/register',verifyToken, /* authorize('super-admin'), */ register);
router.get('/employees' ,verifyToken, authorize('super-admin' , 'admin') , getAllEmployees);
router.post('/login', login);
router.delete('/:id',verifyToken, authorize('super-admin'), deleteUser);
export default router;
