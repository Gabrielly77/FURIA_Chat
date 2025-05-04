const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

let userName = null;
let state = "initial"; // 'initial', 'awaiting_name', 'chatting'

function sendMessage() {
  const message = userInput.value.trim();
  if (message === "") return;

  appendMessage("Você", message);
  processMessage(message);
  userInput.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
}

function appendMessage(sender, message) {
  const messageElement = document.createElement("p");
  messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(messageElement);
}

function detectLanguage(text) {
  const englishWords = ["hello", "hi", "good morning", "good afternoon", "good evening"];
  const portugueseWords = ["oi", "olá", "bom dia", "boa tarde", "boa noite"];

  const lowerText = text.toLowerCase();

  if (englishWords.some(word => lowerText.includes(word))) {
    return "en";
  } else if (portugueseWords.some(word => lowerText.includes(word))) {
    return "pt";
  } else {
    return "pt"; // Default to Portuguese
  }
}

function processMessage(message) {
  const lang = detectLanguage(message);
  const lowerMessage = message.toLowerCase();

  if (state === "initial") {
    if (["oi", "olá", "ola", "bom dia", "boa tarde", "boa noite", "hello", "hi", "good morning", "good afternoon", "good evening"].some(greeting => lowerMessage.includes(greeting))) {
      appendMessage("Pantera Furiosa", lang === "en" ? "Hello! What's your name?" : "Olá! Qual é o seu nome?");
      state = "awaiting_name";
    } else {
      appendMessage("Pantera Furiosa", lang === "en" ? "Hello! Please say 'hi' to start." : "Olá! Para começarmos, por favor, diga 'oi'.");
    }
  } else if (state === "awaiting_name") {
    userName = message;
    appendMessage("Pantera Furiosa", lang === "en" ? `Nice to meet you, ${userName}! How can I assist you today?` : `Prazer em conhecê-lo, ${userName}! Como posso ajudá-lo hoje?`);
    state = "chatting";
  } else if (state === "chatting") {
    if (lowerMessage === "1") {
      appendMessage("Pantera Furiosa", lang === "en" ? "Fetching upcoming matches..." : "Buscando próximos jogos...");
      // Implement fetchUpcomingMatches() here
    } else if (lowerMessage === "2") {
      appendMessage("Pantera Furiosa", lang === "en" ? "Simulating cheering... Let's go FURIA! 🦊🔥🔥" : "Simulando torcida... Vamos FURIA! 🦊🔥🔥");
    } else if (lowerMessage === "3") {
      appendMessage("Pantera Furiosa", lang === "en" ? "Fetching team statistics..." : "Buscando estatísticas do time...");
      // Implement fetchTeamStats() here
    } else if (lowerMessage === "4") {
      appendMessage("Pantera Furiosa", lang === "en" ? "FURIA is a Brazilian esports organization known for its CS:GO team." : "FURIA é uma organização brasileira de esports, conhecida por sua equipe de CS:GO.");
    } else if (lowerMessage === "5") {
      appendMessage("Pantera Furiosa", lang === "en" ? "FURIA fe is the female team of the FURIA organization." : "FURIA fe é a equipe feminina da organização FURIA.");
    } else {
      appendMessage("Pantera Furiosa", lang === "en" ? "Sorry, I didn't understand. Please enter '1' for upcoming matches, '2' for cheering, '3' for statistics, '4' for team info, or '5' for FURIA fe info." : "Desculpe, não entendi. Você pode digitar '1' para próximos jogos, '2' para torcida, '3' para estatísticas, '4' para informações do time ou '5' para informações da FURIA fe.");
    }
  }
}

// Event listener for Enter key
userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});
