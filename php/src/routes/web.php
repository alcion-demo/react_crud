<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Todo;
use App\Models\User;
use App\Http\Controllers\Todo\TodoController;
use App\Http\Controllers\Calendar\CalendarController;

// ログイン済みならダッシュボード
Route::get('/', function () {
    return auth()->check()
        ? redirect('/dashboard')
        : redirect('/auth/login');
});

Route::middleware('guest')->group(function () {
    Route::get('/auth/register', fn () => Inertia::render('Auth/Register'))->name('register');
    Route::get('/auth/login', fn () => Inertia::render('Auth/Login'))->name('login');
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', fn () => Inertia::render('Dashboard'))->name('dashboard');

});

Route::post('/auth/logout', function () {
    auth()->logout();

    return redirect('/auth/login')
        ->with('success', 'ログアウトしました');
});

Route::middleware('auth')->group(function () {
    Route::resource('todos', TodoController::class);
    Route::resource('calendars', CalendarController::class)->only(['index']);
});
