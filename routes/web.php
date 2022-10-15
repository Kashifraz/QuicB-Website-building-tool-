<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\PlanController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\ProfileController;

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
})->middleware(['auth', 'verified', 'notadmin'])->name('dashboard');

//Plan and subscription routes
Route::middleware(['auth', 'subscriber', 'notadmin'])->group(function () {
    Route::get('plans', [PlanController::class, 'index'])->name('plans');
    Route::get('plans/{plan}', [PlanController::class, 'show'])->name("plans.show");
    Route::post('subscription', [PlanController::class, 'subscription'])->name("subscription.create");
});



//admin routes
Route::middleware(['auth', 'admin'])->group(function () {
    Route::resource('/admin/customers', CustomerController::class)
        ->only(['index', 'destroy']);
    Route::get('/admin/subscribers', [CustomerController::class, 'subscribers'])
        ->name('customers.subscribers');
    Route::resource('/admin/expense', ExpenseController::class)
        ->only(['index', 'store', 'destroy']);
    Route::get('/admin/login', [AdminController::class, 'showLogin'])
        ->name('admin.login')->middleware('guest');
    Route::get('/admin/register', [AdminController::class, 'RegisterForm'])
        ->name('admin.register');
    Route::post('/admin/register', [AdminController::class, 'RegisterNewAdmin'])
        ->name('admin.register');
    Route::post('/admin/authenticate', [AdminController::class, 'authenticate'])
        ->name('admin.authenticate');
    Route::get('/admin/dashboard', [AdminController::class, 'Dashboard'])
        ->name('admin.dashboard');
    //Admin Profile route
    Route::get('/admin/profile', [ProfileController::class, 'AdminProfile'])
        ->name('admin.profile');
    Route::get('/admin/report',[CustomerController::class,'generatePDF'])
    ->name('report.pdf');
});

//profile Route
Route::get('/profile', [ProfileController::class, 'index'])
->middleware(['auth','notadmin'])->name('user.profile');
Route::post('/updateprofile', [ProfileController::class, 'updateProfileInfo'])
    ->middleware('auth')->name('profile.info');
Route::post('/updatepass', [ProfileController::class, 'ChangePassword'])
    ->middleware('auth')->name('profile.pass');

require __DIR__ . '/auth.php';
