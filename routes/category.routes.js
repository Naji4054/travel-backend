import { Router } from "express"
import { addCategory, deleteCategory, listAllCategory, updateCategory } from "../controllers/category.controller.js"
import { authenticate, authorize } from "../middlewares/authMiddleware.js"

const categoryRoutes = Router()

categoryRoutes.get('/all-category',authenticate, authorize(['admin']), listAllCategory)
categoryRoutes.post('/add-category',authenticate, authorize(['admin']), addCategory)
categoryRoutes.patch('/update-category/:id',authenticate, authorize(['admin']), updateCategory )
categoryRoutes.delete('/delete-category/:id',authenticate, authorize(['admin']), deleteCategory)

export default categoryRoutes;