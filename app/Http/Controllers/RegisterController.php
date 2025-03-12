<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class RegisterController extends Controller
{
    // ユーザー登録画面の表示
    public function index()
    {
        return Inertia::render('Register');
    }

    // 登録処理の実行
    public function register(Request $request)
    {
        // 入力値のバリデーション
        $data = $request->all();
        $validator = Validator::make($data, [
            'name'     => ['required', 'string', 'max:255'],
            'email'    => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        // ユーザー作成
        User::create([
            'name'     => $data['name'],
            'email'    => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        // 登録完了後、ログイン画面またはホームなどへリダイレクト
        return redirect()->route('login')->with([
            'success' => '登録に成功しました。'
        ]);
    }
}