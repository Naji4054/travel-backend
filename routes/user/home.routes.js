import { Router } from "express";
import { listPackages } from "../../controllers/user/home.controller.js";

const homeRoutes = Router()
homeRoutes.get('/packages',listPackages)
export default homeRoutes;