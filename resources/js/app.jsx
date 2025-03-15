/**
 * アプリケーションのエントリーポイント
 * Laravelアプリケーションで使用されるInertia.jsの設定と初期化を行う
 */
import "./bootstrap";
import "../css/app.css";
import React from "react";
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { AppProvider } from "./contexts/AppContext";

/**
 * Inertia.jsアプリケーションの作成
 * 
 * Inertia.jsは、サーバーサイドのフレームワーク（Laravel）と
 * クライアントサイドのフレームワーク（React）をつなぐライブラリです。
 * 従来のSPAのように動作しますが、ページリクエストはブラウザによって処理される。
 */
createInertiaApp({
    /**
     * ページコンポーネントの解決方法を定義
     * URL（例: /users）に対応するコンポーネント（例: Pages/Users.jsx）を見つける処理
     */
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    
    /**
     * アプリケーションの初期化処理
     * 
     * @param {Object} param0 - 初期化パラメーター
     * @param {HTMLElement} param0.el - アプリをマウントするDOM要素
     * @param {Component} param0.App - Inertiaのルートコンポーネント
     * @param {Object} param0.props - ページコンポーネントに渡す初期プロパティ
     */
    setup({ el, App, props }) {
        // React 18のcreateRootを使用してアプリケーションをレンダリング
        createRoot(el).render(
            // AppProviderでラップして、アプリ全体で共通の設定を使えるようにする
            <AppProvider>
                <App {...props} />
            </AppProvider>
        );
    },
});
