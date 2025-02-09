import { StudentType, UpdateStudentType } from "../types/StudentType";
import prisma from "../utils/prismaClient";

class StudentRepository {
    // SHOW FUNCTIOIN
    async show(id: number) {
        return await prisma.student.findFirst({
            where: {
                id: id,
                deletedAt: null
            }
        });
    }

    // CREATE STUDENT FUNCTION
    async create(data: StudentType) {
        return await prisma.$transaction(async (prisma) => {
            return await prisma.student.create({
                data: {
                    uid: data.uid,
                    studentId: data.studentId,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    middlename: data.middlename,
                    email: data.email,
                    dateOfBirth: new Date(data.dateOfBirth),
                    address: data.address
                }
            });
        });
    }

    // UPDATE STUDENT FUNCTION
    async update(id: number, data: UpdateStudentType) {
        return await prisma.student.update({
            where: {
                id: id,
                deletedAt: null
            },
            data: {
                studentId: data.studentId,
                firstname: data.firstname,
                lastname: data.lastname,
                middlename: data.middlename,
                email: data.email,
                dateOfBirth: new Date(data.dateOfBirth),
                address: data.address
            }
        });
    }

    // DELETE STUDENT FUNCTION
    async delete(id: number) {
        return await prisma.student.update({
            where: {
                id: id,
                deletedAt: null
            },
            data: {
                deletedAt: new Date()
            }
        });
    }

    // LIST OF STUDENT w/ SEARCH and PAGINATION FUNCTION
    async list(query: string, skip: number, limit: number) {
        const parsedDate = !isNaN(Date.parse(query)) ? new Date(query) : undefined;
        const studentFilters = [];

        if (parsedDate) {
            studentFilters.push({ dateOfBirth: { equals: parsedDate } });
        }

        const students = await prisma.student.findMany({
            skip: skip,
            take: limit,
            where: {
                deletedAt: null,
                OR: [
                    { studentId: { contains: query } },
                    { firstname: { contains: query } },
                    { lastname: { contains: query } },
                    { middlename: { contains: query } },
                    { email: { contains: query } },
                    ...studentFilters,
                    { address: { contains: query } },
                ]
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        const totalStudents = await prisma.student.count({
            where: {
                deletedAt: null,
                OR: [
                    { studentId: { contains: query} },
                    { firstname: { contains: query } },
                    { lastname: { contains: query } },
                    { middlename: { contains: query } },
                    { email: { contains: query } },
                    ...studentFilters,
                    { address: { contains: query } },
                ]
            }
        });

        return {
            students,
            totalStudents
        }
    }

}

export default StudentRepository;