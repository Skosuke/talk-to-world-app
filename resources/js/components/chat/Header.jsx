import React from "react";

const ChatHeader = ({ connectionStatus, leaveChat }) => (
    <div className="chat-header">
        Random Chat
        <span className="connection-status">
            {connectionStatus === "connecting" && " (接続中...)"}{" "}
            {connectionStatus === "reconnecting" && " (再接続中...)"}{" "}
            {connectionStatus === "disconnected" && " (切断済み)"}
        </span>
        <button className="leave-button" onClick={leaveChat}>
            Exit Chat
        </button>
    </div>
);

export default ChatHeader;
