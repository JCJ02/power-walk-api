import { Request } from "express";
import StudentRepository from "../repositories/StudentRepository";
import { StudentType, UpdateStudentType } from "../types/StudentType";

class StudentService {

    private studentRepository;

    constructor() {

        this.studentRepository = new StudentRepository();
    
    }

    // CREATE STUDENT FUNCTION
    async create(data: StudentType) {
        
        const studentData = {
            ...data
        }

       return await this.studentRepository.create(studentData);

    }

    // GET STUDENT FUNCTION
    async get(id: number) {
        const student = await this.studentRepository.show(id);

        if(!student) return null;
        else return student;
    }

    // UPDATE STUDENT FUNCTION
    async update(id: number, data: UpdateStudentType) {
        const student = await this.studentRepository.show(id);

        if(!student) return null;

        const studentData = {
            ...data
        }

        return await this.studentRepository.update(student.id, studentData);
    }

    // DELETE STUDENT FUNCTION
    async delete(id: number) {
        const student = await this.studentRepository.show(id);

        if(!student) return null;

        return await this.studentRepository.delete(student.id);
    }

    // LIST OF STUDENT w/ SEARCH and PAGINATION FUNCTION
    async list(req: Request) {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const query = req.query.query as string || "";

        const skip = (page - 1) * limit;

        return await this.studentRepository.list(query, skip, limit);
    }

}

export default StudentService;