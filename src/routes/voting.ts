import express from "express";
const router = express.Router();
import { PrismaClient } from '@prisma/client'
import { verifyToken } from "../utils/auth";
const prisma = new PrismaClient();

router.get("/",verifyToken, async (req, res) => {
    let data = await prisma.candidate.findMany({
        orderBy: { fullName: 'asc' }
    });
    res.send({ data });
})
export default router;

router.post("/",verifyToken, async (req, res) => {
    const candidateId = req.body;
    await prisma.candidate.update({
        where: {
            id: candidateId,
        },
        data: {
            totalvotes: { increment: 1 }
        }
    })
    await prisma.votes.create({
        data: {
            voterid: req.user.id,
            candidateid: candidateId,
        }
    });
    const updatedVoter = await prisma.voter.update({
        where: { id: req.user.id }, // Assuming you have user information in the request
        data: { isvoted: true }
    });
    res.redirect("/voting/success?candidateId=" + candidateId);

})
router.get("/success", async (req, res) => {
    try {
        const { candidateId } = req.query;
        // Fetch details of the candidate voted for
        const candidate = await prisma.candidate.findUnique({
            where: { id: Number(candidateId) }
        });

        // Render the voting success page and pass the candidate details to the template
        res.render("votingSuccess", { candidate });
    } catch (error) {
        console.error("Error fetching candidate details:", error);
        res.status(500).send("Internal Server Error");
    }
});