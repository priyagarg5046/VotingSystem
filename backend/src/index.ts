import express from "express";
import CORS from 'cors';
import { PrismaClient } from '@prisma/client'
import cookieparser from "cookie-parser";
import adminRoute from "./routes/admin";
import loginRoute from "./routes/login";
import voterRoute from "./routes/voter";
import votingRoute from "./routes/voting";
const app = express();
const prisma = new PrismaClient();
const PORT = 4444;
app.use(CORS());
app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({ extended: true }))
app.get("/", (req, res) => {
    res.send("home");
})
// async function addAdmin(){
//     await prisma.admin.create({
//         data:{
//             username:"admin",
//             password:"admin",
//         }
//     })
// }
// addAdmin();
app.use("/login", loginRoute);
app.use("/admin", adminRoute);
app.use("/voter", voterRoute);
app.use("/voting", votingRoute);
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);;
})