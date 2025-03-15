import React from 'react';
import { useForm } from '@inertiajs/react';
import "../../../css/Chat.css";

/**
 * チャット中にログインするためのモーダルコンポーネント
 * チャットを中断することなくログイン操作が可能
 * 
 * @param {Object} props - コンポーネントのプロパティ
 * @param {boolean} props.isVisible - モーダルの表示/非表示を制御
 * @param {Function} props.onClose - モーダルを閉じる際に実行する関数
 * @returns {JSX.Element|null} 表示するモーダル、または非表示の場合はnull
 */
const LoginModal = ({ isVisible, onClose }) => {
  // isVisibleがfalseの場合は何も表示しない
  if (!isVisible) return null;

  // ログインフォームの状態管理
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
  });

  // ログインフォーム送信処理
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("post.login"), {
      onSuccess: () => {
        // ログイン成功時にモーダルを閉じる
        onClose();
      },
      // チャットページにとどまるために、代わりにフェッチを使用
      preserveState: true,
    });
  };

  // クリックイベントがモーダルコンテンツ以外で発生した場合に閉じる
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="chat-modal-backdrop" onClick={handleBackdropClick}>
      <div className="chat-modal">
        <div className="chat-modal-header">
          <h3>ログイン</h3>
          <button 
            className="chat-modal-close" 
            onClick={onClose}
            aria-label="閉じる"
          >
            ×
          </button>
        </div>
        <div className="chat-modal-content">
          <form onSubmit={handleSubmit}>
            <div className="chat-modal-form-group">
              <label htmlFor="chat-login-email">メールアドレス</label>
              <input
                id="chat-login-email"
                type="email"
                className="chat-modal-input"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                placeholder="メールアドレスを入力"
                required
              />
              {errors.email && (
                <div className="chat-modal-error">{errors.email}</div>
              )}
            </div>
            
            <div className="chat-modal-form-group">
              <label htmlFor="chat-login-password">パスワード</label>
              <input
                id="chat-login-password"
                type="password"
                className="chat-modal-input"
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
                placeholder="パスワードを入力"
                required
              />
              {errors.password && (
                <div className="chat-modal-error">{errors.password}</div>
              )}
            </div>
            
            <div className="chat-modal-actions">
              <button
                type="submit"
                className="chat-modal-button primary"
                disabled={processing}
              >
                {processing ? "ログイン中..." : "ログイン"}
              </button>
              <button
                type="button"
                className="chat-modal-button secondary"
                onClick={onClose}
              >
                キャンセル
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;