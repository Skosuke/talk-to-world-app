<?php

namespace Tests\Feature;
use Tests\TestCase;
use Inertia\Testing\AssertableInertia as Assert;

class ExampleTest extends TestCase
{
    public function test_the_application_returns_a_successful_response(): void
    {
        $response = $this->followingRedirects()->get('/');
        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page->component('Chat'));
    }
}