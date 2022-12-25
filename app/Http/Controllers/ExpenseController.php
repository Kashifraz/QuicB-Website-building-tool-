<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpenseController extends Controller
{


    public function index()
    {

        $ExpenseSum = $this->SumExpenses();
        $expenses = Expense::latest()->paginate(5);
        return Inertia::render('Admin/Expense', [
            'expenses' => $expenses,
            'ExpenseSum' => $ExpenseSum,
        ]);
    }

    public function allDelete(Request $request)
    {
        $ids = json_decode($request->ids);
        Expense::whereIn('id', $ids)->delete();

        return redirect()->route('expense.index')
        ->with('message',' Selected expense(s) deleted successfully.');
    }

    function SumExpenses($filter = null)
    {
        if ($filter == null) {
            $ExpenseSum = Expense::all()->sum('amount');
        }
        return $ExpenseSum;
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => ['required'],
            'expensetype' => ['required'],
            'amount' => ['required', 'integer','min:0'],
            'description' => ['required'],
        ]);

        Expense::create($request->all());

        return redirect()->route('expense.index')
            ->with('message', "expense added successfully");
    }


    public function destroy(Expense $expense)
    {
        $expense->delete();
        return redirect()->route('expense.index')
            ->with('message', "Expense record deleted successfully");
    }
}
