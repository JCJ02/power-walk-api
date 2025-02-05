import { Request, Response } from "express";
import AdminService from "../services/AdminService";
import AppResponse from "../utils/appResponse";
import { authenticateAdminSchema, createAdminSchema } from "../utils/zod/AdminSchema";
import { authenticationMiddlewareRequest } from "../types/AuthenticationMiddlewareType";

class AdminController {
    private adminService;

    constructor() {
        this.adminService = new AdminService();

        this.user = this.user.bind(this);
        this.create = this.create.bind(this);
        this.authenticate = this.authenticate.bind(this);
    }

    // AUTHENTICATE USER FUNCTION
    async user(req: authenticationMiddlewareRequest, res: Response) {
        try {
            const admin = req.user;

            if (!admin) {
                return AppResponse.sendErrors({
                    res,
                    data: null,
                    message: "Admin Not Found!",
                    code: 403
                });
            } else {
                return AppResponse.sendSuccessful({
                    res,
                    data: {
                        id: admin.id,
                        firstname: admin.firstname,
                        lastname: admin.lastname,
                        email: admin.email,
                        role: admin.role
                    },
                    message: "Admin Found!",
                    code: 200
                });
            }

        } catch (error: any) {
            return AppResponse.sendErrors({
                res,
                data: null,
                message: error.message,
                code: 500
            });
        }
    }

    // CREATE ADMIN FUNCTION
    async create(req: Request, res: Response) {
        try {
            const validation = createAdminSchema.safeParse(req.body);

            if (validation.error) {
                return AppResponse.sendErrors({
                    res,
                    data: null,
                    message: validation.error.errors[0].message,
                    code: 400
                });
            }

            const signUp = await this.adminService.create(validation.data);

            if (!signUp) {
                return AppResponse.sendErrors({
                    res,
                    data: null,
                    message: "E-mail Is Already Exist!",
                    code: 403
                });
            } else {
                return AppResponse.sendSuccessful({
                    res,
                    data: {
                        admin: signUp
                    },
                    message: "Successfully Registered!",
                    code: 201
                });
            }
        } catch (error: any) {
            return AppResponse.sendErrors({
                res,
                data: null,
                message: error.message,
                code: 500
            });
        }
    }

    // AUTHENTICATE OR LOG IN ADMIN FUNCTION
    async authenticate(req: Request, res: Response) {
        try {
            const validateAdminCredential = authenticateAdminSchema.safeParse(req.body);

            if (validateAdminCredential.error) {
                return AppResponse.sendErrors({
                    res,
                    data: null,
                    message: validateAdminCredential.error.errors[0].message,
                    code: 400
                });
            } else {
                const result = await this.adminService.authenticate(validateAdminCredential.data);
                // console.log(`Authentication Result: ${result}`);
                if (!result) {
                    return AppResponse.sendErrors({
                        res,
                        data: null,
                        message: "Invalid Login Credentials!",
                        code: 401
                    });
                } else {
                    return AppResponse.sendSuccessful({
                        res,
                        data: result,
                        message: "Logged In Successfully!",
                        code: 200
                    });
                }

            }
        } catch (error: any) {
            return AppResponse.sendErrors({
                res,
                data: null,
                message: error.message,
                code: 500
            });
        }
    }
}

export default AdminController;