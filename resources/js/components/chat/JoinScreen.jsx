import React, { useState, useRef } from "react";
import useCanvasAnimation from "../../hooks/useCanvasAnimation";
import "../../../css/JoinScreen.css";

const JoinScreen = ({ setJoined }) => {
    const [isHovering, setIsHovering] = useState(false);
    const canvasRef = useRef(null);

    useCanvasAnimation(canvasRef);

    return (
        <div
            className="container-fluid d-flex flex-column align-items-center justify-content-center p-0 join-screen"
            style={{ minHeight: "calc(100vh - 60px)" }}
        >
            {/* PS5風のアニメーション背景 */}
            <canvas ref={canvasRef} className="join-screen__canvas"></canvas>

            {/* メインコンテンツ */}
            <div className="join-screen__content">
                <h1 className="display-4 mb-4 fw-bold join-screen__title">
                    Random Chat
                </h1>

                <p className="lead mb-5 fw-light">
                    世界中の誰かとつながる、ランダムチャットサービス
                </p>

                <div
                    className={`card p-4 rounded-lg shadow-lg mb-4 border-0 join-screen__card join-screen__card-inner ${
                        isHovering
                            ? "join-screen__card--hover"
                            : "join-screen__card--default"
                    }`}
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.98)",
                        borderRadius: "12px",
                        boxShadow: isHovering 
                            ? "0 8px 25px rgba(79, 172, 254, 0.4)"
                            : "0 4px 15px rgba(79, 172, 254, 0.3)"
                    }}
                >
                    <h2 className="card-title text-center mb-4 fw-bold text-dark">
                        ようこそチャットルームへ
                    </h2>
                    <p className="text-muted mb-4 text-center">
                        世界のどこかにいる誰かと、今すぐ会話を始めましょう
                    </p>
                    <button
                        className="btn btn-lg w-100 join-screen__button"
                        onClick={() => setJoined(true)}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        style={{
                            backgroundColor: "#4facfe",
                            color: "#fff"
                        }}
                    >
                        チャットを始める
                    </button>
                </div>

                <div className="mt-3 text-white-50">
                    <small>入室すると、ランダムな相手とマッチングします</small>
                </div>
            </div>
        </div>
    );
};

export default JoinScreen;
