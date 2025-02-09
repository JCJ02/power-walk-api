import express from "express";
import adminRoute from "./AdminRoute";
import studentRoute from "./StudentRoute";
import hardwareRoute from "./HardwareRoute";

const routes = express.Router();

routes.use("/admin", adminRoute);
routes.use("/student", studentRoute);
routes.use("/hardware", hardwareRoute);

export default routes;