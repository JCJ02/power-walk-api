import prisma from "../utils/prismaClient";

class HardwareRepository {

    // GET THE BATTERY PERCENTAGE FUNCTION
    async get() {
        return await prisma.battery.findFirst({
            where: {
                deletedAt: null
            },
            select: {
                batteryPercentage: true
            }
        });
    }

    // GET THE ELECTRICTY GENERATED FUNCTION
    async getElectrictyGenerated() {
        return await prisma.electricity.findFirst({
            where: {
                deletedAt: null
            },
            select: {
                electricityGenerated: true
            }
        });
    }

    // GET THE ELECTRICTY CONSUMPTION FUNCTION
    async getElectricityConsumption() {
        return await prisma.electricity.findFirst({
            where: {
                deletedAt: null
            },
            select: {
                electricityConsumption: true
            }
        });
    }

}

export default HardwareRepository;