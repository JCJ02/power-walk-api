import AdminRepository from "../repositories/AdminRepository";
import { adminAccountType } from "../types/AdminType";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/token";

class AdminService {
    private adminRepository;

    constructor() {

        this.adminRepository = new AdminRepository();

    }
    // CREATE ADMIN FUNCTION
    async create(data: adminAccountType) {
        const isEmailExist = await this.adminRepository.validateEmail(data.email);

        if(isEmailExist) {
            return null;
        } 

        const hashedPassword = bcrypt.hashSync(data.password, 10);
        //console.log(data.password);
        const adminData = {
            ...data,
            password: hashedPassword,
        };
        //console.log(hashedPassword);
        const signUp = await this.adminRepository.create(adminData);

        return signUp;
    }

    // SHOW METHOD
    async show(id: number) {
        const isIdExist = await this.adminRepository.show(id);
        if (!isIdExist) {
            return null;
        } else {
            return isIdExist;
        }
    }

    // AUTHENTICATE OR LOG IN ADMIN FUNCTION
    async authenticate(data: { email: string, password: string }) {

        const admin = await this.adminRepository.authenticate(data);
        // console.log(`Admin: ${admin}`);
        if (!admin) {
            return null;
        }

        const isPasswordValid = bcrypt.compareSync(data.password, admin.account[0].password);
        // console.log(`Is Password Valid? ${isPasswordValid}`);
        if (!isPasswordValid) {
            return null;
        }

        const token = generateToken({
            id: admin.id,
            firstname: admin.firstname,
            lastname: admin.lastname,
            email: admin.email,
            role: admin.role
        });
        // console.log(`Admin ID: ${admin.id}, Admin Role: ${admin.role}`);

        return {
            token: token,
            admin: {
                id: admin.id,
                firstname: admin.firstname,
                lastname: admin.lastname,
                email: admin.email,
                role: admin.role
            }
        };
    }

}

export default AdminService;