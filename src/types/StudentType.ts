type BaseStudentType = {
    uid: number,
    studentId: string,
    firstname: string,
    lastname: string,
    middlename?: string | null | undefined,
    email: string,
    dateOfBirth: Date,
    address: string
}

type BaseUpdateStudentType = {
    studentId: string,
    firstname: string,
    lastname: string,
    middlename?: string | null | undefined,
    email: string,
    dateOfBirth: Date,
    address: string
}

type StudentType = BaseStudentType & {
    id?: number,
}

type UpdateStudentType = BaseUpdateStudentType & {
    id?: number,
    uid?: number
}

export {
    StudentType,
    UpdateStudentType
}