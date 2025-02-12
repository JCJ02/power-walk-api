import { Request } from "express";
import RFIDRepository from "../repositories/RFIDRepository";

interface RFIDCreateData {
    uid: string;
}

class RFIDService {

    private rfidRepository;

    constructor() {

        this.rfidRepository = new RFIDRepository();

    }

    // CREATE RFID FUNCTION
    async create(data: RFIDCreateData) {
        const isRFIDExisting = await this.rfidRepository.validate(data.uid);

        if(isRFIDExisting) {
            return null;
        } else {
            return await this.rfidRepository.create(data);
        }
    }

    // LIST OF RFIDs w/ SEARCH and PAGINATION FUNCTION
    async list(req: Request) {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const query = req.query.query as string || "";
    
        const skip = (page - 1) * limit;
    
        return await this.rfidRepository.list(query, skip, limit);
    }



}

export default RFIDService;