import { Request, Response } from "express";
import HardwareService from "../services/HardwareService";
import AppResponse from "../utils/appResponse";

class HardwareController {

    private hardwareService;

    constructor() {
        
        this.hardwareService = new HardwareService();

        this.get = this.get.bind(this);
        this.getElectrictyGenerated = this.getElectrictyGenerated.bind(this);
        this.getElectricityConsumption = this.getElectricityConsumption.bind(this);

    }

    // GET THE BATTERY PERCENTAGE FUNCTION
    async get(req: Request, res: Response) {
        try {
            const batteryPercentage = await this.hardwareService.get();

            return AppResponse.sendSuccessful({
                res,
                data: batteryPercentage,
                message: "Battery Percentage",
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

    // GET THE ELECTRICTY GENERATED FUNCTION
    async getElectrictyGenerated(req: Request, res: Response) {
        try {
            const electricityGenerated = await this.hardwareService.getElectrictyGenerated();

            return AppResponse.sendSuccessful({
                res,
                data: electricityGenerated,
                message: "Electricity Generated",
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

    // GET THE ELECTRICTY CONSUMPTION FUNCTION
    async getElectricityConsumption(req: Request, res: Response) {
        try {
            const electricityConsumption = await this.hardwareService.getElectricityConsumption();

            return AppResponse.sendSuccessful({
                res,
                data: electricityConsumption,
                message: "Electricity Consumption",
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

}

export default HardwareController;