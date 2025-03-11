import React from "react";

const ChatInput = ({ input, setInput, sendMessage, handleKeyDown }) => (
    <div className="chat-input">
        <div className="chat-input-wrapper">
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="メッセージを入力..."
                rows="1"
                style={{
                    resize: "none",
                    overflow: "auto",
                    minHeight: "44px",
                    maxHeight: "120px"
                }}
            />
            <button onClick={sendMessage}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
            </button>
        </div>
    </div>
);

export default ChatInput;
