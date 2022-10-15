<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\User;
use Barryvdh\DomPDF\PDF as DomPDFPDF;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Pdf;


class CustomerController extends Controller
{

    public function index(Request $request)
    {
        $customer = User::when($request->search, function ($query, $search) {
            $query->where('name', 'LIKE', "%{$search}%")
                ->orWhere('email', 'LIKE', "%{$search}%")
                ->paginate(5);
        })->where('is_admin', 'false')->paginate(15);

        return Inertia::render('customer', [
            'customers' => $customer,
        ]);
    }

    public function generatePDF()
    {

        $data= [
            'name' => "kashif",
            'date' => date('D/M/Y'),
            'text' => 'this is our first pdf',
        ];
        $pdf = Pdf::loadView('report', $data);
        return $pdf->download('invoice.pdf');
    }

    public function CalculateRevenue()
    {
        $revenueBasic = DB::table('subscriptions')->where('name', 'basic')
            ->count();
        $revenuePremium = DB::table('subscriptions')->where('name', 'premium')
            ->count();
        $revenue = ($revenueBasic * 10) + ($revenuePremium * 100);
        return $revenue;
    }


    public function subscribers()
    {
        $customer = DB::table('users')
            ->join('subscriptions', 'users.id', '=', 'subscriptions.user_id')
            ->select('users.*', 'subscriptions.stripe_status', 'subscriptions.name as subscription_name')
            ->paginate(5);
        $totalRevenue = $this->CalculateRevenue();
        return Inertia::render('BusinessReport', [
            'customers' => $customer,
            'totalRevenue' => $totalRevenue,
        ]);
    }


    public function destroy($id)
    {
        User::find($id)->delete();
        return redirect()->route('customers.index');
    }
}
