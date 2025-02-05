import { Request, Response } from "express";
import StudentService from "../services/StudentService";
import AppResponse from "../utils/appResponse";
import { createStudentSchema, updateStudentSchema } from "../utils/zod/StudentSchema";

class StudentController {

    private studentService;

    constructor() {
        
        this.studentService = new StudentService();

        this.create = this.create.bind(this);
        this.get = this.get.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.list = this.list.bind(this);

    }

    // CREATE STUDENT FUNCTION
    async create(req: Request, res: Response) {
        try {

            const validateStudentData = createStudentSchema.safeParse(req.body);

            if(validateStudentData.error) {
                return AppResponse.sendErrors({
                    res,
                    data: null,
                    message: validateStudentData.error.errors[0].message,
                    code: 403
                });
            }

            const isStudentDateValid = await this.studentService.create(validateStudentData.data);

            if(!isStudentDateValid) {
                return AppResponse.sendErrors({
                    res,
                    data: null,
                    message: "Failed to Create!",
                    code: 403
                });
            } else {
                return AppResponse.sendSuccessful({
                    res,
                    data: isStudentDateValid,
                    message: "Successfully Created!",
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

    // UPDATE STUDENT FUNCTION
    async get(req: Request, res: Response) {
        try {

            const id = Number(req.params.id);

            const isStudentExist = await this.studentService.get(id);
            
            if(!isStudentExist) {
                return AppResponse.sendErrors({
                    res,
                    data: null,
                    message: "Student does not Exist!",
                    code: 403
                });
            } else {
                return AppResponse.sendSuccessful({
                    res,
                    data: isStudentExist,
                    message: "Successfully Retrieved!",
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

    // UPDATE STUDENT FUNCTION
    async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const validateStudentData = updateStudentSchema.safeParse(req.body);

            if(validateStudentData.error) {
                return AppResponse.sendErrors({
                    res,
                    data: null,
                    message: validateStudentData.error.errors[0].message,
                    code: 403
                });
            }

            const isStudentUpdated = await this.studentService.update(id, validateStudentData.data);

            if(!isStudentUpdated) {
                return AppResponse.sendErrors({
                    res,
                    data: null,
                    message: "Failed to Update!",
                    code: 403
                });
            } else {
                return AppResponse.sendSuccessful({
                    res,
                    data: isStudentUpdated,
                    message: "Successfully Updated!",
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

    // UPDATE STUDENT FUNCTION
    async delete(req: Request, res: Response) {
        try {
            
            const id = Number(req.params.id);

            const isStudentDeleted = await this.studentService.delete(id);

            if(!isStudentDeleted) {
                return AppResponse.sendErrors({
                    res,
                    data: null,
                    message: "Failed to Delete!",
                    code: 403
                });
            } else {
                return AppResponse.sendSuccessful({
                    res,
                    data: isStudentDeleted,
                    message: "Successfully Deleted!",
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

    // LIST OF STUDENT w/ SEARCH and PAGINATION FUNCTION
    async list(req: Request, res: Response) {
        try {
            const searchResults = await this.studentService.list(req);

            return AppResponse.sendSuccessful({
                res,
                data: searchResults,
                message: "Results!",
                code: 200
            });
        } catch (error: any) {
            
        }
    }

}

export default StudentController;