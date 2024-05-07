import express from "express";
import { verifyToken } from "../utils/auth";
const router = express.Router();
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
router.get("/voterDetails/", verifyToken, async (req, res) => {
    try {
        let id=req.user.id
      const voter = await prisma.voter.findUnique({
        where: {
          id: Number(id)
        }
      });
      
      if (!voter) {
        return res.status(404).send("Voter not found");
      }
      
      res.send(voter);
    } catch (error) {
      console.error("Error fetching voter details:", error);
      res.status(500).send("Failed to fetch voter details. Please try again later.");
    }
  });
router.post("/", async (req, res) => {
    const { name, dob, phoneNumber, aadharNo, password, nationality } = req.body;
    const voterDob = new Date(dob);
    const today = new Date();
    const voterAge = today.getFullYear() - voterDob.getFullYear();

    // Check if the voter is eligible
    if (voterAge < 18 || nationality !== 'Indian') {
        return res.status(400).send("You are not eligible to register as a voter.");
    }

    // Check if another voter with the same Aadhar no is already registered
    const existingVoter = await prisma.voter.findUnique({
        where: {
            aadharno: aadharNo
        }
    });

    if (existingVoter) {
        return res.status(400).send("Another voter with the same Aadhar number is already registered.");
    }

    // Create a new voter
    const newVoter = await prisma.voter.create({
        data: {
            name: name,
            dob: voterDob,
            phonenumber: phoneNumber,
            aadharno: aadharNo,
            password: password,
            nationality: nationality,

        }
    });

    res.status(201).send({ message: "Registration successful.", voter: newVoter });
});

export default router;