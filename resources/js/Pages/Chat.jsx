// Inertia 用のチャットページコンポーネント
import React, { useEffect, useState, useRef, useCallback } from "react";
import JoinScreen from "../components/chat/JoinScreen";
import ChatUI from "../components/chat/ChatUI";
import AppHeader from "../components/AppHeader";
import ConfirmModal from "../components/chat/ConfirmModal";
import PartnerDisconnectModal from "../components/chat/PartnerDisconnectModal";

// WebSocketの再接続間隔を設定（ミリ秒）
const RECONNECT_INTERVAL = 3000;

/**
 * チャットページのメインコンポーネント
 * チャットの入室・メッセージ送受信・退出などの機能を管理
 * 
 * @param {Object} props - コンポーネントのプロパティ
 * @param {Object} props.session - ユーザーセッション情報（ログイン状態など）
 * @returns {JSX.Element} チャットページコンポーネント
 */
const Chat = ({ session }) => {
    // ===== 状態（State）の定義 =====
    
    // 入室状態を管理するフラグ（true: 入室中、false: 入室前）
    const [joined, setJoined] = useState(false);
    
    // チャットメッセージの履歴を保持する配列
    // 各メッセージは { type: "system"|"sent"|"received", text: "メッセージ内容" } の形式
    const [messages, setMessages] = useState([]);
    
    // 入力欄の内容を管理
    const [input, setInput] = useState("");
    
    // WebSocketの接続状態を管理
    // "connecting": 接続中、"connected": 接続済み、"reconnecting": 再接続中、"disconnected": 切断済み
    const [connectionStatus, setConnectionStatus] = useState("connecting");
    
    // 退出確認モーダルの表示状態
    const [showExitConfirmation, setShowExitConfirmation] = useState(false);
    
    // 相手退出通知モーダルの表示状態
    const [showPartnerDisconnectModal, setShowPartnerDisconnectModal] = useState(false);
    
    // ===== 参照（Refs）の定義 =====
    
    // WebSocketの参照を保持（コンポーネントの再レンダリングの影響を受けないように）
    const ws = useRef(null);
    
    // チャットウィンドウのDOM要素への参照（スクロール制御用）
    const chatWindowRef = useRef(null);
    
    // 再接続タイマーの参照
    const reconnectTimeout = useRef(null);
    
    // 退出処理中かどうかを判断するフラグ
    const exitAttemptInProgress = useRef(false);
    
    // 相手の接続が切れたかどうかのフラグ
    const partnerDisconnected = useRef(false);

    // ===== 副作用（Effects）とイベントハンドラ =====

    /**
     * ブラウザの戻るボタンを検知して確認モーダルを表示するための副作用
     * 
     * チャット中のみ有効になり、ブラウザの戻るボタンや画面を閉じる操作で
     * ユーザーに確認を求める
     */
    useEffect(() => {
        // チャットに参加していない場合は何もしない
        if (!joined) return;

        // ブラウザ/タブを閉じる時や更新時のイベントハンドラ
        const handleBeforeUnload = (e) => {
            // ブラウザ標準の確認ダイアログを表示
            e.preventDefault();
            e.returnValue = "";
            return "";
        };

        // ブラウザの戻るボタンが押されたときのイベントハンドラ
        const handlePopState = (e) => {
            // 戻るボタンが押されたとき、履歴を1つ進めて元に戻し、モーダルを表示
            e.preventDefault();
            window.history.pushState(null, null, window.location.pathname);
            setShowExitConfirmation(true);
        };

        // 履歴を追加して戻るボタンを検知できるようにする
        window.history.pushState(null, null, window.location.pathname);

        // イベントリスナーを登録
        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('popstate', handlePopState);

        // コンポーネントのアンマウント時にイベントリスナーを解除
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('popstate', handlePopState);
        };
    }, [joined]); 

    /**
     * WebSocket接続を確立する関数
     * useCallbackでメモ化して不要な再作成を防ぐ
     */
    const connect = useCallback(() => {
        // WebSocketサーバーに接続
        ws.current = new WebSocket("ws://localhost:8080/ws");

        // 接続成功時の処理
        ws.current.onopen = () => {
            setConnectionStatus("connected");
            setMessages((prev) => [
                ...prev,
                { type: "system", text: "Connected to chat server." },
            ]);
        };

        // メッセージ受信時の処理
        ws.current.onmessage = (event) => {
            if (event.data === "Your partner disconnected.") {
                // 相手が退出したことを記録
                partnerDisconnected.current = true;
                // システムメッセージとして表示
                setMessages((prev) => [
                    ...prev,
                    {
                        type: "system",
                        text: "相手が退出しました。",
                    },
                ]);
            } else {
                // 通常のメッセージ受信処理
                setMessages((prev) => [
                    ...prev,
                    { type: "received", text: event.data },
                ]);
            }
        };

        // エラー発生時の処理
        ws.current.onerror = () => {
            setMessages((prev) => [
                ...prev,
                { type: "system", text: "WebSocket error occurred." },
            ]);
        };

        // 接続切断時の処理
        ws.current.onclose = () => {
            // 切断されたら状態を更新
            setConnectionStatus("disconnected");
            console.log("WebSocket connection closed.");
            
            // システムメッセージを追加
            setMessages((prev) => [
                ...prev,
                { type: "system", text: "Disconnected from chat server." },
            ]);
            
            // 自分から退出した場合（Exit Chatボタン）はモーダルを表示せずそのまま終了
            if (exitAttemptInProgress.current) {
                setJoined(false);
                return;
            }
            
            // 相手が退出したか、または予期せぬ切断の場合は確認モーダルを表示
            setShowPartnerDisconnectModal(true);
        };
    }, [joined]);

    /**
     * チャット入室時にWebSocket接続を開始する副作用
     * joinedの値が変わった時に再実行される
     */
    useEffect(() => {
        // チャットに参加していない場合は何もしない
        if (!joined) return;
        
        // WebSocket接続を確立
        connect();

        // コンポーネントのアンマウント時やjoinedがfalseになったときにクリーンアップ
        return () => {
            // WebSocketの接続を閉じる
            if (ws.current) {
                ws.current.close();
            }
            // 再接続タイマーがあれば解除
            if (reconnectTimeout.current) {
                clearTimeout(reconnectTimeout.current);
            }
        };
    }, [joined, connect]);

    /**
     * 新しいメッセージが追加されたときに自動スクロールする副作用
     */
    useEffect(() => {
        if (chatWindowRef.current) {
            // チャットウィンドウを最下部にスクロール
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [messages]);

    /**
     * メッセージを送信する関数
     */
    const sendMessage = () => {
        // WebSocketが接続済みで、入力内容が空でない場合のみ送信
        if (
            ws.current &&
            ws.current.readyState === WebSocket.OPEN &&
            input.trim() !== ""
        ) {
            // WebSocketサーバーにメッセージを送信
            ws.current.send(input);
            
            // 自分のメッセージをUIに追加
            setMessages((prev) => [...prev, { type: "sent", text: input }]);
            
            // 入力欄をクリア
            setInput("");
        }
    };

    /**
     * キーボードイベント処理関数
     * Enterキーでメッセージを送信（Shift+Enterは改行）
     * 
     * @param {KeyboardEvent} e - キーボードイベント
     */
    const handleKeyDown = (e) => {
        // IME入力中はEnterキーを無視（日本語入力などでの誤送信を防止）
        if (e.isComposing || e.nativeEvent.isComposing) {
            return;
        }
        
        if (e.key === "Enter") {
            // Shiftキーが押されている場合は改行を許可
            if (e.shiftKey) {
                return;
            }
            // それ以外の場合はメッセージを送信
            e.preventDefault();
            sendMessage();
        }
    };

    /**
     * 退出確認モーダルを表示する関数
     */
    const showExitModal = () => {
        setShowExitConfirmation(true);
    };
    
    /**
     * 退出キャンセル時の処理
     */
    const cancelExit = () => {
        setShowExitConfirmation(false);
    };

    /**
     * チャットから退出する関数
     * WebSocket接続を切断して入室前の状態に戻す
     */
    const leaveChat = () => {
        // モーダル表示中に直接呼び出された場合はモーダルを閉じる
        setShowExitConfirmation(false);
        
        // 退出処理中フラグをセット
        exitAttemptInProgress.current = true;
        
        // WebSocket接続を閉じる
        if (ws.current) {
            ws.current.close();
        }
        
        // 入室状態をfalseに変更
        setJoined(false);
    };
    
    /**
     * 相手退出モーダルのOKボタンクリック時の処理
     */
    const handlePartnerDisconnectConfirm = () => {
        setShowPartnerDisconnectModal(false);
        setJoined(false);
    };

    // ===== レンダリング =====

    // 入室前は入室用の画面を表示
    if (!joined) {
        return (
            <>
                <AppHeader session={session} />
                <JoinScreen setJoined={setJoined} />
            </>
        );
    } else {
        // 入室後はチャットUIを表示
        return (
            <>
                <ChatUI
                    connectionStatus={connectionStatus}
                    leaveChat={showExitModal} // 「Exit Chat」ボタンクリック時はモーダル表示関数を呼び出す
                    chatWindowRef={chatWindowRef}
                    input={input}
                    setInput={setInput}
                    sendMessage={sendMessage}
                    handleKeyDown={handleKeyDown}
                    messages={messages}
                    session={session}
                />
                {/* 確認モーダル - チャット退出時に表示 */}
                <ConfirmModal
                    isVisible={showExitConfirmation}
                    onConfirm={leaveChat}
                    onCancel={cancelExit}
                    message="チャットを終了しますか？"
                />
                {/* 相手退出通知モーダル */}
                <PartnerDisconnectModal
                    isVisible={showPartnerDisconnectModal}
                    onConfirm={handlePartnerDisconnectConfirm}
                    message={partnerDisconnected.current 
                        ? "チャット相手が退出しました。" 
                        : "接続が切断されました。"}
                />
            </>
        );
    }
};

export default Chat;
