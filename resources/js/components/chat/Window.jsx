import React from "react";

const ChatWindow = ({ messages, chatWindowRef }) => (
    <div className="chat-window" ref={chatWindowRef}>
        {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.type}`}>
                {msg.type === "system" ? <em>{msg.text}</em> : msg.text}
            </div>
        ))}
    </div>
);

export default ChatWindow;
