import { Router } from "express";
import {  SinglePackage, addPackages, deletePackages, getAddOptions, listAllPackages, updatePackages } from "../controllers/package.controller.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";
import { multipleUpload } from "../middlewares/multer.js";

const packageRoutes = Router()

packageRoutes.get('/all-packages', listAllPackages)
packageRoutes.get('/add-options', getAddOptions)
packageRoutes.get('/view-package/:id', SinglePackage)

packageRoutes.use(authenticate)
packageRoutes.use(authorize(['admin']))
packageRoutes.post('/add-packages',multipleUpload, addPackages )
packageRoutes.patch('/update-packages/:id', multipleUpload, updatePackages )
packageRoutes.delete('/delete-packages/:id', deletePackages)


export default packageRoutes;