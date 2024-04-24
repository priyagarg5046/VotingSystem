import express from "express";
const router = express.Router();
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
router.get("/", async (req, res) => {
    const result = await prisma.candidate.findMany()
    res.send(result);
})

router.post("/", async (req, res) => {
    const { fullname, nationality, dob, partyName, partyLogo } = req.body;
    console.log(dob);
    let candidateY = new Date(dob);
    console.log()
    let today = new Date();
    const candidateAge = today.getFullYear() - candidateY.getFullYear();
    console.log(candidateAge);
    // console.log(nationality);

    if (nationality !== "Indian" || candidateAge <= 35) {
        return res.send("you're not egligible");
    }
    // console.log("egligible");
    else {
        let result = await prisma.candidate.create({
            data: {
                fullName: fullname,
                dob: candidateY,
                nationality: nationality,
                partyname: partyName,
                partylogo: partyLogo,
            }
        })
        res.send(result);
    }

})

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const { name, partyname, logo } = req.body;
    let result = await prisma.candidate.update({
        where: {
            id: Number(id),
        },
        data: {
            fullName: name,
            partyname: partyname,
            partylogo: logo,
        }
    })
    res.send({ result: result });
})
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    let candidate = prisma.candidate.findUnique({
        where: { id: Number(id) },
        include: {
            votes: true,
        }
    })
    if (!candidate) {
        return res.send("candidate not found");
    }
    const totalVotes = candidate.votes.length;
    const halfTotalVotes = Math.ceil(totalVotes / 2);
    if (totalVotes < halfTotalVotes) {
        await prisma.candidate.delete({
            where: {
                id: Number(id),
            },
        });
        res.send("Candidate deleted successfully.");
    }
    else {
        res.status(403).send("Cannot delete candidate with more than half of the total votes.")
    }


})

export default router;