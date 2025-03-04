import { Request, Response } from "express";
import RFIDService from "../services/RFIDService";
import AppResponse from "../utils/appResponse";
import { createRFIDSchema } from "../utils/zod/RFIDSchema";

class RFIDController {
    private rfidService;

    constructor() {
        
        this.rfidService = new RFIDService();

        this.create = this.create.bind(this);
        this.list = this.list.bind(this);
        this.history = this.history.bind(this);

    }

    // CREATE RFID FUNCTION
    async create(req: Request, res: Response) {
        try {

            const validateRFID = createRFIDSchema.safeParse(req.body);

            if(validateRFID.error) {
                return AppResponse.sendErrors({
                    res,
                    data: null,
                    message: validateRFID.error.errors[0].message,
                    code: 400
                });
            }

            const createRFID = await this.rfidService.create(validateRFID.data);

            if (!createRFID) {
                return AppResponse.sendErrors({
                    res,
                    data: null,
                    message: "RFID is already Exist!",
                    code: 403
                });
            } else {
                return AppResponse.sendSuccessful({
                    res,
                    data: createRFID,
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

    // LIST OF RFIDs w/ SEARCH and PAGINATION FUNCTION
    async list(req: Request, res: Response) {
        try {
            const searchResults = await this.rfidService.list(req);

            return AppResponse.sendSuccessful({
                res,
                data: searchResults,
                message: "Results!",
                code: 200
            });
        } catch (error: any) {
            return AppResponse.sendErrors({
                res,
                data: null,
                message: error.message,
                code: 500
            });
        }
    }

    // GET THE HISTORY FUNCTION
    async history(req: Request, res: Response) {
        try {
            const historyRecords = await this.rfidService.history();
            if(!historyRecords) {
                return AppResponse.sendErrors({
                    res,
                    data: null,
                    message: "Failed to Fetch!",
                    code: 200
                });
            } else {
                return AppResponse.sendSuccessful({
                    res,
                    data: historyRecords,
                    message: "Daily Usage Fetched Successfully",
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
}

export default RFIDController;