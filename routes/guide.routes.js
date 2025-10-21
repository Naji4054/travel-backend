import { Router } from "express";
import { addGuide, deleteGuide, listAllGuide, singleGuide, updateGuide } from "../controllers/guide.controller.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";


const guideRoutes = Router()
guideRoutes.use(authenticate)
guideRoutes.use(authorize(['admin']))
guideRoutes.get('/all-guide', listAllGuide)
guideRoutes.get('/view-guide/:id', singleGuide)
guideRoutes.post('/add-guide', addGuide )
guideRoutes.patch('/update-guide/:id',updateGuide)
guideRoutes.delete('/delete-guide/:id', deleteGuide)
export default guideRoutes