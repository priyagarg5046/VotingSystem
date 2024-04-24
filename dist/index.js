"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const admin_1 = __importDefault(require("./routes/admin"));
const login_1 = __importDefault(require("./routes/login"));
const voter_1 = __importDefault(require("./routes/voter"));
const voting_1 = __importDefault(require("./routes/voting"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const PORT = 4444;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("home");
});
// async function addAdmin(){
//     await prisma.admin.create({
//         data:{
//             username:"admin",
//             password:"admin",
//         }
//     })
// }
// addAdmin();
app.use("/login", login_1.default);
app.use("/admin", admin_1.default);
app.use("/voter", voter_1.default);
app.use("/voting", voting_1.default);
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
    ;
});
