import bycrpt from "bcrypt";

export const hashPassword = async(password: string) => {
    return bycrpt.hash(password, 10);
}

export const comparePassword = async(password: string, hashedPassword: string) => {
    return bycrpt.compare(password, hashedPassword);
}