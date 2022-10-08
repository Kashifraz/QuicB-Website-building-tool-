<?php

namespace App\Http\Controllers;

use GuzzleHttp\Middleware;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Validation\Rules;

class AdminController extends Controller
{
    //showing admin login form
    public function showLogin()
    {
        return Inertia::render('Admin/Login');
    }


    //Authentication login
    public function authenticate(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {

            $request->session()->regenerate();
            return redirect()->route('admin.dashboard');
        }
        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }


    //showing admin dashboard
    public function Dashboard()
    {
        if (Auth::check() && $this->middleware(['admin'])) {
            $revenue = app('App\Http\Controllers\CustomerController')->CalculateRevenue();
            $expenses = app('App\Http\Controllers\ExpenseController')->SumExpenses();
            $profit = $revenue - $expenses;

            return Inertia::render('adminDashboard', [
                'profit' => $profit,
                'revenue' => $revenue,
                'expenses' => $expenses
            ]);
        }
        return Inertia::render('Admin/Login');
    }


    public function RegisterForm(Request $request)
    {

        return Inertia::render('Admin/Register');
    }

    public function RegisterNewAdmin(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        if ($request->is_admin) {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'is_admin' => true,
            ]);
            event(new Registered($user));
            Auth::login($user);
            return redirect(RouteServiceProvider::HOME);
        }

        abort('404');
    }
}
