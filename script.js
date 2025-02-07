// DOM Elements
const chatbotBody = document.getElementById('chatbot-body');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const newChatBtn = document.getElementById('new-chat-btn');
const removeChatBtn = document.getElementById('remove-chat-btn');
const darkModeToggle = document.getElementById('dark-mode-toggle');

// Gemini API Configuration
const fetchAIResponse = async (query) => {
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes("your name")||lowerQuery.includes("name")) {
      return "My name is Sanaullah AI.";
    } else if (lowerQuery.includes("your age") || lowerQuery.includes("age")) {
      return "I am 21 years old.";
    } else if (lowerQuery.includes("tell me about yourself") || lowerQuery.includes("about yourself")||lowerQuery.includes("about you")) {
      return "I am a large language model, trained by SANAULLAH. I can process information and respond to a wide range of prompts and questions, generating text in response. My name is Sunny AI. I am 21 years old. Trained by Sanaullah, a student of BSCS in Abasyn University Islamabad.";
    } else if (lowerQuery.includes("your university") || lowerQuery.includes("where you study") || lowerQuery.includes("your study") || lowerQuery.includes("what do you do")) {
      return "I study at Abasyn University Islamabad Campus.";
    } else if (lowerQuery.includes("your study") || lowerQuery.includes("what do you study")) {
      return "I am a student of BSCS.";
    }
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
