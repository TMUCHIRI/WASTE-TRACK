import express from 'express';
import { acceptPickup, getAllAcceptedPickups, getAllCanceledPickups, getAllPendingPickups, getCollectorAnalytics, getCollectorCollections, getSingleAcceptedPickup, getSingleCanceledPickup, getSinglePendingPickup, rejectPickup } from '../controllers/collection.controller';


const collection_router = express.Router();

collection_router.post('/accept-pickup', acceptPickup);

collection_router.post('/reject-pickup', rejectPickup);

collection_router.get('/get-all-accepted-pickups', getAllAcceptedPickups);
collection_router.get('/:user_id/collections', getCollectorCollections);
collection_router.get('/:user_id/analytics', getCollectorAnalytics);

collection_router.get('/get-single-accepted-pickup/:collection_id', getSingleAcceptedPickup);

collection_router.get('/get-all-pending-pickups', getAllPendingPickups);

collection_router.get('/get-single-pending-pickup/:pickup_id', getSinglePendingPickup);

collection_router.get('/get-all-cancelled-pickups', getAllCanceledPickups);

collection_router.get('/get-single-cancelled-pickup/:collection_id', getSingleCanceledPickup);

export default collection_router;