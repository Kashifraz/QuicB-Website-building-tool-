<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Pdf;

use function PHPUnit\Framework\isEmpty;

class CustomerController extends Controller
{

    public function index(Request $request)
    {
        $customer = null;
        $search = "";
        $filter = 0;

        if ($request->search != "" && $request->filter != 0) {

            $search = $request->search;
            $filter = $request->filter;
            $days = Carbon::now()->subDays($filter);
            $customer = User::where('is_admin', 'false')
                ->where('created_at', '>', "$days")
                ->where('name', 'LIKE', "%{$search}%")
                ->orWhere('email', 'LIKE', "%{$filter}%")
                ->paginate(15);
        } else if ($request->search != "") {

            $search = $request->search;
            $customer = User::where('is_admin', 'false')
                ->where('name', 'LIKE', "%{$search}%")
                ->orWhere('email', 'LIKE', "%{$search}%")
                ->paginate(15);
        } else if ($request->filter != 0) {

            $filter = $request->filter;
            $days = Carbon::now()->subDays($filter);
            $customer = User::where('is_admin', 'false')
                ->where('created_at', '>', "$days")
                ->paginate(15);
        } else {
            $customer = User::where('is_admin', 'false')
                ->paginate(15);
        }

        return Inertia::render('customer', [
            'customers' => $customer,
            'search' => $search,
            'filter' => $filter,
        ]);
    }

    public function allDelete(Request $request)
    {
        $ids = json_decode($request->ids);
        User::whereIn('id', $ids)->delete();

        return redirect()->route('customers.index')
        ->with('message',' Selected customer(s) deleted successfully.');
    }

    public function generatePDF(Request $request)
    {
        $totalRevenue = $this->CalculateRevenue();
        $totalExpenses = app('App\Http\Controllers\ExpenseController')
            ->SumExpenses();
        $totalUsers = User::all()->count();
        $totalSubscribers = DB::table('subscriptions')->count();

        $data = [
            'totalRevenue' => $totalRevenue,
            "totalExpenses" => $totalExpenses,
            'totalUsers' => $totalUsers,
            'totalSubscribers' => $totalSubscribers,
            'date' => date('d/M/Y'),
        ];
        $pdf = Pdf::loadView('report', $data);
        return $pdf->download('invoice.pdf');
    }


    public function CalculateRevenue($filter = null)
    {
        if ($filter == NULL) {
            $revenueBasic = DB::table('subscriptions')->where('name', 'basic')
                ->count();
            $revenuePremium = DB::table('subscriptions')->where('name', 'premium')
                ->count();
            $revenue = ($revenueBasic * 10) + ($revenuePremium * 100);
        }
        return $revenue;
    }


    public function subscribers()
    {
        $customer = DB::table('users')
            ->join('subscriptions', 'users.id', '=', 'subscriptions.user_id')
            ->select('users.*', 'subscriptions.stripe_status', 'subscriptions.name as subscription_name')
            ->paginate(5);
        $totalRevenue = $this->CalculateRevenue();
        return Inertia::render('subscribers', [
            'customers' => $customer,
            'totalRevenue' => $totalRevenue,
        ]);
    }


    public function destroy($id)
    {
        User::find($id)->delete();
        return redirect()->route('customers.index')
        ->with('message',' Customer deleted successfully.');
    }
}
