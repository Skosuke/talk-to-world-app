<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function index(Request $request)
    {
        // セッションが存在する場合は全データを、存在しなければ空の配列を渡す
        $session = $request->hasSession() ? $request->session()->all() : [];
        dd($session);
        return Inertia::render('Chat', [
            'session' => $session,
        ]);
    }
}
