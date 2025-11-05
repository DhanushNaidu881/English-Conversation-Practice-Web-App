const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const resetBtn = document.getElementById("resetBtn");

const replies = [
  "Hello! How are you feeling today?",
  "What did you do today?",
  "Do you enjoy reading books? Which one is your favorite?",
  "What kind of movies do you like?",
  "Have you ever traveled to another country?",
  "What is your favorite food?",
  "Do you like cooking? What do you cook most often?",
  "Are you more of a morning person or a night owl?",
  "Do you have any pets? Tell me about them.",
  "What hobbies do you enjoy in your free time?",
  "Do you enjoy sports? Which one is your favorite?",
  "Have you ever tried a new hobby recently?",
  "What music do you like to listen to?",
  "Do you play any musical instruments?",
  "Do you prefer tea or coffee?",
  "What's your favorite season and why?",
  "Do you enjoy painting or drawing?",
  "What is your dream job?",
  "Have you ever attended a live concert?",
  "Do you like video games? Which ones?",
  "Do you enjoy dancing?",
  "What’s your favorite way to relax after a busy day?",
  "Do you like spending time outdoors?",
  "Have you ever gone hiking or camping?",
  "Do you enjoy writing stories or poems?",
  "What’s your favorite subject at school?",
  "Do you like learning new languages?",
  "Have you ever tried extreme sports?",
  "Do you like surprises?",
  "What’s your favorite holiday destination?",
  "Do you enjoy shopping?",
  "Have you ever tried cooking a new recipe?",
  "Do you like watching TV series? Which one is your favorite?",
  "What’s your favorite childhood memory?",
  "Do you enjoy volunteering or helping others?",
  "What makes you happy?",
  "Do you like listening to podcasts?",
  "Have you ever tried meditation or yoga?",
  "Do you enjoy solving puzzles or brain games?",
  "What is one skill you want to learn this year?",
  "Do you prefer books or movies?",
  "Have you ever learned something new online?",
  "Do you enjoy social media? Which platform do you use most?",
  "Have you ever participated in a competition?",
  "What is your favorite way to spend a weekend?",
  "Do you like going to the beach or mountains?",
  "What do you usually do when you feel stressed?",
  "Have you ever learned something from a mistake?",
  "Do you enjoy meeting new people?",
  "What is one interesting fact about yourself?"
];


let step = 0;

// Load chat history
window.onload = () => {
  const savedChat = localStorage.getItem("chatHistory");
  const chatEnded = localStorage.getItem("chatEnded");

  if (chatEnded === "true") {
    localStorage.clear();
    return;
  }

  if (savedChat) {
    chatBox.innerHTML = savedChat;
    chatBox.scrollTop = chatBox.scrollHeight;
  }
};

function isGibberish(text) {
  const trimmed = text.trim();
  if (!trimmed) return true; // empty input is gibberish

  // Allow short proper words
  const allowedShortWords = ["hi", "hello", "hey", "ok", "yes", "no", "bye"];
  if (allowedShortWords.includes(trimmed.toLowerCase())) return false;

  // Count letters and total characters (excluding spaces)
  const letters = trimmed.replace(/[^a-zA-Z]/g, '');
  const total = trimmed.replace(/\s+/g, '');
  if (letters.length / total.length < 0.5) return true; // less than 50% letters

  // Split into words
  const words = trimmed.split(/\s+/);

  // Count words that have 2 or more letters
  const validWords = words.filter(word => {
    const clean = word.replace(/[^a-zA-Z]/g, '');
    // If word is 1–5 letters, consider it gibberish unless in allowedShortWords
    if (clean.length >= 6) return true; 
    return false; 
  });

  // If less than half of the words are valid (>=6 letters), consider gibberish
  if (validWords.length / words.length < 0.5) return true;

  // Check for long random sequences (6+ letters together)
  const longRandom = trimmed.match(/[a-zA-Z]{6,}/g);
  if (longRandom && longRandom.length > 0) return true;

  return false; // passes all checks, not gibberish
}



function addMessage(sender, text) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);
  messageDiv.textContent = text;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  localStorage.setItem("chatHistory", chatBox.innerHTML);
}

function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage("user", text);
  userInput.value = "";

  setTimeout(() => {
    // Gibberish check
    if (isGibberish(text)) {
      addMessage("bot", "Please write properly so I can understand. 🤔");
      return;
    }

    if (step < replies.length) {
      addMessage("bot", replies[step]);
      step++;
    } else {
      addMessage("bot", "That's all for now! You can reset the chat to start again. 😊");
      localStorage.setItem("chatEnded", "true");
    }
  }, 700);
}

// Event listeners
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

// Reset chat
resetBtn.addEventListener("click", () => {
  chatBox.innerHTML = "";
  localStorage.clear();
  step = 0;
});
