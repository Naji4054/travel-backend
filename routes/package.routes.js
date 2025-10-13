import { Router } from "express";
import { addPackages, deletePackages, listAllPackages, updatePackages } from "../controllers/package.controller.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";

const packageRoutes = Router()

packageRoutes.get('/all-packages', listAllPackages)
packageRoutes.post('/add-packages',authenticate, authorize(['admin']), addPackages )
packageRoutes.patch('/update-packages/:id',authenticate, authorize(['admin']), updatePackages )
packageRoutes.delete('/delete-packages/:id',authenticate, authorize(['admin']), deletePackages)

export default packageRoutes;