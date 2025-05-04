const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

function sendMessage() {
    let message = userInput.value;
    if (message.trim() === "") return;

    let userMessage = `<p><strong>Você:</strong> ${message}</p>`;
    chatBox.innerHTML += userMessage;

    let botResponse = getBotResponse(message);
    chatBox.innerHTML += `<p><strong>Bot FURIA:</strong> ${botResponse}</p>`;

    userInput.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotResponse(message) {
    message = message.toLowerCase();
    
    if (message.includes("jogo")) return "O próximo jogo da FURIA será contra [Equipe] às [horário]! 🎮🔥";
    if (message.includes("torcida")) return "Simulando torcida... Vamos FURIA! 🦊🔥🔥";
    return "Não entendi... Pergunte sobre jogos ou a torcida!";
}
