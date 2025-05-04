const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

let userName = null;
let state = "initial"; // Estados possíveis: 'initial', 'awaiting_name', 'chatting'
let currentLanguage = "pt"; // Idioma padrão: 'pt' para Português, 'en' para Inglês

// Enviar mensagem ao pressionar Enter
userInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    sendMessage();
  }
});

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

function detectLanguage(message) {
  const lowerMessage = message.toLowerCase();
  const englishGreetings = ["hello", "hi", "good morning", "good afternoon", "good evening"];
  const portugueseGreetings = ["oi", "olá", "ola", "bom dia", "boa tarde", "boa noite"];

  if (englishGreetings.some(greeting => lowerMessage.includes(greeting))) {
    return "en";
  } else if (portugueseGreetings.some(greeting => lowerMessage.includes(greeting))) {
    return "pt";
  } else {
    return currentLanguage; // Mantém o idioma atual se não detectar
  }
}

function processMessage(message) {
  const lowerMessage = message.toLowerCase();
  currentLanguage = detectLanguage(message);

  if (state === "initial") {
    if (["oi", "olá", "ola", "bom dia", "boa tarde", "boa noite", "hello", "hi", "good morning", "good afternoon", "good evening"].some(greeting => lowerMessage.includes(greeting))) {
      const greeting = currentLanguage === "pt" ? "Olá! Qual é o seu nome?" : "Hello! What's your name?";
      appendMessage("Pantera Furiosa", greeting);
      state = "awaiting_name";
    } else {
      const prompt = currentLanguage === "pt" ? "Olá! Para começarmos, por favor, diga 'oi'." : "Hello! To start, please say 'hi'.";
      appendMessage("Pantera Furiosa", prompt);
    }
  } else if (state === "awaiting_name") {
    userName = message;
    const welcome = currentLanguage === "pt"
      ? `Prazer em conhecê-lo, ${userName}! Como posso ajudá-lo hoje?`
      : `Nice to meet you, ${userName}! How can I assist you today?`;
    appendMessage("Pantera Furiosa", welcome);
    showOptions();
    state = "chatting";
  } else if (state === "chatting") {
    switch (lowerMessage) {
      case "1":
        fetchUpcomingMatches();
        break;
      case "2":
        const cheer = currentLanguage === "pt"
          ? "Boraaaaaaa pra cima FURIA! 🦊🔥🔥"
          : "Simulating cheering... Go FURIA! 🦊🔥🔥";
        appendMessage("Pantera Furiosa", cheer);
        break;
      case "3":
        fetchTeamStats();
        break;
      case "4":
        const info = currentLanguage === "pt"
          ? "FURIA é uma organização brasileira de esports, conhecida por sua equipe de CS:GO."
          : "FURIA is a Brazilian esports organization, known for its CS:GO team.";
        appendMessage("Pantera Furiosa", info);
        break;
      case "5":
        const infoFe = currentLanguage === "pt"
          ? "FURIA fe é a equipe feminina da organização FURIA."
          : "FURIA fe is the female team of the FURIA organization.";
        appendMessage("Pantera Furiosa", infoFe);
        break;
      case "6":
        const liveMatch = currentLanguage === "pt"
          ? "Função ainda em desenvolvimento."
          : "Function still under development.";
        appendMessage("Pantera Furiosa", liveMatch);
        break;
      case "7":
        const players = currentLanguage === "pt"
          ? "Jogadores atuais da FURIA: FalleN, yuurih, KSCERATO, molodoy, YEKINDAR."
          : "Current FURIA players: FalleN, yuurih, KSCERATO, molodoy, YEKINDAR.";
        appendMessage("Pantera Furiosa", players);
        break;
      default:
        const defaultMsg = currentLanguage === "pt"
          ? "Desculpe, não entendi. Você pode digitar:\n1 - Próximos jogos\n2 - Torcida\n3 - Estatísticas\n4 - Informações do time\n5 - FURIA fe\n6 - Partida ao vivo\n7 - Jogadores da FURIA"
          : "Sorry, I didn't understand. You can type:\n1 - Upcoming matches\n2 - Cheering\n3 - Statistics\n4 - Team information\n5 - FURIA fe\n6 - Live match\n7 - FURIA players";
        appendMessage("Pantera Furiosa", defaultMsg);
    }
  }
}

function showOptions() {
  const options = currentLanguage === "pt"
    ? "Escolha uma opção:\n1 - Próximos jogos\n2 - Torcida\n3 - Estatísticas\n4 - Informações do time\n5 - FURIA fe\n6 - Partida ao vivo\n7 - Jogadores da FURIA"
    : "Choose an option:\n1 - Upcoming matches\n2 - Cheering\n3 - Statistics\n4 - Team information\n5 - FURIA fe\n6 - Live match\n7 - FURIA players";
  appendMessage("Pantera Furiosa", options);
}

function fetchUpcomingMatches() {
  const matchInfo = currentLanguage === "pt"
    ? "Próximo jogo: FURIA vs The MongolZ em 10 de maio de 2025 às 01:00 (MD3) pelo PGL Astana 2025."
    : "Upcoming match: FURIA vs The MongolZ on May 10, 2025 at 01:00 (BO3) for PGL Astana 2025.";
  appendMessage("Pantera Furiosa", matchInfo);
}

function fetchTeamStats() {
  const statsMessage = currentLanguage === "pt"
    ? "Estatísticas recentes da FURIA: Rating 2.1: 1.05, K/D: 1.02"
    : "Recent statistics of FURIA: Rating 2.1: 1.05, K/D: 1.02";
  appendMessage("Pantera Furiosa", statsMessage);
}

