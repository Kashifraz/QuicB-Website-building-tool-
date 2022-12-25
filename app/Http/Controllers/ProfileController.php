<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Password;

class ProfileController extends Controller
{
    public function index()
    {

        return Inertia::render('profile');
    }

    public function AdminProfile()
    {

        return Inertia::render('Admin/profile');
    }

    public function updateProfileInfo(Request $request)
    {

        $request->validate([
            'name' => 'required|min:4|string|max:255',
            'email' => 'required|email|string|max:255'
        ]);
        $user = Auth::user();

        User::where('id', $user->id)
            ->update([
                'name' => $request->name,
                'email' => $request->email
            ]);

        return back()->with('message', 'Profile Updated');
    }

    public function ChangePassword(Request $request)
    {
        $user = Auth::user();
        $request->validate([
            'current_password' => 'required',
            'password' => ['required', 'min:8'],
            'password_confirmation' => ['required', 'min:8'],
        ]);

        if (
            Hash::check($request->current_password, $user->password) &&
            $request->current_password != $request->password &&
            $request->password == $request->password_confirmation
        ) {

            User::where('id', $user->id)
                ->update([
                    'password' => Hash::make($request->password),
                ]);

            return redirect()->back()->with('message', 'Password Changed');
        }

        return redirect()->back()->with('message', 'invalid inputs in password fields');
    }
}
