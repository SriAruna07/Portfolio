require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected successfully!"))
    .catch((error) => console.log("MongoDB connection error:", error));

    const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Contact = mongoose.model("Contact", contactSchema);

app.use(express.json());
app.use(cors());
app.use(express.static(_dirname));

app.get("/", (req, res) => {
    res.send("Portfolio backend is running!");
});
app.post("/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const newContact = new Contact({
            name: name,
            email: email,
            message: message
        });

        await newContact.save();

        console.log("Contact message saved to MongoDB!");

        res.json({
            message: "Your message was received successfully!"
        });

    } catch (error) {
        console.log("Error saving contact message:", error);

        res.status(500).json({
            message: "Something went wrong."
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

