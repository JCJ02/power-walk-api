import express from "express";
import adminRoute from "./AdminRoute";
import studentRoute from "./StudentRoute";
import hardwareRoute from "./HardwareRoute";
import rfidRoute from "./RFIDRoute";

const routes = express.Router();

routes.use("/admin", adminRoute);
routes.use("/student", studentRoute);
routes.use("/hardware", hardwareRoute);
routes.use("/rfid", rfidRoute);

export default routes;