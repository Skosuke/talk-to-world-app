import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.jsx"], // app.js → app.jsx に変更
            refresh: true,
        }),
    ],
    optimizeDeps: {
        // Inertia 関連の依存解決を回避するために除外
        exclude: ["@inertiajs/inertia", "@inertiajs/inertia-react"],
    },
    server: {
        host: "0.0.0.0", // コンテナ内で Vite サーバーを起動する場合、外部からアクセス可能にするために指定
        port: 3000, // 必要に応じてポート番号を変更
        hmr: {
            host: "localhost", // ブラウザからアクセスする際のホスト名。Dockerの場合は、ホストマシンのアドレスに変更することも検討
            // 例えば、Docker のネットワークやポートマッピングに合わせて設定する
        },
    },
});
