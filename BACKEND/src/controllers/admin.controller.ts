import { Request, Response } from 'express';
import { adminServiceInstance } from '../services/admin.service';

export const getAdminAnalytics = async (req: Request, res: Response): Promise<void> => {
  try {
    const analytics = await adminServiceInstance.getAdminAnalytics();
    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};