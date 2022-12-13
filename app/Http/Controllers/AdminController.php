<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Validation\Rules;
use Carbon\carbon;

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

    //calculating profit and loss metrices
    public function CalculateProfit()
    {
        $revenue = app('App\Http\Controllers\CustomerController')->CalculateRevenue();
        $expenses = app('App\Http\Controllers\ExpenseController')->SumExpenses();
        $profit = $revenue - $expenses;
        return compact('revenue', 'expenses', 'profit');
    }

    //fetching filtered data for Pie Chart
    public function RenderPieChart()
    {
        $record = User::select(DB::raw("COUNT(*) as count"), DB::raw("DAYNAME(created_at) as day_name"), DB::raw("DAY(created_at) as day"))
            ->where('created_at', '>', Carbon::today()->subDay(6))
            ->groupBy('day_name', 'day')
            ->orderBy('day')
            ->get();

        $label = [];
        $data = [];

        foreach ($record as $row) {
            $label[] = $row->day_name;
            $data[] = (int) $row->count;
        }
        return compact('label', 'data');
    }


    //fetching filtered data for bar Chart
    public function RenderBarChart()
    {
        $month = [
            'january', 'february', 'march', 'april', 'may', 'june',
            'july', 'august', 'september', 'october', 'november', 'december'
        ];
        $user = [];
        foreach ($month as $key => $value) {
            $user[] = User::where(DB::raw("DATE_FORMAT(created_at, '%M')"), $value)
            ->whereYear('created_at', Carbon::now()->format('Y'))->count();
        }
        return compact('user', 'month');
    }
    //fetching filtered data for Line Chart
    public function RenderLineChart()
    {
        $month = [
            'january', 'february', 'march', 'april', 'may', 'june',
            'july', 'august', 'september', 'october', 'november', 'december'
        ];
        $user = [];
        foreach ($month as $key => $value) {

            $user[] = user::where(DB::raw("DATE_FORMAT(created_at, '%M')"), $value)
            ->whereYear('created_at', Carbon::now()->format('Y'))->count();
        }
        return compact('user', 'month');
    }

    //showing admin dashboard
    public function Dashboard()
    {
        if (Auth::check() && $this->middleware(['admin'])) {

            $profitValues = $this->CalculateProfit();
            $PieChart = $this->RenderPieChart();
            $BarChart = $this->RenderBarChart();
            return Inertia::render('Admin/adminDashboard', [
                'profitValues' => $profitValues,
                'PieChart' => $PieChart,
                'BarChart' => $BarChart,
            ]);
        }
        return Inertia::render('Admin/Login');
    }

    //showing new admin registeration form
    public function RegisterForm(Request $request)
    {
        return Inertia::render('Admin/Register');
    }

    //Storing new admin
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
