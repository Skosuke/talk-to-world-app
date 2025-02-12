// resources/js/Chat.jsx
import React, { useEffect, useState, useRef, useCallback } from "react";
import "../css/Chat.css";

const RECONNECT_INTERVAL = 3000; // 自動再接続の間隔（ミリ秒）

const Chat = () => {
    // 入室状態を管理するフラグ。false の場合は入室前の画面（入室ボタン）を表示
    const [joined, setJoined] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [connectionStatus, setConnectionStatus] = useState("connecting"); // "connecting", "connected", "reconnecting", "disconnected"
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

        // 修正: onmessage ハンドラーで、相手退出時に待機時間を設ける
        ws.current.onmessage = (event) => {
            if (event.data === "Your partner disconnected.") {
                // oncloseが同時に発動するため、以下の処理が期待通りに動作しない。
                // 本来は、ここで待機時間を設ける処理を行う予定だった。
                // そのた目、以下の処理はコメントアウトしておく。
                // setMessages((prev) => [
                //     ...prev,
                //     {
                //         type: "system",
                //         text: "相手が退出しました。しばらくお待ちください。",
                //     },
                // ]);
            } else {
                setMessages((prev) => [
                    ...prev,
                    { type: "received", text: event.data },
                ]);
            }
        };

        ws.current.onerror = () => {
            setMessages((prev) => [
                ...prev,
                { type: "system", text: "WebSocket error occurred." },
            ]);
        };

        ws.current.onclose = () => {
            // 切断されたら再接続せずに入室用画面に戻る
            setConnectionStatus("disconnected");
            console.log("WebSocket connection closed.");
            setMessages((prev) => [
                ...prev,
                { type: "system", text: "Disconnected from chat server." },
            ]);
            setJoined(false);
        };
    }, [joined]);

    // 入室状態になった場合にのみ WebSocket 接続を開始する
    useEffect(() => {
        if (!joined) return;
        connect();

        return () => {
            if (ws.current) {
                ws.current.close();
            }
            if (reconnectTimeout.current) {
                clearTimeout(reconnectTimeout.current);
            }
        };
    }, [joined, connect]);

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

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    // 退出処理：入室状態を false にして WebSocket 接続を閉じる
    const leaveChat = () => {
        setJoined(false);
        if (ws.current) {
            ws.current.close();
        }
    };

    // 入室前は、入室用の画面を表示
    if (!joined) {
        return (
            <div className="join-container">
                <h1>ようこそチャットルームへ</h1>
                <button className="join-button" onClick={() => setJoined(true)}>
                    入室
                </button>
            </div>
        );
    }

    // 入室後はチャット UI を表示
    return (
        <div className="chat-container">
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
            <div className="chat-window" ref={chatWindowRef}>
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-message ${msg.type}`}>
                        {msg.type === "system" ? <em>{msg.text}</em> : msg.text}
                    </div>
                ))}
            </div>
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
        </div>
    );
};

export default Chat;
