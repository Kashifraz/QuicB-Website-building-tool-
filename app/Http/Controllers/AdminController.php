<?php

namespace App\Http\Controllers;

use GuzzleHttp\Middleware;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

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
            return Inertia::render('adminDashboard');
         }

         return Inertia::render('Admin/Login');
    }
}
