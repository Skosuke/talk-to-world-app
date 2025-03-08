import { useEffect } from "react";

export default function useCanvasAnimation(canvasRef) {
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let width, height;
        let particles = [];

        // キャンバスのサイズ設定
        const setCanvasSize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        // 粒子の初期化
        const initParticles = () => {
            particles = [];
            const particleCount = 100;

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    size: Math.random() * 5 + 1,
                    speedX: Math.random() * 2 - 1,
                    speedY: Math.random() * 2 - 1,
                    opacity: Math.random() * 0.5 + 0.2,
                });
            }
        };

        // アニメーション描画処理
        const draw = () => {
            // 背景をクリア
            ctx.clearRect(0, 0, width, height);

            // 粒子を描画
            particles.forEach((p) => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(135, 206, 250, ${p.opacity})`;
                ctx.fill();

                // 粒子の位置を更新
                p.x += p.speedX;
                p.y += p.speedY;

                // 画面外に出たら反対側から再登場
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;
            });

            // 波の効果を追加
            drawWaves();

            requestAnimationFrame(draw);
        };

        // PS5風の波エフェクト
        const drawWaves = () => {
            const time = Date.now() * 0.001;
            const waveCount = 3;

            for (let i = 0; i < waveCount; i++) {
                ctx.beginPath();
                ctx.moveTo(0, height);

                for (let x = 0; x < width; x += 20) {
                    // 波の振幅と速度を調整
                    const amplitude = 50 + i * 20;
                    const period = 0.003 - i * 0.0005;
                    const phase = i * 0.5;

                    const y =
                        height -
                        100 -
                        amplitude * Math.sin(x * period + time + phase);

                    ctx.lineTo(x, y);
                }

                ctx.lineTo(width, height);
                ctx.closePath();

                // 波ごとに異なる色と透明度
                const opacity = 0.1 - i * 0.02;
                const gradient = ctx.createLinearGradient(0, 0, width, 0);
                gradient.addColorStop(0, `rgba(74, 144, 226, ${opacity})`);
                gradient.addColorStop(0.5, `rgba(125, 179, 236, ${opacity})`);
                gradient.addColorStop(1, `rgba(74, 144, 226, ${opacity})`);

                ctx.fillStyle = gradient;
                ctx.fill();
            }
        };

        // リスナー追加と削除で異なる関数参照を使用
        const handleResize = () => {
            setCanvasSize();
            initParticles();
        };

        window.addEventListener("resize", handleResize);

        // 初期化と描画開始
        setCanvasSize();
        initParticles();
        draw();

        // クリーンアップ
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [canvasRef]);
}
