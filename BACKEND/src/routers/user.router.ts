// routes/user.routes.ts
import express from 'express';
import { 
  activateUser, 
  deactivateUser, 
  registerUser, 
  revokeAllprivileges, 
  switchRoleToAdmin, 
  switchRoleToManager,
  getAllUsers,
  getUsers,
  getSingleUser,
  updateUser 
} from '../controllers/user.controller';
import { loginUser } from '../controllers/auth.controller';
import { verifyToken, restrictTo } from '../middleware/auth.middleware';

const user_router = express.Router();

// Public routes (no authentication required)
user_router.post('/register', registerUser);
user_router.post('/login', loginUser);

// Protected routes (require authentication)
user_router.get('/fetch-all-users',  getAllUsers);

user_router.get('/fetchRole-users',  getUsers);

user_router.get('/:user_id', getSingleUser);

user_router.put('/:email', updateUser);

// Admin-only routes
user_router.patch('/switchManagerRole/:user_id',  switchRoleToManager);

user_router.patch('/switchAdminRole/:user_id', switchRoleToAdmin);

user_router.patch('/revokePrivileges/:user_id', revokeAllprivileges);

user_router.patch('/deactivateUser/:user_id',  deactivateUser);

user_router.patch('/activateUser/:user_id',  activateUser);

export default user_router;