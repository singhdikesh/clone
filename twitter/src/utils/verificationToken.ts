import crypto from "crypto";

export const generateVerificationToken = () => {
    return crypto.randomBytes(32).toString("hex");
}


export const hashVerificationToken = (token:string) => {
    return crypto.createHash("sha256").update(token).digest("hex");
}


export const getVerificationTokenExpiry = () => {
    const expiry = new Date();

    return expiry.setMinutes(expiry.getMinutes() + 30);

}
