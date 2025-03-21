<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use Illuminate\Support\Facades\Route;

Route::get('/chat', [ChatController::class, 'index'])->name('chat');

// ログイン関連のルート（ログイン済みユーザーはチャット画面にリダイレクト）
Route::middleware('guest')->group(function () {
    Route::get('/login', [LoginController::class, 'index'])->name('login');
    Route::get('/register', [RegisterController::class, 'index'])->name('register');
});

// 認証アクション
Route::post('/login', [LoginController::class, 'login'])->name('post.login');
Route::post('/register', [RegisterController::class, 'register'])->name('post.register');
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

// 未定義のルートはログイン画面にリダイレクト
Route::fallback(function () {
    return redirect()->route('chat');
});
