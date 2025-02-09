// resources/js/Chat.jsx
import React, { useEffect, useState, useRef, useCallback } from "react";
import "../css/Chat.css";

const RECONNECT_INTERVAL = 3000; // 自動再接続の間隔（ミリ秒）

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [connectionStatus, setConnectionStatus] = useState("connecting"); // "connecting", "connected", "reconnecting", "disconnected"
    const [hasLeft, setHasLeft] = useState(false); // ユーザーが退出したかどうかのフラグ
    const ws = useRef(null);
    const chatWindowRef = useRef(null);
    const reconnectTimeout = useRef(null);

    // WebSocket 接続を確立する関数
    const connect = useCallback(() => {
        ws.current = new WebSocket("ws://localhost:8080/ws");

        ws.current.onopen = () => {
            setConnectionStatus("connected");
            setMessages((prev) => [
                ...prev,
                { type: "system", text: "Connected to chat server." },
            ]);
        };

        ws.current.onmessage = (event) => {
            setMessages((prev) => [
                ...prev,
                { type: "received", text: event.data },
            ]);
        };

        ws.current.onerror = (error) => {
            setMessages((prev) => [
                ...prev,
                { type: "system", text: "WebSocket error occurred." },
            ]);
        };

        ws.current.onclose = () => {
            // ユーザーが退出していない場合は再接続を試みる
            if (!hasLeft) {
                setConnectionStatus("disconnected");
                setMessages((prev) => [
                    ...prev,
                    {
                        type: "system",
                        text: "Disconnected from chat server. Reconnecting...",
                    },
                ]);
                reconnectTimeout.current = setTimeout(() => {
                    setConnectionStatus("reconnecting");
                    connect();
                }, RECONNECT_INTERVAL);
            } else {
                // ユーザーが退出した場合は再接続を行わない
                setConnectionStatus("disconnected");
                setMessages((prev) => [
                    ...prev,
                    { type: "system", text: "You have left the chat room." },
                ]);
            }
        };
    }, [hasLeft]);

    // 初回接続の実行とクリーンアップ
    useEffect(() => {
        connect();

        return () => {
            if (ws.current) {
                ws.current.close();
            }
            if (reconnectTimeout.current) {
                clearTimeout(reconnectTimeout.current);
            }
        };
    }, [connect]);

    // 新しいメッセージが追加されたら自動スクロール
    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop =
                chatWindowRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = () => {
        if (
            ws.current &&
            ws.current.readyState === WebSocket.OPEN &&
            input.trim() !== ""
        ) {
            ws.current.send(input);
            setMessages((prev) => [...prev, { type: "sent", text: input }]);
            setInput("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    // チャットルームから退出する処理
    const leaveChat = () => {
        setHasLeft(true); // 退出フラグを設定
        if (ws.current) {
            ws.current.close(); // WebSocket 接続を閉じる
        }
        // 必要に応じて、画面遷移の処理（例：ルート画面へのリダイレクトなど）を追加できます
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                Random Chat
                <span className="connection-status">
                    {connectionStatus === "connecting" && " (接続中...)"}{" "}
                    {connectionStatus === "reconnecting" && " (再接続中...)"}{" "}
                    {connectionStatus === "disconnected" && " (切断済み)"}
                </span>
                {/* 退出ボタン。既に退出している場合は非表示にする */}
                {!hasLeft && (
                    <button className="leave-button" onClick={leaveChat}>
                        Exit Chat
                    </button>
                )}
            </div>
            <div className="chat-window" ref={chatWindowRef}>
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-message ${msg.type}`}>
                        {msg.type === "system" ? <em>{msg.text}</em> : msg.text}
                    </div>
                ))}
            </div>
            {/* 退出後は入力エリアを非表示にする */}
            {!hasLeft && (
                <div className="chat-input">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            )}
        </div>
    );
};

export default Chat;
