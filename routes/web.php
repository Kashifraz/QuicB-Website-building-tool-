<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AttributeController;
use App\Http\Controllers\ComponentController;
use App\Http\Controllers\PlanController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ElementController;
use App\Http\Controllers\ElementgroupController;
use App\Http\Controllers\ProjectcomponentController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\PropertyController;
use App\Models\Elementgroup;

// Route::get('/', function () {
//     return Inertia::render('home', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });
Route::view('/','home');
Route::get('/dashboard', function () {
    $user = Auth()->user();
    $projects = $user->projects;
    return Inertia::render('Dashboard',[
        "user_id"  => $user->id,
        "projects" => $projects,
    ]);
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
    Route::delete('/admin/allcustomers', [CustomerController::class,"allDelete"])
    ->name('customers.alldelete');
    
    Route::get('/admin/subscribers', [CustomerController::class, 'subscribers'])
        ->name('customers.subscribers');
    
    //expense routes

    Route::resource('/admin/expense', ExpenseController::class)
        ->only(['index', 'store', 'destroy']);    
    Route::delete('/admin/allexpenses', [ExpenseController::class,"allDelete"])
    ->name('expense.alldelete');
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
    //Admin add component routes
    Route::get('/admin/addcomponent', [ComponentController::class,'index'])->name('admin.addcomponent');
    Route::post('/admin/addcomponent', [ComponentController::class,'createComponent'])->name('admin.addcomponent');
    Route::delete('/admin/destroycompoent/{component}', [ComponentController::class,"destroy"])->name('component.destroy');
    
    //Admin add Element Group routes
    Route::get('/admin/showcomponent/{component}', [ComponentController::class, 'show'])->name('component.show');
    Route::post('/admin/addelementgroup', [ElementgroupController::class, 'store'])->name('admin.addelementgroup');
    Route::delete('/admin/destroyelementgroup/{elementgroup}', [ElementgroupController::class,"destroy"])->name('elementgroup.destroy');
    
    //admin add Element routes
    Route::post('/admin/addelement', [ElementController::class, 'store'])->name('admin.addelement');
    Route::get('/admin/showelement/{element}', [ElementController::class, 'show'])->name('element.show');
    Route::delete('/admin/destroyelement/{element}', [ElementController::class,"destroy"])->name('element.destroy');

   //admin Attribute Routes
    Route::post('/admin/addattribute', [AttributeController::class,"store"])->name('admin.addattribute');
    Route::delete('/admin/destroyattribute/{attribute}', [AttributeController::class,"destroy"])->name('attribute.destroy');

   //admin Properties Routes 
    Route::post('/admin/addproperty', [PropertyController::class, "store"])->name('admin.addproperty');
    Route::delete('/admin/destroyproperty/{property}', [PropertyController::class,"destroy"])->name('property.destroy');

});

//profile Route
Route::get('/profile', [ProfileController::class, 'index'])
->middleware(['auth','notadmin'])->name('user.profile');
Route::post('/updateprofile', [ProfileController::class, 'updateProfileInfo'])
    ->middleware('auth')->name('profile.info');
Route::post('/updatepass', [ProfileController::class, 'ChangePassword'])
    ->middleware('auth')->name('profile.pass');

//project Routes
Route::middleware(['auth', 'notadmin'])->group(function () {
    Route::get('/showhtml', [ProjectController::class, "generateHtml"]);
    Route::get('/showcss', [ProjectController::class, "generateCSS"]);
    Route::post('/createproject',[ProjectController::class, "createProject"])->name('project.create');
    Route::get('/canvas/{project}', [ProjectController::class, "getCanvas"])->name('project.canvas');
    Route::post('/copyproject',[ProjectcomponentController::class, "copyComponent"])->name('component.copy');
    Route::post('/customization.submit',[ProjectcomponentController::class, "submitCustomization"])->name('customization.submit');
});

require __DIR__ . '/auth.php';
