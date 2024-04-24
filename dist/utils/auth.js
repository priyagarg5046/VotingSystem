"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = "apple";
const createJwtToken = (user) => {
    const userWithDateString = Object.assign(Object.assign({}, user), { dob: user.dob.toString() // Convert Date to string
     });
    return jsonwebtoken_1.default.sign(userWithDateString, secretKey, { expiresIn: "24h" });
};
exports.createJwtToken = createJwtToken;
const verifyToken = (req, res, next) => {
    let token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Missing token" });
    }
    let decode = jsonwebtoken_1.default.verify(token, secretKey);
    console.log(decode);
    if (decode) {
        req.user = decode;
        return next();
    }
    res.send("token invalid");
};
exports.verifyToken = verifyToken;
