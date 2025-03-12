import express from "express";
import HardwareController from "../controllers/HardwareController";
import authenticationMiddleware from "../middlewares/AuthenticationMiddleware";

const hardwareRoute = express.Router();
const hardwareController = new HardwareController();

hardwareRoute.get("/", authenticationMiddleware, hardwareController.get);
hardwareRoute.get("/electricity-generated", authenticationMiddleware, hardwareController.getElectrictyGenerated);
hardwareRoute.get("/electricity-consumption", authenticationMiddleware, hardwareController.getElectricityConsumption);
hardwareRoute.get("/electricity-meter", authenticationMiddleware, hardwareController.getElectricityMeter);

export default hardwareRoute;