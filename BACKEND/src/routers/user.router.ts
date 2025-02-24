import express from 'express';
import { activateUser, deactivateUser, registerUser, revokeAllprivileges, switchRoleToAdmin, switchRoleToManager } from '../controllers/user.controller';
import { getAllUsers } from '../controllers/user.controller';
import { getUsers } from '../controllers/user.controller';
import { getSingleUser } from '../controllers/user.controller';
import { loginUser } from '../controllers/auth.controller';
import { updateUser } from '../controllers/user.controller';


const user_router = express.Router();

user_router.post('/register', registerUser);
user_router.post('/login', loginUser);
user_router.get('/fetch-all-users', getAllUsers);
user_router.get('/fetchRole-users', getUsers);
user_router.get('/:user_id', getSingleUser);
user_router.put('/:email', updateUser);
user_router.put('/switchManagerRole/:user_id', switchRoleToManager);
user_router.put('/switchAdminRole/:user_id', switchRoleToAdmin);
user_router.put('/revokePrivileges/:user_id', revokeAllprivileges);
user_router.put('/deactivateUser/:user_id', deactivateUser);
user_router.put('/activateUser/:user_id', activateUser);

export default user_router;