// Inertia 用の Chat コンポーネント（旧 Chat.jsx のコードを配置）
import React, { useEffect, useState, useRef, useCallback } from "react";
import "../../css/Chat.css";
import JoinScreen from "../components/chat/JoinScreen";
import ChatUI from "../components/chat/ChatUI";

const RECONNECT_INTERVAL = 3000; // ...定数などの定義...

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
        return <JoinScreen setJoined={setJoined} />;
    } else {
        // 入室後はチャット UI を表示
        return (
            <ChatUI
                connectionStatus={connectionStatus}
                leaveChat={leaveChat}
                chatWindowRef={chatWindowRef}
                input={input}
                setInput={setInput}
                sendMessage={sendMessage}
                handleKeyDown={handleKeyDown}
                messages={messages}
            />
        );
    }
};

export default Chat;
