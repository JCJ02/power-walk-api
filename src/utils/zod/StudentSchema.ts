import { z } from "zod";

const createStudentSchema = z.object({
    uid: z.coerce.number({
        invalid_type_error: "Description Must Be Numbers!"
    }).min(1, "RFID is Required!"),
    studentId: z.string()
        .min(1, "Student ID is Required!"),
    firstname: z.string()
        .min(1, "Firstname is Required!")
        .max(255, "Firstname must not Exceed to 255 Characters Long!"),
    lastname: z.string()
        .min(1, "Lastname is Required!")
        .max(255, "Lastname must not Exceed to 255 Characters Long!"),
    middlename: z.string().optional().nullable(),
    email: z.string().email("Must be a Valid Email Address!")
        .min(1, "Email is Required!")
        .max(255, "Email must not Exceed to 255 Characters Long!"),
    dateOfBirth: z.coerce.date()
        .refine((date) => !isNaN(date.getTime()), {
            message: "Invalid Date. Please Enter a Valid Date.",
        }),
    address: z.string().min(1, "Address is Required!")
});

const updateStudentSchema = z.object({
    studentId: z.string()
        .min(1, "Student ID is Required!"),
    firstname: z.string()
        .min(1, "Firstname is Required!")
        .max(255, "Firstname must not Exceed to 255 Characters Long!"),
    lastname: z.string()
        .min(1, "Lastname is Required!")
        .max(255, "Lastname must not Exceed to 255 Characters Long!"),
    middlename: z.string().optional().nullable(),
    email: z.string().email("Must be a Valid Email Address!")
        .min(1, "Email is Required!")
        .max(255, "Email must not Exceed to 255 Characters Long!"),
    dateOfBirth: z.coerce.date()
        .refine((date) => !isNaN(date.getTime()), {
            message: "Invalid Date. Please Enter a Valid Date.",
        }),
    address: z.string().min(1, "Address is Required!")
});

export {
    createStudentSchema,
    updateStudentSchema
}