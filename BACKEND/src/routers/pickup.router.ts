import express  from "express";
import { createPickup, deletePickup, getAllPickups, getSinglePickup, updatePickup } from "../controllers/pickup.controller";


const pickup_router = express.Router();

pickup_router.post('/createPickup', createPickup);
pickup_router.get('/fetch-single-pickup/:pickup_id', getSinglePickup);
pickup_router.get('/fetch-all-pickups', getAllPickups);
pickup_router.put('/update-pickup/:pickup_id', updatePickup);
pickup_router.delete('/delete-pickup/:pickup_id', deletePickup);

export default pickup_router;