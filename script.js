const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
let userName = null;

// Pergunta o nome do usuário antes de começar
function askUserName() {
    appendMessage("Pantera Furiosa", "Olá! 🦊 Antes de começarmos, qual é o seu nome?");
}

// Envio automático ao pressionar Enter
userInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});

function sendMessage() {
    const message = userInput.value.trim();
    if (message === "") return;

    // Se o usuário ainda não informou o nome, pede novamente
    if (!userName) {
        userName = message;
        appendMessage("Pantera Furiosa", `Prazer em te conhecer, ${userName}! 😃🔥 Como posso te ajudar hoje?`);
        showOptions();
    } else {
        appendMessage(`${userName}`, message);
        processMessage(message);
    }

    userInput.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
}

function appendMessage(sender, message) {
    const messageElement = document.createElement("p");
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(messageElement);
}

// Simulador de Torcida e interações inteligentes
function processMessage(message) {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("vamos furia") || lowerMessage.includes("bora furia")) {
        appendMessage("Pantera Furiosa", "🔥🔥🔥 BORA PRA CIMA, FURIAAAA! 🔥🔥🔥");
        return;
    }

    switch (lowerMessage) {
        case "1":
            fetchUpcomingMatches();
            break;
        case "2":
            appendMessage("Pantera Furiosa", "🔥🔥🔥 Bora apoiar o time, torcida FURIA! 🔥🔥🔥");
            break;
        case "3":
            fetchTeamStats();
            break;
        case "4":
            appendMessage("Pantera Furiosa", "FURIA é uma organização brasileira de esports, conhecida por sua equipe de CS:GO.");
            break;
        case "5":
            appendMessage("Pantera Furiosa", "FURIA Fé é a equipe feminina da organização FURIA.");
            break;
        case "6":
            appendMessage("Pantera Furiosa", "⚡ Status do jogo ao vivo: **FURIA vs The MongolZ - 10 de maio de 2025 às 01:00 (MD3)** 🔥");
            break;
        case "7":
            appendMessage("Pantera Furiosa", "Jogadores da FURIA: FalleN, yuurih, KSCERATO, molodoy, YEKINDAR.");
            break;
        default:
            showOptions();
    }
}

// Exibir opções disponíveis
function showOptions() {
    const options = "📌 1 - Próximos Jogos\n📌 2 - Torcida\n📌 3 - Estatísticas\n📌 4 - Informações do Time\n📌 5 - Furia Fé\n📌 6 - Partida ao Vivo\n📌 7 - Jogadores da Furia";
    appendMessage("Pantera Furiosa", `O que você quer saber, ${userName}? 😉\n\n${options}`);
}

// Simular próximos jogos
function fetchUpcomingMatches() {
    appendMessage("Pantera Furiosa", "Próximo jogo: FURIA vs The MongolZ em 10 de maio de 2025 às 01:00 (MD3).");
}

// Simular estatísticas do time
function fetchTeamStats() {
    appendMessage("Pantera Furiosa", "Estatísticas recentes da FURIA: Rating 2.1: 1.05, K/D: 1.02.");
}

// Inicia a conversa perguntando o nome do usuário
askUserName();



