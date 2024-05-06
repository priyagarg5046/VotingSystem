"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const client_1 = require("@prisma/client");
const auth_1 = require("../utils/auth");
const prisma = new client_1.PrismaClient();
router.get("/", auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.isvoted) {
        return res.send("already voted");
    }
    let data = yield prisma.candidate.findMany({
        orderBy: { fullName: 'asc' }
    });
    console.log(data);
    res.send(data);
}));
router.post("/", auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { candidateId } = req.body;
    console.log(candidateId.candidateId);
    yield prisma.candidate.update({
        where: {
            id: Number(candidateId),
        },
        data: {
            totalvotes: { increment: 1 }
        }
    });
    yield prisma.votes.create({
        data: {
            voterid: req.user.id,
            candidateid: candidateId,
        }
    });
    const updatedVoter = yield prisma.voter.update({
        where: { id: req.user.id }, // Assuming you have user information in the request
        data: { isvoted: true }
    });
    req.user.isvoted = true;
    res.send("voting done");
    // res.redirect("/voting/success?candidateId=" + candidateId);
}));
router.get("/success", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { candidateId } = req.query;
        // Fetch details of the candidate voted for
        const candidate = yield prisma.candidate.findUnique({
            where: { id: Number(candidateId) }
        });
        // Render the voting success page and pass the candidate details to the template
        res.render("votingSuccess", { candidate });
    }
    catch (error) {
        console.error("Error fetching candidate details:", error);
        res.status(500).send("Internal Server Error");
    }
}));
exports.default = router;
