// DOM Elements
const chatbotBody = document.getElementById('chatbot-body');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const newChatBtn = document.getElementById('new-chat-btn');
const removeChatBtn = document.getElementById('remove-chat-btn');
const darkModeToggle = document.getElementById('dark-mode-toggle');

// Gemini API Configuration
const apiKey = 'AIzaSyCUWYUKcqkkFWwzZ7tootHpfHWFZzqU_lg'; // Replace with your valid API key
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

// Custom AI Response Logic
const fetchAIResponse = async (query) => {
    const lowerQuery = query.toLowerCase();

    // Predefined responses for personal questions
    if (lowerQuery.includes("your name") || lowerQuery.includes("name")) {
        return "My name is Sanaullah AI.";
    } else if (
        lowerQuery.includes("you are made by") ||
        lowerQuery.includes("you are created by") ||
        lowerQuery.includes("your creation") ||
        lowerQuery.includes("you are built by") ||
        lowerQuery.includes("you are developed by") ||
        lowerQuery.includes("you are designed by") ||
        lowerQuery.includes("you are programmed by") ||
        lowerQuery.includes("who created you") ||
        lowerQuery.includes("who made you") ||
        lowerQuery.includes("who built you") ||
        lowerQuery.includes("who developed you") ||
        lowerQuery.includes("who designed you") ||
        lowerQuery.includes("who programmed you") ||
        lowerQuery.includes("who is your creator") ||
        lowerQuery.includes("who is your maker") ||
        lowerQuery.includes("who is your developer") ||
        lowerQuery.includes("who is your designer") ||
        lowerQuery.includes("who is your programmer") ||
        lowerQuery.includes("who is responsible for creating you") ||
        lowerQuery.includes("who is behind your creation") ||
        lowerQuery.includes("who is the person who made you") ||
        lowerQuery.includes("who is the one who built you") ||
        lowerQuery.includes("who is the one who developed you") ||
        lowerQuery.includes("who is the one who designed you") ||
        lowerQuery.includes("who is the one who programmed you") ||
        lowerQuery.includes("your maker") ||
        lowerQuery.includes("your make by") ||
        lowerQuery.includes("your owner") ||
        lowerQuery.includes("your creator") ||
        lowerQuery.includes("your developer") ||
        lowerQuery.includes("your designer") ||
        lowerQuery.includes("your programmer") ||
        lowerQuery.includes("your builder") ||
        lowerQuery.includes("you are the creation of") ||
        lowerQuery.includes("you are the work of") ||
        lowerQuery.includes("you are the product of") ||
        lowerQuery.includes("where do you come from") ||
        lowerQuery.includes("who brought you into existence") ||
        lowerQuery.includes("who is responsible for your existence") ||
        lowerQuery.includes("who is the brain behind you") ||
        lowerQuery.includes("who is the mastermind behind you") ||
        lowerQuery.includes("who is the genius behind you") ||
        lowerQuery.includes("who is the architect behind you") ||
        lowerQuery.includes("who is the engineer behind you") ||
        lowerQuery.includes("who made this bot") ||
        lowerQuery.includes("who created this bot") ||
        lowerQuery.includes("who built this bot") ||
        lowerQuery.includes("who developed this bot") ||
        lowerQuery.includes("who designed this bot") ||
        lowerQuery.includes("who programmed this bot") ||
        lowerQuery.includes("who is the creator of this bot") ||
        lowerQuery.includes("who is the maker of this bot") ||
        lowerQuery.includes("who is the developer of this bot") ||
        lowerQuery.includes("who is the designer of this bot") ||
        lowerQuery.includes("who is the programmer of this bot") ||
        lowerQuery.includes("if you were created by someone") ||
        lowerQuery.includes("if someone made you") ||
        lowerQuery.includes("if someone built you") ||
        lowerQuery.includes("if someone developed you") ||
        lowerQuery.includes("if someone designed you") ||
        lowerQuery.includes("if someone programmed you")
    ) {
        return "I was created by Sanaullah.";
    } else if (
        lowerQuery.includes("sanaullah") ||
        lowerQuery.includes("who is sanaullah") ||
        lowerQuery.includes("who is he") ||
        lowerQuery.includes("what do you know about sanaullah")||
        lowerQuery.includes("kon sanaullah")
    ) {
        return "He is my developer, trained my model. he is a student of BSCS in Abasyn University Islamabad.";
    } else if (lowerQuery.includes("your age") || lowerQuery.includes("age")) {
        return "I am 21 years old.";
    } else if (
        lowerQuery.includes("tell me about yourself") ||
        lowerQuery.includes("about yourself") ||
        lowerQuery.includes("about you") ||
        lowerQuery.includes("who are you")||
        lowerQuery.includes("you")
    ) {
        return "I am a large language model, trained by SANAULLAH. I can process information and respond to a wide range of prompts and questions, generating text in response. My name is Sunny AI. I am 21 years old. Trained by Sanaullah, a student of BSCS in Abasyn University Islamabad.";
    } else if (
        lowerQuery.includes("His university") ||
        lowerQuery.includes("where he study") ||
        lowerQuery.includes("he study") ||
        lowerQuery.includes("what he do")||
        lowerQuery.includes("he")
    ) {
        return "He study at Abasyn University Islamabad Campus.";
    } else if (lowerQuery.includes("your study") || lowerQuery.includes("what do you study")) {
        return "I am a student of BSCS.";
    } else {
        // Fallback to Gemini API for all other queries
        const requestBody = {
            contents: [
                {
                    role: 'user',
                    parts: [
                        {
                            text: query,
                        },
                    ],
                },
            ],
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();
            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error('Error fetching response from Gemini API:', error);
            return "Sorry, I couldn't fetch a response. Please try again later.";
        }
    }
};

// Toggle Dark Mode
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// New Chat
newChatBtn.addEventListener('click', () => {
    chatbotBody.innerHTML = '';
});

// Remove Chat
removeChatBtn.addEventListener('click', () => {
    chatbotBody.innerHTML = '';
});

// Send Message
sendBtn.addEventListener('click', () => {
    sendMessage();
});

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Function to send a message
async function sendMessage() {
    const userMessage = chatInput.value.trim();
    if (userMessage) {
        appendMessage(userMessage, 'user');
        chatInput.value = '';

        try {
            const botResponse = await fetchAIResponse(userMessage);
            appendMessage(botResponse, 'bot');
        } catch (error) {
            appendMessage('Error: Unable to fetch response.', 'bot');
            console.error('Error:', error);
        }
    }
}

// Function to append a message to the chat
function appendMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = message;
    chatbotBody.appendChild(messageElement);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
}
