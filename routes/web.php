<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\LoginController;
use Illuminate\Support\Facades\Route;

Route::get('/chat', [ChatController::class, 'index'])->name('chat');
Route::get('/login', [LoginController::class, 'index'])->name('login');

// 未定義のルートはログイン画面にリダイレクト
Route::fallback(function () {
    return redirect()->route('chat');
});