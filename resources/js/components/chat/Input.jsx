import React from "react";

const ChatInput = ({ input, setInput, sendMessage, handleKeyDown }) => (
    <div className="chat-input">
        <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
    </div>
);

export default ChatInput;
