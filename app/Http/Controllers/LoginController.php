<?php

namespace App\Http\Controllers;

use App\Services\AuthService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function index()
    {
        return Inertia::render('Login');
    }

    public function login(Request $request, AuthService $authService)
    {
        // ログイン処理
        $credentials = $request->only('email', 'password');
        if ($authService->attemptLogin($credentials)) {
            return redirect()->route('home');
        }
        return back()->withErrors(['email' => 'ログインに失敗しました']);
    }

    public function logout(AuthService $authService)
    {
        $authService->logout();
        return redirect()->route('login');
    }
}