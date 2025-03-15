import React from 'react';
import "../../../css/Chat.css";

/**
 * チャット相手の退出を通知するモーダルコンポーネント
 * WebSocketのoncloseイベントで相手が退出したときに表示する
 * 
 * @param {Object} props - コンポーネントのプロパティ
 * @param {boolean} props.isVisible - モーダルの表示/非表示を制御
 * @param {Function} props.onConfirm - 「OK」ボタンがクリックされたときに実行する関数
 * @param {string} props.message - モーダルに表示するメッセージ
 * @returns {JSX.Element|null} 表示するモーダル、または非表示の場合はnull
 */
const PartnerDisconnectModal = ({ isVisible, onConfirm, message }) => {
  // isVisibleがfalseの場合は何も表示しない
  if (!isVisible) return null;

  return (
    <div className="confirm-modal-backdrop">
      <div className="confirm-modal">
        <div className="confirm-modal-content">
          {/* モーダルに表示するメッセージ */}
          <p>{message || "チャット相手が退出しました。"}</p>
          
          {/* ボタンエリア */}
          <div className="confirm-modal-actions">
            <button 
              className="btn-confirm" 
              onClick={onConfirm}
              autoFocus
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDisconnectModal;