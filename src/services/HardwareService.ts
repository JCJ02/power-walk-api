import { format } from "date-fns";
import HardwareRepository from "../repositories/HardwareRepository";

class HardwareService {
    private hardwareRepository;

    constructor() {

        this.hardwareRepository = new HardwareRepository();

    }

    // GET THE BATTERY PERCENTAGE FUNCTION
    async get() {
        const batteryPercentage = await this.hardwareRepository.get();
        if (!batteryPercentage) {
            return null;
        } else {
            return batteryPercentage;
        }
    }

    // GET THE ELECTRICTY GENERATED FUNCTION
    async getElectrictyGenerated() {
        const electricityGenerated = await this.hardwareRepository.getElectrictyGenerated();
        if (!electricityGenerated) {
            return null;
        } else {
            return electricityGenerated;
        }
    }

    // GET THE ELECTRICTY CONSUMPTION FUNCTION
    async getElectricityConsumption() {
        const electricityConsumptoin = await this.hardwareRepository.getElectricityConsumption();
        if (!electricityConsumptoin) {
            return null;
        } else {
            return electricityConsumptoin;
        }
    }

    // GET THE ELECTRICITY GENERATED AND CONSUMPTION PER DAY FUNCTION
    async getElectricityMeter(fromDate?: string, toDate?: string) {
        // const electricityData = await this.hardwareRepository.getElectricityMeter();
        const electricityData = await this.hardwareRepository.getElectricityMeter(fromDate, toDate);

        // Group results manually by date (since Prisma groups by full DateTime)
        const groupedData: Record<string, { totalElectricityGeneratedToday: number, totalElectricityConsumptionToday: number }> = {};

        let totalElectricityGenerated = 0;
        let totalElectricityConsumption = 0;

        electricityData.forEach(data => {
            const date = format(new Date(data.createdAt), "yyyy-MM-dd"); // Extract only the date

            if (!groupedData[date]) {
                groupedData[date] = {
                    totalElectricityGeneratedToday: 0,
                    totalElectricityConsumptionToday: 0
                };
            }

            const generated = Number(data._sum.dailyElectricityGenerated) || 0;
            const consumed = Number(data._sum.dailyElectricityConsumption) || 0;

            groupedData[date].totalElectricityGeneratedToday += Number(data._sum.dailyElectricityGenerated) || 0;
            groupedData[date].totalElectricityConsumptionToday += Number(data._sum.dailyElectricityConsumption) || 0;

            // SUMMING TOTAL ELECTRICITY VALUES
            totalElectricityGenerated += generated;
            totalElectricityConsumption += consumed;
        });

        // CONVERT THE GROUP OBJECT INTO AN ARRAY FORMAT FOR RESPONSE
        const electricityMeter = Object.entries(groupedData).map(([date, totals]) => ({
            date,
            ...totals
        }));

        return {
            electricityMeter,
            totalElectricityGenerated,
            totalElectricityConsumption
        };
    }
}

export default HardwareService;