import express from 'express';
import {
  getVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from '../controllers/vehicleController';
import { protect, admin } from '../middleware/auth';

const router = express.Router();

router.route('/').get(getVehicles).post(protect, admin, createVehicle);
router
  .route('/:id')
  .get(getVehicleById)
  .put(protect, updateVehicle)
  .delete(protect, admin, deleteVehicle);

export default router;
