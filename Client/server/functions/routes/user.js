const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

// Correctly defined route handler
router.get("/", (req, res) => {
    return res.send("Inside the user router");
});

router.get("/jwtVerification", async (req, res) => {
    try {
        if (!req.headers.authorization) {
            return res.status(500).send({ msg: "Token Not found" });
        }

        const token = req.headers.authorization.split(" ")[1];
        const decodeValue = await admin.auth().verifyIdToken(token);

        // Continue with your logic after successfully decoding the token
        return res.status(200).json({ success: true, data: decodeValue });
    } catch (error) {
        // Handle errors during token verification
        console.error("Error verifying token:", error);
        return res.status(401).json({ success: false, msg: "Unauthorized access" });
    }
});

module.exports = router;