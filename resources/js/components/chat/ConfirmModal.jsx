import React from 'react';
import "../../../css/Chat.css";

/**
 * 確認モーダルコンポーネント
 * ユーザーに対して操作の確認を求めるポップアップダイアログを表示する
 * 
 * チャットの終了など、重要な操作の前に確認を取るために使用
 * 
 * @param {Object} props - コンポーネントのプロパティ
 * @param {boolean} props.isVisible - モーダルの表示/非表示を制御
 * @param {Function} props.onConfirm - 「確認」ボタンがクリックされたときに実行する関数
 * @param {Function} props.onCancel - 「キャンセル」ボタンがクリックされたときに実行する関数
 * @param {string} props.message - モーダルに表示するメッセージ
 * @returns {JSX.Element|null} 表示するモーダル、または非表示の場合はnull
 */
const ConfirmModal = ({ isVisible, onConfirm, onCancel, message }) => {
  // isVisibleがfalseの場合は何も表示しない（モーダルを非表示にする）
  if (!isVisible) return null;

  return (
    // モーダルの背景（オーバーレイ）- 画面全体を覆う半透明の層
    <div className="confirm-modal-backdrop">
      {/* モーダルのコンテナ */}
      <div className="confirm-modal">
        <div className="confirm-modal-content">
          {/* モーダルに表示するメッセージ（デフォルトは「チャットを終了しますか？」） */}
          <p>{message || "チャットを終了しますか？"}</p>
          
          {/* ボタンエリア */}
          <div className="confirm-modal-actions">
            {/* キャンセルボタン - クリックするとonCancel関数が実行される */}
            <button 
              className="btn-cancel" 
              onClick={onCancel}
            >
              キャンセル
            </button>
            
            {/* 確認ボタン - クリックするとonConfirm関数が実行される */}
            <button 
              className="btn-confirm" 
              onClick={onConfirm}
            >
              終了する
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;