import express from "express";
import RFIDController from "../controllers/RFIDController";
import authenticationMiddleware from "../middlewares/AuthenticationMiddleware";

const rfidRoute = express.Router();
const rfidController = new RFIDController();

rfidRoute.post("/", authenticationMiddleware, rfidController.create);
rfidRoute.get("/", authenticationMiddleware, rfidController.list);
rfidRoute.get("/history", authenticationMiddleware, rfidController.history);
export default rfidRoute;