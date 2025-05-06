import { Request, Response } from "express";
import { userService } from "../services/user.service";
import { verifyToken, restrictTo } from "../middleware/auth.middleware";

const userServiceInstance = new userService();

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await userServiceInstance.registerUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await userServiceInstance.fetchAllUsers();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await userServiceInstance.fetchRoleUsers();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getSingleUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user_id } = req.params;
    const response = await userServiceInstance.fetchSingleUser(user_id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
};

export const updateUser = async(req: Request, res: Response): Promise<void> => {
  try {
    const email = req.params.email;
    const { password, profile_picture  } = req.body;

    const user = {
      email: email,
      password,
      profile_picture,
    };

    const response = await userServiceInstance.updateUser(email, password, profile_picture);
    res.status(201).json(response);
  } catch (error) {
    res.json({
      error: error,
    });
  }
}

export const switchRoleToManager = async(req: Request, res:Response): Promise<void> => {
  try {
    const { user_id} = req.params;
    const response =  await userServiceInstance.switchCollectorRole(user_id);

    res.status(201).json(response);
  } catch (error){
    res.status(500).json({error: 'Error switching role to collector'})
  }
}

export const switchRoleToAdmin = async(req: Request, res: Response): Promise<void> => {
  try {
    const {user_id} =req.params;
    const response = await userServiceInstance.switchRoleToAdmin(user_id);

    res.status(201).json(response);
  }catch (error){
    res.status(500).json({error: 'Error switching role to admin'})
  }
}

export const revokeAllprivileges = async(req: Request, res: Response): Promise<void> => {
  try {
    const { user_id } = req.params;
    const response = await userServiceInstance.revokePrivileges(user_id);

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({error: 'Error revoking all privileges'})
  }
}

  export const deactivateUser = async(req: Request, res: Response): Promise<void> => {
    try {
      let { user_id } = req.params;
  
      let response = await userServiceInstance.deactivateUser(user_id);
      if (response.error) {
        res.status(400).json(response);
      } else {
        res.status(200).json(response);
      }
  
    } catch (error) {

      console.error('Error in deactivating user' ,error)
      res.status(500).json({
        error: 'Error deactivating user'
      });
    }
  }
  
  export const activateUser = async(req: Request, res: Response): Promise<void> => {
    try {
      let { user_id } = req.params;
  
      let response = await userServiceInstance.activateUser(user_id);
      res.status(201).json(response);
  
    } catch (error) {

      console.error('Error in activating user' ,error)
      res.status(500).json({
        error: 'Error activating user'
      });
    }
  }
  

