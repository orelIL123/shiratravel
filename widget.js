// Simple Chat Widget

document.addEventListener("DOMContentLoaded", function() {
    // Create the chat bubble elements
    createChatElements();
});

function createChatElements() {
    // Create the chat button
    const chatButton = document.createElement('div');
    chatButton.id = 'chat-bubble';
    chatButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';
    chatButton.style.position = 'fixed';
    chatButton.style.bottom = '20px';
    chatButton.style.left = '20px';
    chatButton.style.width = '60px';
    chatButton.style.height = '60px';
    chatButton.style.borderRadius = '50%';
    chatButton.style.backgroundColor = '#25D366';
    chatButton.style.color = 'white';
    chatButton.style.display = 'flex';
    chatButton.style.justifyContent = 'center';
    chatButton.style.alignItems = 'center';
    chatButton.style.cursor = 'pointer';
    chatButton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    chatButton.style.zIndex = '1000';
    chatButton.style.transition = 'all 0.3s ease';

    // Create chat window (initially hidden)
    const chatWindow = document.createElement('div');
    chatWindow.id = 'chat-window';
    chatWindow.style.position = 'fixed';
    chatWindow.style.bottom = '90px';
    chatWindow.style.left = '20px';
    chatWindow.style.width = '300px';
    chatWindow.style.height = '400px';
    chatWindow.style.borderRadius = '10px';
    chatWindow.style.backgroundColor = 'white';
    chatWindow.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    chatWindow.style.zIndex = '1000';
    chatWindow.style.display = 'none';
    chatWindow.style.flexDirection = 'column';
    chatWindow.style.overflow = 'hidden';

    // Chat header
    const chatHeader = document.createElement('div');
    chatHeader.style.backgroundColor = '#25D366';
    chatHeader.style.color = 'white';
    chatHeader.style.padding = '10px';
    chatHeader.style.fontWeight = 'bold';
    chatHeader.style.display = 'flex';
    chatHeader.style.justifyContent = 'space-between';
    chatHeader.style.alignItems = 'center';
    chatHeader.innerHTML = '<span>צ\'אט שירה תיירות</span><span id="close-chat" style="cursor:pointer;">×</span>';

    // Chat body
    const chatBody = document.createElement('div');
    chatBody.style.padding = '10px';
    chatBody.style.height = '300px';
    chatBody.style.overflowY = 'auto';
    chatBody.style.direction = 'rtl';

    // Welcome message
    const welcomeMessage = document.createElement('div');
    welcomeMessage.style.backgroundColor = '#ececec';
    welcomeMessage.style.borderRadius = '5px';
    welcomeMessage.style.padding = '8px';
    welcomeMessage.style.marginBottom = '10px';
    welcomeMessage.style.maxWidth = '80%';
    welcomeMessage.textContent = 'שלום! איך אפשר לעזור לך היום?';
    chatBody.appendChild(welcomeMessage);

    // Chat input area
    const chatInputArea = document.createElement('div');
    chatInputArea.style.display = 'flex';
    chatInputArea.style.padding = '10px';
    chatInputArea.style.borderTop = '1px solid #ececec';

    const chatInput = document.createElement('input');
    chatInput.type = 'text';
    chatInput.placeholder = 'הקלד הודעה...';
    chatInput.style.flex = '1';
    chatInput.style.padding = '8px';
    chatInput.style.border = '1px solid #ddd';
    chatInput.style.borderRadius = '4px';
    chatInput.style.marginRight = '5px';
    chatInput.style.direction = 'rtl';

    const sendButton = document.createElement('button');
    sendButton.textContent = 'שלח';
    sendButton.style.backgroundColor = '#25D366';
    sendButton.style.color = 'white';
    sendButton.style.border = 'none';
    sendButton.style.borderRadius = '4px';
    sendButton.style.padding = '8px 15px';
    sendButton.style.cursor = 'pointer';

    chatInputArea.appendChild(chatInput);
    chatInputArea.appendChild(sendButton);

    // Assemble chat window
    chatWindow.appendChild(chatHeader);
    chatWindow.appendChild(chatBody);
    chatWindow.appendChild(chatInputArea);

    // Add to body
    document.body.appendChild(chatButton);
    document.body.appendChild(chatWindow);

    // Toggle chat window on button click
    chatButton.addEventListener('click', function() {
        if (chatWindow.style.display === 'none') {
            chatWindow.style.display = 'flex';
        } else {
            chatWindow.style.display = 'none';
        }
    });

    // Close chat window
    document.getElementById('close-chat').addEventListener('click', function(e) {
        e.stopPropagation();
        chatWindow.style.display = 'none';
    });

    // Send message
    function sendMessage() {
        const text = chatInput.value.trim();
        if (text !== '') {
            const userMessage = document.createElement('div');
            userMessage.style.backgroundColor = '#dcf8c6';
            userMessage.style.borderRadius = '5px';
            userMessage.style.padding = '8px';
            userMessage.style.marginBottom = '10px';
            userMessage.style.maxWidth = '80%';
            userMessage.style.marginLeft = 'auto';
            userMessage.textContent = text;
            chatBody.appendChild(userMessage);
            
            chatInput.value = '';
            chatBody.scrollTop = chatBody.scrollHeight;
            
            // Simulate response (in a real app, you would call your backend here)
            setTimeout(function() {
                const botMessage = document.createElement('div');
                botMessage.style.backgroundColor = '#ececec';
                botMessage.style.borderRadius = '5px';
                botMessage.style.padding = '8px';
                botMessage.style.marginBottom = '10px';
                botMessage.style.maxWidth = '80%';
                botMessage.textContent = 'תודה על פנייתך! נחזור אליך בהקדם.';
                chatBody.appendChild(botMessage);
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 1000);
        }
    }

    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Hover effect
    chatButton.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    chatButton.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
} 