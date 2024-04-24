import jwt from 'jsonwebtoken';
import express, { Request, Response, NextFunction } from 'express';
const secretKey = "apple"

export const createJwtToken = (user: {
    name: string,
    dob: Date,
    phonenumber: string,
    aadharno: string,
    password: string,
    nationality: string,
}) => {
    const userWithDateString = {
        ...user,
        dob: user.dob.toString() // Convert Date to string
    };
    return jwt.sign(userWithDateString, secretKey, { expiresIn: "24h" });
}
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Missing token" });
    }
    let decode = jwt.verify(token, secretKey);
    console.log(decode);
    if (decode) {
        req.user = decode;
        return next();
    }
    res.send("token invalid")

}

