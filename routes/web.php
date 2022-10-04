<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\PlanController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CustomerController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

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
})->middleware(['auth', 'verified','notadmin'])->name('dashboard');

Route::get('/admin/customers',[CustomerController::class,'index'])->name('customers');
Route::resource('/admin/customers', CustomerController::class)
    ->only(['index', 'destroy'])
    ->middleware(['auth', 'verified']);
//admin routes
Route::get('/admin/login',[AdminController::class,'showLogin'])->name('admin.login')->middleware('guest');
Route::post('/admin/authenticate',[AdminController::class,'authenticate'])->name('admin.authenticate');
Route::get('/admin/dashboard',[AdminController::class,'Dashboard'])->name('admin.dashboard')
->middleware(['auth', 'admin']);

//Plan and subscription routes
Route::middleware(['auth','subscriber'])->group(function () {
    Route::get('plans', [PlanController::class, 'index'])->name('plans');
    Route::get('plans/{plan}', [PlanController::class, 'show'])->name("plans.show");
    Route::post('subscription', [PlanController::class, 'subscription'])->name("subscription.create");
});

require __DIR__.'/auth.php';
