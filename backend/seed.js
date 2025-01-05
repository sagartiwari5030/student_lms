const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const csv = require("csv-parser");
const College = require("./models/College");

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Seed Database
const seedDatabase = async () => {
    try {
        const colleges = [];
        fs.createReadStream("./data/2024jeemains_data.csv") // Path to your CSV file
            .pipe(csv())
            .on("data", (row) => {
                // Validate and process the data
                const openingRank = Number(row["Opening Rank"]);
                const closingRank = Number(row["Closing Rank"]);

                // Skip rows with invalid rank values
                if (
                    row["Institute"] &&
                    row["Academic Program Name"] &&
                    row["Quota"] &&
                    row["Seat Type"] &&
                    row["Gender"] &&
                    !isNaN(openingRank) &&
                    !isNaN(closingRank)
                ) {
                    colleges.push({
                        institute: row["Institute"],
                        program: row["Academic Program Name"],
                        quota: row["Quota"],
                        seat_type: row["Seat Type"],
                        gender: row["Gender"],
                        opening_rank: openingRank,
                        closing_rank: closingRank,
                    });
                } else {
                    console.warn("Skipped row due to invalid or missing data:", row);
                }
            })
            .on("end", async () => {
                try {
                    await College.insertMany(colleges);
                    console.log("Database seeded successfully!");
                } catch (err) {
                    console.error("Error inserting data:", err);
                } finally {
                    process.exit();
                }
            });
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDatabase();
