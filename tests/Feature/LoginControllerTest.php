<?php

namespace Tests\Feature;

use App\Models\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

class LoginControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_can_view_login_page()
    {
        $response = $this->get(route('login'));

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => 
            $page->component('Login')
        );
    }

    public function test_authenticated_user_is_redirected_from_login()
    {
        // テストユーザーを作成して認証状態にする
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->get(route('login'));
        $response->assertStatus(302);
        $response = $this->get(route('chat'));
        $response->assertStatus(200);
    }

    public function test_login_success()
    {
        // テストユーザーを作成
        $user = User::factory()->create([
            'email' => 'test3@example.com',
            'password' => bcrypt('password'),
        ]);

        // ログインリクエストを実行
        $response = $this->post(route('post.login'), [
            'email' => 'test3@example.com',
            'password' => 'password',
        ]);

        // アサーション
        $response->assertRedirect(route('chat')); // チャット画面にリダイレクトされること
        $this->assertAuthenticatedAs($user); // 指定したユーザーとして認証されていること
    }

    public function test_login_failure()
    {
        // テストユーザーを作成
        User::factory()->create([
            'email' => 'test3@example.com',
            'password' => bcrypt('password'),
        ]);

        // 誤ったパスワードでログインリクエストを実行
        $response = $this->post(route('post.login'), [
            'email' => 'test3@example.com',
            'password' => 'wrong_password',
        ]);

        // アサーション
        $response->assertRedirect(); // 元のページにリダイレクトされること
        $response->assertSessionHasErrors('email'); // エラーメッセージがセッションに格納されていること
        $this->assertGuest(); // 未認証状態であること
    }
}
