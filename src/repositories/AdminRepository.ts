import { adminAccountType } from "../types/AdminType";
import prisma from "../utils/prismaClient";

class AdminRepository {
    // CREATE ADMIN FUNCTION
    async create(data: adminAccountType, prismaTransaction: any) {
        // const signUp = await prisma.$transaction(async (prisma) => {
        //     return await prisma.admin.create({
        //         data: {
        //             firstname: data.firstname,
        //             lastname: data.lastname,
        //             email: data.email,
        //             account: {
        //                 create: {
        //                     password: data.password
        //                 }
        //             }
        //         }
        //     });
        // });

        const signUp = await prismaTransaction.admin.create({
            data: {
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                account: {
                    create: {
                        password: data.password
                    }
                }
            }
        });

        return signUp;
    }

    // SHOW FUNCTION
    async show(id: number) {
        const admin = await prisma.admin.findFirst({
            where: {
                id: id,
                deletedAt: null
            }
        });
        return admin;
    }

    // VALIDATE EMAIL FUNCTION
    async validateEmail(email: string) {
        const isEmailExist = await prisma.admin.findFirst({
            where: {
                email: email,
                deletedAt: null
            }
        });
        return isEmailExist;
    }

    // AUTHENTICATE OR LOG IN ADMIN FUNCTION
    async authenticate(data: { email: string }) {
        const admin = await prisma.admin.findFirst({
            where: {
                email: data.email,
                deletedAt: null
            },
            include: {
                account: true
            }
        });
        // console.log(`Admin Data: ${JSON.stringify(admin, null, 2)}`);
        return admin;
    }
}

export default AdminRepository;