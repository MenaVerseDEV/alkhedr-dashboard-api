import multer from "multer";
const multerPasre = multer({
    dest: "uploads/",
});
import { Router } from "express";
const router = Router();
import { addImage , deleteImage ,getAllImages,getImage,updateImage , getAllCars, getAllBanks, createCar } from "../controllers/dashboard.controller";
import authorize from "../middlewares/authorize";
import verifyToken from "../middlewares/verifyToken";
router.post("/image", multerPasre.fields([{name:'image'}]), verifyToken,authorize('admin' , 'super-admin' , 'markter'), addImage);
router.put("/image/:id", multerPasre.fields([{name:'image'}]),verifyToken, authorize('admin' , 'super-admin' , 'markter') ,updateImage);
router.get("/images", getAllImages);
router.get("/image/:id", getImage);
router.delete("/image/:id",verifyToken,authorize('admin' , 'super-admin' , 'markter'), deleteImage);
router.get("/cars", getAllCars);
router.get("/banks" , getAllBanks);
router.post("/car", verifyToken,authorize('employee' , 'admin' , 'super-admin'),createCar);
router.post("/bank", verifyToken,authorize('employee' , 'admin' , 'super-admin'),createCar);
export default router;