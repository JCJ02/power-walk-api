import express from "express";
import adminRoute from "./AdminRoute";
import studentRoute from "./StudentRoute";

const routes = express.Router();

routes.use("/admin", adminRoute);
routes.use("/student", studentRoute);

export default routes;