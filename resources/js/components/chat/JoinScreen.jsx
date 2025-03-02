import React from "react";

const JoinScreen = ({ setJoined }) => (
    <div className="join-container">
        <h1>ようこそチャットルームへ</h1>
        <button className="join-button" onClick={() => setJoined(true)}>
            入室
        </button>
    </div>
);

export default JoinScreen;
