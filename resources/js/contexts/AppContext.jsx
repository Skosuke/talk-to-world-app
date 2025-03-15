import React, { createContext, useContext } from 'react';

// アプリケーションの定数
const appConfig = {
    APP_NAME: "Talk To World"
};

// コンテキストの作成
const AppContext = createContext(appConfig);

// コンテキストを提供するプロバイダーコンポーネント
export function AppProvider({ children }) {
    return (
        <AppContext.Provider value={appConfig}>
            {children}
        </AppContext.Provider>
    );
}

// コンテキストを使用するためのカスタムフック
export function useAppContext() {
    return useContext(AppContext);
}