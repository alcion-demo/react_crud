<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ログイン済みならダッシュボード
Route::get('/', function () {
    return auth()->check()
        ? redirect('/dashboard')
        : redirect('/auth/login');
});

Route::middleware('guest')->group(function () {
    // Route::get('/login', fn () => redirect()->route('login'));
    Route::get('/auth/register', fn () => Inertia::render('Auth/Register'))->name('register');
    Route::get('/auth/login', fn () => Inertia::render('Auth/Login'))->name('login');
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', fn () => Inertia::render('Dashboard'))->name('dashboard');
});