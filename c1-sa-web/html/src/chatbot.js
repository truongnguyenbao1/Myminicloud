/**
 * chatbot.js — AI Assistant powered by Gemini (via backend /api/chat)
 */

document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn       = document.getElementById('chatbot-toggle');
    const closeBtn        = document.getElementById('chatbot-close');
    const chatWindow      = document.getElementById('chatbot-window');
    const chatInput       = document.getElementById('chatbot-input');
    const sendBtn         = document.getElementById('chatbot-send');
    const messageContainer = document.getElementById('chatbot-messages');

    if (!toggleBtn || !chatWindow) return; // guard if elements missing

    let chatHistory = [];
    let isSending   = false;

    // ── Toggle window ──────────────────────────────────────────────
    const toggleChat = () => {
        chatWindow.classList.toggle('hidden');
        if (!chatWindow.classList.contains('hidden')) {
            chatInput?.focus();
            scrollToBottom();
        }
    };

    toggleBtn.addEventListener('click', toggleChat);
    closeBtn?.addEventListener('click', toggleChat);

    // ── Send message ───────────────────────────────────────────────
    const sendMessage = async () => {
        const text = chatInput.value.trim();
        if (!text || isSending) return;

        isSending = true;
        addMessage(text, 'user');
        chatInput.value = '';

        // Push user turn to history
        chatHistory.push({ role: 'user', parts: [{ text }] });

        const thinkingId = addMessage('...', 'bot');

        try {
            const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:3001';
            const res = await fetch(`${apiBase}/api/chat`, {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify({
                    message: text,
                    history: chatHistory.slice(0, -1), // exclude current user turn
                }),
            });

            if (!res.ok) throw new Error(`Server responded ${res.status}`);
            const data = await res.json();

            removeMessage(thinkingId);

            if (data.error) {
                addMessage(`⚠️ ${data.error}`, 'bot');
            } else {
                addMessage(data.text, 'bot');
                chatHistory.push({ role: 'model', parts: [{ text: data.text }] });

                // Keep history from growing unbounded (last 20 turns)
                if (chatHistory.length > 20) chatHistory = chatHistory.slice(-20);
            }
        } catch (err) {
            removeMessage(thinkingId);
            addMessage('❌ Không kết nối được server. Hãy thử lại sau.', 'bot');
            console.error('Chatbot error:', err.message);
        } finally {
            isSending = false;
        }
    };

    sendBtn?.addEventListener('click', sendMessage);
    chatInput?.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // ── Helpers ────────────────────────────────────────────────────
    function addMessage(text, type) {
        const id     = `msg-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        const msgDiv = document.createElement('div');
        msgDiv.id        = id;
        msgDiv.className = `message ${type}-message`;
        msgDiv.textContent = text;
        messageContainer.appendChild(msgDiv);
        scrollToBottom();
        return id;
    }

    function removeMessage(id) {
        document.getElementById(id)?.remove();
    }

    function scrollToBottom() {
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }
});
