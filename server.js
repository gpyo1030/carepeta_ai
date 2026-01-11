// Import necessary packages
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Express app and Google Generative AI
const app = express();
const port = 3000;

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Enable parsing of JSON request bodies

// API endpoint for getting AI advice
app.post('/api/get-advice', async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        // Get the generative model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        // Generate content
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();

        // Send the generated text back to the client
        res.json({ advice: text });

    } catch (error) {
        console.error('Error generating AI advice:', error);
        res.status(500).json({ error: 'Failed to generate AI advice' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
