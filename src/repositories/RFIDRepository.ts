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
    async history() {
        // const today = new Date().toISOString().split("T")[0];

        // return prisma.history.findMany({
        //     where: {
        //         date_added: today
        //     }
        // });

        const fiveDaysAgo = new Date();
        fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 7);

        const historyRecords = await prisma.history.findMany({
            where: {
                date_added: {
                    gt: fiveDaysAgo.toISOString().split("T")[0], // GET RECORDS FROM THE LAST 5 DAYS
                },
            },
            orderBy: {
                date_added: "asc",
            },
        });

        // GROUP DATA BY date_added AND COUNT OCCURRENCES
        const groupedData = historyRecords.reduce((occurrences: Record<string, number>, record) => {
            occurrences[record.date_added] = (occurrences[record.date_added] || 0) + 1;
            return occurrences;
        }, {});

        // CONVERT OBJECT TO ARRAY FORMAT
        return Object.entries(groupedData).map(([date_added, count]) => ({
            date_added,
            uid2: count,
        }));
    }

}

export default RFIDRepository;