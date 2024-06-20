<?php

use App\Http\Controllers\ConsoleController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/consoles', [ConsoleController::class, 'index'])->name('console.index');
    Route::post('/console', [ConsoleController::class, 'store'])->name('console.store');
    Route::patch('/console/{console}', [ConsoleController::class, 'update'])->name('console.update');
    Route::delete('/console/{console}/delete', [ConsoleController::class, 'destroy'])->name('console.destroy');
});

require __DIR__ . '/auth.php';
