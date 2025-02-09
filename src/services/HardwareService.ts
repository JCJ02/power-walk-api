import HardwareRepository from "../repositories/HardwareRepository";

class HardwareService {
    private hardwareRepository;

    constructor() {

        this.hardwareRepository = new HardwareRepository();

    }

    // GET THE BATTERY PERCENTAGE FUNCTION
    async get() {
        const batteryPercentage = await this.hardwareRepository.get();
        if(!batteryPercentage) {
            return null;
        } else {
            return batteryPercentage;
        }
    }

    // GET THE ELECTRICTY GENERATED FUNCTION
    async getElectrictyGenerated() {
        const electricityGenerated = await this.hardwareRepository.getElectrictyGenerated();
        if(!electricityGenerated) {
            return null;
        } else {
            return electricityGenerated;
        }
    }

    // GET THE ELECTRICTY CONSUMPTION FUNCTION
    async getElectricityConsumption() {
        const electricityConsumptoin = await this.hardwareRepository.getElectricityConsumption();
        if(!electricityConsumptoin) {
            return null;
        } else {
            return electricityConsumptoin;
        }
    }

}

export default HardwareService;