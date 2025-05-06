import express  from "express";
import { createPickup, deletePickup, getActivePickups, getAllPickups, getSinglePickup, getUserPickupHistory, updatePickup } from "../controllers/pickup.controller";


const pickup_router = express.Router();

pickup_router.post('/:user_id/createPickup', createPickup);
pickup_router.get('/fetch-single-pickup/:pickup_id', getSinglePickup);
pickup_router.get('/active/:user_id', getActivePickups);
pickup_router.get('/fetch-all-pickups', getAllPickups);
pickup_router.put('/update-pickup/:pickup_id', updatePickup);
pickup_router.get('/history/:userId', getUserPickupHistory);
pickup_router.delete('/delete-pickup/:pickup_id', deletePickup);

export default pickup_router;