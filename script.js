// --- GPT Chat Widget Logic (Updated for real API call) ---
document.addEventListener('DOMContentLoaded', function() {
    // Initialize elements after DOM is loaded
const gptChatWidget = document.getElementById('gpt-chat-widget');
const gptChatToggle = document.getElementById('gpt-chat-toggle');
const gptChatBody = document.getElementById('gpt-chat-body');
const gptInput = document.getElementById('gpt-input');

    // Add debug logs
    console.log('Debug: Chat widget elements loaded');
    console.log('Debug: gptChatWidget exists:', !!gptChatWidget);
    console.log('Debug: gptChatToggle exists:', !!gptChatToggle);
    console.log('Debug: gptChatBody exists:', !!gptChatBody);
    console.log('Debug: gptInput exists:', !!gptInput);

    // Add event listener for Enter key
    if (gptInput) {
        gptInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                sendGptMessage();
            }
        });
    }

// Function to toggle chat visibility
    window.toggleGptChat = function() {
    if (!gptChatWidget || !gptChatToggle) return;
    if (gptChatWidget.classList.contains('visible')) {
        gptChatWidget.classList.remove('visible');
        gptChatToggle.classList.remove('hidden');
    } else {
        gptChatWidget.classList.add('visible');
        gptChatToggle.classList.add('hidden');
        if (gptInput) gptInput.focus();
    }
    };

// Function to append messages to the chat body
function appendGptMessage(role, text) {
    if (!gptChatBody) return;
    const msg = document.createElement("div");
    msg.classList.add('gpt-message', role);
    msg.innerText = text;
    gptChatBody.appendChild(msg);
    gptChatBody.scrollTop = gptChatBody.scrollHeight;
    return msg;
}

// Function to send user message to GPT API
    window.sendGptMessage = async function() {
    if (!gptInput || !gptChatBody) return;
    const message = gptInput.value.trim();
    if (!message) return;

    appendGptMessage("user", message);
    gptInput.value = "";
    const loadingMsg = appendGptMessage("bot", "...חושב על תשובה");
    loadingMsg.classList.add('loading');

    try {
        const res = await fetch("https://orelagantmoney-cs3k6lxd--oreli123s-projects.vercel.app/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message,
                client_id: "shira_tours"
            })
        });

        const data = await res.json();
        loadingMsg.innerText = data.reply || "לא התקבלה תשובה";
        loadingMsg.classList.remove('loading');
    } catch (err) {
        loadingMsg.innerText = "אירעה שגיאה בעת קבלת תשובה. נסה שוב.";
        loadingMsg.classList.remove('loading');
        loadingMsg.classList.add('error');
    }
    };

    console.log('Chat widget fully initialized');
});
