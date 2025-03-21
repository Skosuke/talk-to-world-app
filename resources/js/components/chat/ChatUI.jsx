import React from "react";
import ChatInput from "./Input";
import ChatAppHeader from "./ChatAppHeader";
import "../../../css/Chat.css";

const formatTimestamp = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
};

const ChatUI = ({
    connectionStatus,
    leaveChat,
    chatWindowRef,
    input,
    setInput,
    sendMessage,
    handleKeyDown,
    messages,
    session,
}) => (
    <>
        <ChatAppHeader
            session={session}
            connectionStatus={connectionStatus}
            leaveChat={leaveChat}
        />
        <div className="chat-content">
            <div className="chat-window" ref={chatWindowRef}>
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-message ${msg.type}`}>
                        {msg.type === "system" ? (
                            <em>{msg.text}</em>
                        ) : (
                            <>
                                <div className="message-header">
                                    <span className="username">
                                        {/* 送信者名はmsg.senderから取得（存在しない場合のフォールバックも設定） */}
                                        {msg.sender || (msg.type === "sent" 
                                            ? (session?.user?.name || "you") 
                                            : "Partner")}:
                                    </span>
                                </div>
                                <div className="message-content">{msg.text}</div>
                                <div className="timestamp">
                                    {formatTimestamp()}
                                </div>
                            </>
                        )}
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
    </>
);

export default ChatUI;
