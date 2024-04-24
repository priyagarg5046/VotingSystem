import express from "express";
import { createJwtToken } from "../utils/auth";
const router = express.Router();
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
router.post("/", async (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "admin") {
         return res.send("admin ");
        // return res.redirect("/admin");
    }
    const result = await prisma.voter.findUnique({
        where: {
            aadharno: username,
            password: password,
        }
    })
    if (!result) {
        throw new Error("Not valid username")
    }
    if (result.password != password) {
        throw new Error("Not a valid password");
    }
    const token = createJwtToken(result);
    res.cookie("token", token)
    console.log(token);
    res.redirect("/voter");
})
export default router;