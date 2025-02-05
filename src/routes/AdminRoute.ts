import express from "express";
import AdminController from "../controllers/AdminController";
import authenticationMiddleware from "../middlewares/AuthenticationMiddleware";

const adminRoute = express.Router();
const adminController = new AdminController();

adminRoute.get("/authentication-middleware", authenticationMiddleware, adminController.user);

/**
 * @swagger
 * /api/admin/authenticate:
 *   post:
 *     summary: Admin - Authentication
 *     tags: [Admin - Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Admin's Email Address
 *                 example: "jacobe.johncarlo.02022003@gmail.com"
 *               password:
 *                 type: string
 *                 description: Admin's Password
 *                 example: "@jacobe02"
 *     responses:
 *       200:
 *         description: Logged In Successfully!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: JWT token for authentication
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                     admin:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         firstname:
 *                           type: string
 *                           example: "John Carlo"
 *                         lastname:
 *                           type: string
 *                           example: "Jacobe"
 *                         email:
 *                           type: string
 *                           example: "jacobe.johncarlo.02022003@gmail.com"
 *                         role:
 *                           type: string
 *                           example: "Admin"
 *                 message:
 *                   type: string
 *                   example: "Logged In Successfully!"
 *                 code:
 *                   type: integer
 *                   example: 200
 *       400:
 *         description: Invalid login credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid Credentials!"
 *                 code:
 *                   type: integer
 *                   example: 400
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An Unexpected Error Occurred."
 *                 code:
 *                   type: integer
 *                   example: 500
 */
adminRoute.post("/authenticate", adminController.authenticate);


/**
 * @swagger
 * /api/admin/create:
 *   post:
 *     summary: Register a New Admin
 *     tags: [Admin Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: "John Carlo"
 *               lastname:
 *                 type: string
 *                 example: "Jacobe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "jacobe.johncarlo.02022003@gmail.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "securepassword123"
 *     responses:
 *       201:
 *         description: Successfully Registered!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     admin:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         firstname:
 *                           type: string
 *                           example: "John Carlo"
 *                         lastname:
 *                           type: string
 *                           example: "Jacobe"
 *                         email:
 *                           type: string
 *                           format: email
 *                           example: "jacobe.johncarlo.02022003@gmail.com"
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2025-02-01T14:41:42.976Z"
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2025-02-01T14:41:42.976Z"
 *                         deletedAt:
 *                           type: string
 *                           nullable: true
 *                           example: null
 *                         role:
 *                           type: string
 *                           example: "Admin"
 *                 message:
 *                   type: string
 *                   example: "Successfully Registered!"
 *                 code:
 *                   type: integer
 *                   example: 201
 *       400:
 *         description: Invalid login credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid Credentials!"
 *                 code:
 *                   type: integer
 *                   example: 400
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An Unexpected Error Occurred."
 *                 code:
 *                   type: integer
 *                   example: 500
 */
adminRoute.post("/", adminController.create);


export default adminRoute;