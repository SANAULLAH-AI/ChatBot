// DOM Elements
const chatbotBody = document.getElementById('chatbot-body');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const newChatBtn = document.getElementById('new-chat-btn');
const removeChatBtn = document.getElementById('remove-chat-btn');
const darkModeToggle = document.getElementById('dark-mode-toggle');

// Gemini API Configuration
const apiKey = 'AIzaSyCUWYUKcqkkFWwzZ7tootHpfHWFZzqU_lg';
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

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

// Function to send a message to the Gemini API
async function sendMessage() {
    const userMessage = chatInput.value.trim();
    if (userMessage) {
        appendMessage(userMessage, 'user');
        chatInput.value = '';

        try {
            const botResponse = await fetchBotResponse(userMessage);
            appendMessage(botResponse, 'bot');
        } catch (error) {
            appendMessage('Error: Unable to fetch response.', 'bot');
            console.error('Error:', error);
        }
    }
}

// Function to fetch bot response from Gemini API
async function fetchBotResponse(userMessage) {
    const requestBody = {
        contents: [
            {
                role: 'user',
                parts: [
                    {
                        text: userMessage,
                    },
                ],
            },
        ],
    };

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
}

// Function to append a message to the chat
function appendMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = message;
    chatbotBody.appendChild(messageElement);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
}
