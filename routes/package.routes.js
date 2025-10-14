import { Router } from "express";
import { addPackages, deletePackages, listAllPackages, updatePackages } from "../controllers/package.controller.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";

const packageRoutes = Router()

packageRoutes.get('/all-packages', listAllPackages)

packageRoutes.use(authenticate)
packageRoutes.use(authorize(['admin']))
packageRoutes.post('/add-packages', addPackages )
packageRoutes.patch('/update-packages/:id', updatePackages )
packageRoutes.delete('/delete-packages/:id', deletePackages)

export default packageRoutes;