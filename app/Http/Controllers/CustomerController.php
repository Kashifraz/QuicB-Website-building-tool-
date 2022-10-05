<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $customer = User::when($request->search, function ($query, $search) {
            $query->where('name', 'LIKE', "%{$search}%")
                ->orWhere('email', 'LIKE', "%{$search}%")
                ->paginate(5);
        })->where('is_admin', 'false')->paginate(5);

        return Inertia::render('customer', [
            'customers' => $customer,
        ]);
    }

    public function BusinessReport()
    {
        $customer = DB::table('users')
            ->join('subscriptions', 'users.id', '=', 'subscriptions.user_id')
            ->select('users.*', 'subscriptions.stripe_status', 'subscriptions.name as subscription_name')
            ->paginate(5);
        return Inertia::render('BusinessReport', [
            'customers' => $customer,
        ]);
    }


    public function destroy($id)
    {
        User::find($id)->delete();
        return redirect()->route('customers.index');
    }
}
