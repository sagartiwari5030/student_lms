const College = require("../models/College");

const predictColleges = async (req, res) => {
    const { rank, category, gender, quota } = req.body; // Removed 'program'

    try {
        // Build the filter object dynamically
        const filter = {
            ...(category && { seat_type: category }),
            ...(gender && { gender }),
            ...(quota && { quota }),
            closing_rank: { $gte: rank }, // User rank <= closing rank
        };

        // Query the database with sorting
        const results = await College.find(filter).sort({ closing_rank: -1 }); // Sort by closing_rank in descending order

        if (results.length > 0) {
            res.status(200).json(results);
        } else {
            res.status(404).json({ message: "No matching colleges found." });
        }
    } catch (error) {
        console.error("Error fetching predictions:", error);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { predictColleges };
