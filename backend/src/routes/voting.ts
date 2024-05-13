import express from "express";
const router = express.Router();
import { PrismaClient } from '@prisma/client'
import { verifyToken } from "../utils/auth";
const prisma = new PrismaClient();

router.get("/",verifyToken, async (req, res) => {
    if(req.user.isvoted){
        return res.send("already voted");
    }
    let data = await prisma.candidate.findMany({
        orderBy: { fullName: 'asc' }
    });
    console.log(data);
    res.send(data);
})
router.get("/voterDetails",verifyToken,async (req, res) => {
    try {
        let id=req.user.id
        console.log(id);
      const data = await prisma.voter.findUnique({
        where: {
          id: Number(id)
        }
      });
      
      if (!data) {
        return res.status(404).send("Voter not found");
      }
      console.log(data);
      res.send(data);
    } catch (error) {
      console.error("Error fetching voter details:", error);
      res.status(500).send("Failed to fetch voter details. Please try again later.");
    }
  });

router.post("/",verifyToken, async (req, res) => {
    const {candidateId} = req.body;
    console.log(candidateId.candidateId);
    await prisma.candidate.update({
        where: {
            id: Number(candidateId),
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
    req.user.isvoted=true;
    res.send("voting done");
    // res.redirect("/voting/success?candidateId=" + candidateId);

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
export default router;