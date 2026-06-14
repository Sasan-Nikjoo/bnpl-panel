<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MerchantDashboardController extends Controller
{
    public function index(Request $request)
    {
        $merchant = $request->user()->merchant;

        $transactions = $merchant->transactions()->latest()->get();

        return Inertia::render('merchant/dashboard', [
            'merchant' => $merchant,
            'transactions' => $transactions,
            'stats' => [
                'total_transactions' => $transactions->count(),
                'total_volume' => $transactions->sum('amount'),
                'total_commission' => $transactions->sum('commission'),
                'pending_count' => $transactions->where('status', 'pending')->count(),
            ],
        ]);
    }
}