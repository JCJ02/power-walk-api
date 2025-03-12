import prisma from "../utils/prismaClient";

class HardwareRepository {

    // GET THE BATTERY PERCENTAGE FUNCTION
    async get() {
        return await prisma.battery.findFirst({
            where: {
                deletedAt: null
            },
            select: {
                batteryPercentage: true,
                batteryVoltage: true
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

    // GET THE ELECTRICITY GENERATED AND CONSUMPTION PER DAY FUNCTION
    async getElectricityMeter() {
        return await prisma.electricity_meter.groupBy({
            by: ['createdAt'],
            where: {
                deletedAt: null
            },
            _sum: {
                dailyElectricityGenerated: true,
                dailyElectricityConsumption: true
            }
        });
    }


}

export default HardwareRepository;