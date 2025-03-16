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
    async getElectricityMeter(fromDate?: string, toDate?: string) {
        return await prisma.electricity_meter.groupBy({
            by: ['createdAt'],
            where: {
                deletedAt: null,
                createdAt: {
                    gte: fromDate ? new Date(`${fromDate}T00:00:00.000Z`) : undefined,
                    lte: toDate ? new Date(`${toDate}T23:59:59.999Z`) : undefined,
                }
            },
            _sum: {
                dailyElectricityGenerated: true,
                dailyElectricityConsumption: true
            }
        });
    }

}

export default HardwareRepository;