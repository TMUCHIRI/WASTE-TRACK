import { Request, Response } from "express";
import { collectionService } from "../services/collection.service";

const collectionServiceInstance = new collectionService();

// Accept a pickup
export const acceptPickup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user_id, pickup_id } = req.body;
    const result = await collectionServiceInstance.acceptPickup(user_id, pickup_id);

    if (result.error) {
      res.status(400).json(result);
    } else {
      res.status(201).json(result); 
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message }); 
  }
};

// Reject a pickup
export const rejectPickup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { collection_id, pickup_id } = req.body; 
    const result = await collectionServiceInstance.rejectPickup(collection_id, pickup_id);

    if (result.error) {
      res.status(400).json(result);
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message }); 
  }
};

// View all accepted pickups
export const getAllAcceptedPickups = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await collectionServiceInstance.getAllAcceptedPickups();

    if (result.message) {
      res.status(404).json(result); 
    } else {
      res.status(200).json(result); 
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message }); 
  }
};

// View a single accepted pickup
export const getSingleAcceptedPickup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { collection_id } = req.params; 
    const result = await collectionServiceInstance.getSingleAcceptedPickup(collection_id);

    if (result.error) {
      res.status(404).json(result); 
    } else {
      res.status(200).json(result); 
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message }); 
  }
};

// View all pending pickups
export const getAllPendingPickups = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await collectionServiceInstance.getAllPendingPickups();

    if (result.message) {
      res.status(404).json(result); 
    } else {
      res.status(200).json(result); 
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message }); 
  }
};

// View a single pending pickup
export const getSinglePendingPickup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { pickup_id } = req.params; 
    const result = await collectionServiceInstance.getSinglePendingPickup(pickup_id);

    if (result.error) {
      res.status(404).json(result); 
    } else {
      res.status(200).json(result); 
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// View all canceled pickups
export const getAllCanceledPickups = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await collectionServiceInstance.getAllCanceledPickups();

    if (result.message) {
      res.status(404).json(result); 
    } else {
      res.status(200).json(result); 
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// View a single canceled pickup
export const getSingleCanceledPickup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { collection_id } = req.params; 
    const result = await collectionServiceInstance.getSingleCanceledPickup(collection_id);

    if (result.error) {
      res.status(404).json(result); 
    } else {
      res.status(200).json(result); 
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};