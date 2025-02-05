import express from "express";
import StudentController from "../controllers/StudentController";
import authenticationMiddleware from "../middlewares/AuthenticationMiddleware";

const studentRoute = express.Router();
const studentController = new StudentController();

/**
 * @swagger
 * /api/student/:
 *   post:
 *     summary: Create a New Student Record
 *     tags: [Student Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uid:
 *                 type: string
 *                 example: "12131415"
 *               studentId:
 *                 type: string
 *                 example: "21-1780"
 *               firstname:
 *                 type: string
 *                 example: "John Carlo"
 *               lastname:
 *                 type: string
 *                 example: "Jacobe"
 *               middlename:
 *                 type: string
 *                 example: "Pura"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "jacobe.johncarlo.02022003@gmail.com"
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: "2003-02-02"
 *               address:
 *                 type: string
 *                 example: "Quezon City, Philippines"
 *     responses:
 *       201:
 *         description: Successfully Created!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 10
 *                     uid:
 *                       type: string
 *                       example: "12131415"
 *                     studentId:
 *                       type: string
 *                       example: "21-1780"
 *                     firstname:
 *                       type: string
 *                       example: "John Carlo"
 *                     lastname:
 *                       type: string
 *                       example: "Jacobe"
 *                     middlename:
 *                       type: string
 *                       example: "Pura"
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "jacobe.johncarlo.02022003@gmail.com"
 *                     dateOfBirth:
 *                       type: string
 *                       format: date-time
 *                       example: "2003-02-02T00:00:00.000Z"
 *                     address:
 *                       type: string
 *                       example: "Quezon City, Philippines"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-05T13:55:17.080Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-05T13:55:17.080Z"
 *                     deletedAt:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                 message:
 *                   type: string
 *                   example: "Successfully Created!"
 *                 code:
 *                   type: integer
 *                   example: 201
 *       403:
 *         description: Bad Request - Invalid Data Format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to Create!"
 *                 code:
 *                   type: integer
 *                   example: 403
 *       500:
 *         description: Internal Server Error
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
studentRoute.post("/", authenticationMiddleware, studentController.create);

/**
 * @swagger
 * /api/student/{id}:
 *   get:
 *     summary: Retrieve a Specific Student Record by ID
 *     tags: [Student Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the student to retrieve
 *         schema:
 *           type: integer
 *           example: 8
 *     responses:
 *       200:
 *         description: Successfully Retrieved the Student Record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 8
 *                     uid:
 *                       type: string
 *                       example: "123456"
 *                     studentId:
 *                       type: string
 *                       example: "11-1111"
 *                     firstname:
 *                       type: string
 *                       example: "Testing 1"
 *                     lastname:
 *                       type: string
 *                       example: "Testing 1"
 *                     middlename:
 *                       type: string
 *                       example: "Testing 1"
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "testing@gmail.com"
 *                     dateOfBirth:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-01-01T00:00:00.000Z"
 *                     address:
 *                       type: string
 *                       example: "Testing 1"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-05T12:41:36.751Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-05T13:24:16.558Z"
 *                     deletedAt:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                 message:
 *                   type: string
 *                   example: "Successfully Retrieved!"
 *                 code:
 *                   type: integer
 *                   example: 200
 *       404:
 *         description: Not Found - Student does not Exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Student does not Exist!"
 *                 code:
 *                   type: integer
 *                   example: 404
 *       500:
 *         description: Internal Server Error
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
studentRoute.get("/:id", authenticationMiddleware, studentController.get);


/**
 * @swagger
 * /api/student/{id}:
 *   put:
 *     summary: Update an Existing Student Record
 *     tags: [Student Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the Student to Update
 *         schema:
 *           type: integer
 *           example: 10
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *                 example: "21-1780"
 *               firstname:
 *                 type: string
 *                 example: "John Carlo"
 *               lastname:
 *                 type: string
 *                 example: "Jacobe"
 *               middlename:
 *                 type: string
 *                 example: "Pura"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "jacobe.johncarlo.02022003@gmail.com"
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: "2003-02-02"
 *               address:
 *                 type: string
 *                 example: "Quezon City, Philippines"
 *     responses:
 *       201:
 *         description: Successfully Updated!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 10
 *                     uid:
 *                       type: string
 *                       example: "12131415"
 *                     studentId:
 *                       type: string
 *                       example: "21-1780"
 *                     firstname:
 *                       type: string
 *                       example: "John Carlo"
 *                     lastname:
 *                       type: string
 *                       example: "Jacobe"
 *                     middlename:
 *                       type: string
 *                       example: "Pura"
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "jacobe.johncarlo.02022003@gmail.com"
 *                     dateOfBirth:
 *                       type: string
 *                       format: date-time
 *                       example: "2003-02-02T00:00:00.000Z"
 *                     address:
 *                       type: string
 *                       example: "Quezon City, Philippines"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-05T13:55:17.080Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-05T13:55:17.080Z"
 *                     deletedAt:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                 message:
 *                   type: string
 *                   example: "Successfully Updated!"
 *                 code:
 *                   type: integer
 *                   example: 201
 *       403:
 *         description: Bad Request - Invalid Data Format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to Update!"
 *                 code:
 *                   type: integer
 *                   example: 403
 *       500:
 *         description: Internal Server Error
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
studentRoute.put("/:id", authenticationMiddleware, studentController.update);


/**
 * @swagger
 * /api/student/{id}:
 *   delete:
 *     summary: Delete a Specific Student Record by ID
 *     tags: [Student Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the student to delete
 *         schema:
 *           type: integer
 *           example: 8
 *     responses:
 *       201:
 *         description: Successfully Deleted the Student Record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 8
 *                     uid:
 *                       type: string
 *                       example: "123456"
 *                     studentId:
 *                       type: string
 *                       example: "11-1111"
 *                     firstname:
 *                       type: string
 *                       example: "Testing 1"
 *                     lastname:
 *                       type: string
 *                       example: "Testing 1"
 *                     middlename:
 *                       type: string
 *                       example: "Testing 1"
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "testing@gmail.com"
 *                     dateOfBirth:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-01-01T00:00:00.000Z"
 *                     address:
 *                       type: string
 *                       example: "Testing 1"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-05T12:41:36.751Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-05T14:51:28.779Z"
 *                     deletedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-05T14:51:28.420Z"
 *                 message:
 *                   type: string
 *                   example: "Successfully Deleted!"
 *                 code:
 *                   type: integer
 *                   example: 201
 *       403:
 *         description: Not Found or Failed to Delete
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to Delete!"
 *                 code:
 *                   type: integer
 *                   example: 404
 *       500:
 *         description: Internal Server Error
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
studentRoute.delete("/:id", authenticationMiddleware, studentController.delete);


/**
 * @swagger
 * /api/student/:
 *   get:
 *     summary: Get List of Students with Pagination and Search
 *     tags: [Student Management]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: false
 *         description: Search query for filtering students (optional)
 *         schema:
 *           type: string
 *           example: "Testing"
 *       - in: query
 *         name: page
 *         required: true
 *         description: The page number for pagination
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         required: true
 *         description: The number of students per page
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: List of Students with Pagination and Search Results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     students:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 11
 *                           uid:
 *                             type: string
 *                             example: "1111111"
 *                           studentId:
 *                             type: string
 *                             example: "21-0001"
 *                           firstname:
 *                             type: string
 *                             example: "Testing 2"
 *                           lastname:
 *                             type: string
 *                             example: "Testing 2"
 *                           middlename:
 *                             type: string
 *                             example: "Testing 2"
 *                           email:
 *                             type: string
 *                             format: email
 *                             example: "testing2@gmail.com"
 *                           dateOfBirth:
 *                             type: string
 *                             format: date-time
 *                             example: "2003-02-02T00:00:00.000Z"
 *                           address:
 *                             type: string
 *                             example: "Testing 2"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-02-05T14:27:19.651Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-02-05T14:28:15.775Z"
 *                           deletedAt:
 *                             type: string
 *                             format: date-time
 *                             example: null
 *                     totalStudents:
 *                       type: integer
 *                       example: 3
 *                 message:
 *                   type: string
 *                   example: "Results!"
 *                 code:
 *                   type: integer
 *                   example: 200
 *       500:
 *         description: Internal Server Error
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
studentRoute.get("/", authenticationMiddleware, studentController.list);

export default studentRoute;