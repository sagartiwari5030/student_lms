const express = require("express");
const { predictColleges } = require("../controllers/predictController");
const router = express.Router();

// Route for predicting colleges
// router.get("/", (req, res) => {
//     res.status(200).json({ message: "Predict route is working" });
// });
router.post("/", predictColleges);


module.exports = router;
