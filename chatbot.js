const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { message } = JSON.parse(event.body);
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return {
                statusCode: 500,
                body: JSON.stringify({ reply: "Error: API Key config missing on server!" })
            };
        }

        // Gemini API Endpoint
        const url = https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey};

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: You are a helpful, professional customer service chatbot for 'Rozix' (a business/agency website). Answer the user's question politely and concisely. User asks: ${message} }]
                }]
            })
        });

        const data = await response.json();
        const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Main is waqt samajh nahi paya, baraye meherbani dobara koshish karen.";

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
            },
            body: JSON.stringify({ reply: botReply })
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ reply: "Server error occurred. Please try again later." })
        };
    }
};