<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Plan;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PlanController extends Controller
{
    public function index()
    {
        $plans = Plan::get();
        // $subscription = DB::table('subscriptions')->select('stripe_status')->where('user_id', auth()->user()->id)->first();
        // // if ($subscription != null) {

        // //     if ($subscription->stripe_status === 'active') {

        // //         return redirect()->route('dashboard')->with('message','you are already subscribed');
        // //     }
        // // }
        return view("plans", compact("plans"));
    }


    public function show(Plan $plan, Request $request)
    {
        $user = Auth::user();
        $intent = $user->createSetupIntent();
        return view("subscription", compact("plan", "intent"));
    }

    public function subscription(Request $request)
    {
        $plan = Plan::find($request->plan);

        $request->user()->newSubscription($plan->name, $plan->stripe_plan)
            ->create($request->token);
        return redirect()->route('dashboard')->with('success', 'you are successfully subscribed');
    }
}
