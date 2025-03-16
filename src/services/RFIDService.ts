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

        if (isRFIDExisting) {
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

    // GET THE HISTORY FUNCTION
    async history(fromDate?: string, toDate?: string) {
        // const historyRecords = await this.rfidRepository.history();
        const historyRecords = await this.rfidRepository.history(fromDate, toDate);

        // GROUP DATA BY createdAt AND COUNT OCCURRENCES
        // const groupedData = historyRecords.reduce((occurrences: Record<string, number>, record) => {
        //     // occurrences[record.date_added] = (occurrences[record.date_added] || 0) + 1;
        //     occurrences[record.createdAt] = (occurrences[record.createdAt] || 0) + 1;
        //     return occurrences;
        // }, {});
        const groupedData = historyRecords.reduce((occurrences: Record<string, number>, record) => {
            const date = record.createdAt.toString().split("T")[0]; // Format to YYYY-MM-DD
            // occurrences[date] = (occurrences[date] || 0) + 1;
            occurrences[date] = (occurrences[date] || 0) + 1;
            return occurrences;
        }, {});

        // CONVERT OBJECT TO ARRAY FORMAT
        // return Object.entries(groupedData).map(([
        //     createdAt,
        //     // date_added, 
        //     count
        // ]) => ({
        //     // date_added,
        //     // uid2: count,
        //     createdAt,
        //     rfid_uid: count,
        // }));
        const rfids = Object.entries(groupedData).map(([createdAt, count]) => ({
            createdAt,
            rfid_uid: count,
        }));

        // Compute the total sum of all rfid_uid values
        const totalRFIDUID = rfids.reduce((sum, item) => sum + item.rfid_uid, 0);

        return {
            rfids,
            totalRFIDUID
        }
    }

}

export default RFIDService;