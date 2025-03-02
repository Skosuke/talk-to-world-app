import React from "react";
import ChatHeader from "./Header";
import ChatInput from "./Input";

const ChatUI = ({
    connectionStatus,
    leaveChat,
    chatWindowRef,
    input,
    setInput,
    sendMessage,
    handleKeyDown,
    messages,
}) => (
    <div className="chat-container">
        <ChatHeader connectionStatus={connectionStatus} leaveChat={leaveChat} />
        <div className="chat-window" ref={chatWindowRef}>
            {messages.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.type}`}>
                    {msg.type === "system" ? <em>{msg.text}</em> : msg.text}
                </div>
            ))}
        </div>
        <ChatInput
            input={input}
            setInput={setInput}
            sendMessage={sendMessage}
            handleKeyDown={handleKeyDown}
        />
    </div>
);

export default ChatUI;
