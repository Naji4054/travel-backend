import { Router } from "express"
import { authenticate, authorize } from "../middlewares/authMiddleware.js"
import { addLocation, deleteLocation, listAllLocation, updateLocation } from "../controllers/location.contoller.js"

const locationRoutes = Router()

locationRoutes.get('/all-location',authenticate, authorize(['admin']), listAllLocation)
locationRoutes.post('/add-location',authenticate, authorize(['admin']), addLocation)
locationRoutes.patch('/update-location/:id',authenticate, authorize(['admin']), updateLocation )
locationRoutes.delete('/delete-category/:id',authenticate, authorize(['admin']), deleteLocation)

export default locationRoutes;