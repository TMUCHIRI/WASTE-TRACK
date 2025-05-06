import { Request, Response } from "express";
import { pickupService } from "../services/pickup.service";
import { Pickup } from "../models/pickup.interface";

const pickupServiceInstance = new pickupService();

// Create a new pickup
export const createPickup = async (req: Request, res: Response): Promise<void> => {
  try {
    const pickup = req.body;
    const user_id = req.params.user_id; // From URL params
    if (!user_id) {
      res.status(400).json({ error: 'User ID is required in URL parameters' });
      return;
    }
    const result = await pickupServiceInstance.createPickup({ ...pickup, user_id });

    if (result.error) {
      res.status(400).json(result);
    } else {
      res.status(201).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Fetch a single pickup by ID
export const getSinglePickup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { pickup_id } = req.params;
    const result = await pickupServiceInstance.displaySinglePickup(pickup_id);

    if (result.error) {
      res.status(404).json(result);
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// pickup.controller.ts
export const getActivePickups = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.userId;
  try {
    const response = await pickupServiceInstance.getActivePickups(userId);
    res.status(200).json(response.pickups); // Return the array directly
    console.log("response", response.pickups);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
// Fetch all pickups
export const getAllPickups = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pickupServiceInstance.displayAllPickups();

    if (result.pickups) {
      res.status(200).json({ result });
    } 
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Update a pickup
export const updatePickup = async (req: Request, res: Response): Promise<void> => {
    try {
      const { pickup_id } = req.params;
      const { location, date, phone_number, category } = req.body;
  
      const pickup: Pickup = {
        pickup_id,
        location,
        date,
        phone_number,
        category,
        status: false
      };
  
      const result = await pickupServiceInstance.updatePickup(pickup);
  
      if (result.error) {
        res.status(400).json(result);
      } else {
        res.status(200).json(result);
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  export const getUserPickupHistory = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.userId;
    try {
      const response = await pickupServiceInstance.getUserPickupHistory(userId);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

// Delete a pickup by ID
export const deletePickup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { pickup_id } = req.params;
    const result = await pickupServiceInstance.deletePickup(pickup_id);

    if (result.error) {
      res.status(400).json(result);
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};