import prisma from "../utils/prismaClient";

class RFIDRepository {

    // CREATE RFID FUCNTION
    async create(data: any) {
        return await prisma.$transaction(async (prisma) => {
            return await prisma.rfid.create({
                data: {
                    uid: data.uid
                }
            });
        });
    }

    // VALIDATE RFID FUNCTION
    async validate(uid: string) {
        const isRFIDExisting = await prisma.rfid.findFirst({
            where: {
                uid: uid,
                deletedAt: null
            }
        });
        return isRFIDExisting;
    }

    // LIST OF RFIDs w/ SEARCH and PAGINATION FUNCTION
    async list(query: string, skip: number, limit: number) {
        const parsedDate = !isNaN(Date.parse(query)) ? new Date(query) : undefined;
        const rfidFilters = [];

        if (parsedDate) {
            rfidFilters.push({ createdAt: { equals: parsedDate } });
            rfidFilters.push({ updatedAt: { equals: parsedDate } });
            rfidFilters.push({ deletedAt: { equals: parsedDate } });
        }

        const rfids = await prisma.rfid.findMany({
            skip: skip,
            take: limit,
            where: {
                deletedAt: null,
                OR: [
                    { uid: { contains: query } },
                    ...rfidFilters,
                ]
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        const totalRFIDs = await prisma.rfid.count({
            where: {
                deletedAt: null,
                OR: [
                    { uid: { contains: query } },
                    ...rfidFilters,
                ]
            }
        });

        return {
            rfids,
            totalRFIDs
        }
    }

    // GET THE HISTORY FUNCTION
    async history(fromDate?: string, toDate?: string) {
        // const sevenDaysAgo = new Date();
        // sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const whereClause: any = {};

        if (fromDate && toDate) {
            whereClause.createdAt = {
                gte: new Date(fromDate).toISOString(),
                lte: new Date(toDate).toISOString(),
            };
        } else {
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

            whereClause.createdAt = {
                gte: sevenDaysAgo.toISOString().split("T")[0],
            };
        }

        return await prisma.history.findMany({
            where: whereClause,
            // where: {
            //     createdAt: {
            //         gt: sevenDaysAgo.toISOString().split("T")[0], // GET RECORDS FROM THE LAST 5 DAYS
            //     },
            // },
            orderBy: {
                createdAt: "asc",
            },
        });
    }

}

export default RFIDRepository;