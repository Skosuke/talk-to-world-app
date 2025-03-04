import React from "react";

const JoinScreen = ({ setJoined, session }) => {
    const sessionDisplay = session
        ? JSON.stringify(session)
        : "セッション情報なし";

    return (
        <div className="join-container">
            <h1>ようこそチャットルームへ</h1>
            <pre>あなたのセッションID: {sessionDisplay}</pre>
            <button className="join-button" onClick={() => setJoined(true)}>
                入室
            </button>
        </div>
    );
};

export default JoinScreen;
