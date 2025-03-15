import React, { createContext, useContext } from 'react';

// アプリケーション全体で共有する定数の定義
// これにより、アプリ名などの情報を一箇所で管理できる
const appConfig = {
    APP_NAME: "Talk To World"
};

// React Context APIを使ってアプリケーション全体で状態を共有するための仕組みを作成
// Context（文脈）は、コンポーネントツリー全体でデータを渡す方法
const AppContext = createContext(appConfig);

/**
 * アプリケーション設定を子コンポーネントに提供するプロバイダーコンポーネント
 * このコンポーネントでラップした子コンポーネントすべてが、AppContextの値にアクセスできるようになる
 * 
 * @param {Object} props - コンポーネントのプロパティ
 * @param {React.ReactNode} props.children - 子コンポーネント
 */
export function AppProvider({ children }) {
    return (
        <AppContext.Provider value={appConfig}>
            {children}
        </AppContext.Provider>
    );
}

/**
 * アプリケーション設定にアクセスするためのカスタムフック
 * このフックを使うと、どのコンポーネントからでもアプリ名などの設定値を簡単に取得できる
 * 
 * @returns {Object} アプリケーション設定オブジェクト
 * @example
 * // コンポーネント内での使用例
 * const { APP_NAME } = useAppContext();
 * return <h1>{APP_NAME}</h1>;
 */
export function useAppContext() {
    return useContext(AppContext);
}