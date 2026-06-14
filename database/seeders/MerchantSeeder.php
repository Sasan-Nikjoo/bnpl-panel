<?php

namespace Database\Seeders;

use App\Models\Merchant;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Seeder;

class MerchantSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::create([
            'name' => 'فروشگاه پوشاک ساسان',
            'email' => 'shop@example.com',
            'password' => bcrypt('password'),
        ]);

        $merchant = Merchant::create([
            'user_id' => $user->id,
            'store_name' => 'پوشاک ساسان',
            'category' => 'پوشاک',
            'commission_rate' => 5.5,
            'status' => 'active',
        ]);

        $transactions = [
            ['customer_name' => 'علی محمدی', 'amount' => 1350000, 'status' => 'completed', 'installments' => 4],
            ['customer_name' => 'سارا احمدی', 'amount' => 890000, 'status' => 'pending', 'installments' => 3],
            ['customer_name' => 'رضا کریمی', 'amount' => 2100000, 'status' => 'completed', 'installments' => 4],
            ['customer_name' => 'مریم حسینی', 'amount' => 840000, 'status' => 'overdue', 'installments' => 2],
            ['customer_name' => 'حسین رضایی', 'amount' => 1750000, 'status' => 'completed', 'installments' => 4],
        ];

        foreach ($transactions as $t) {
            Transaction::create([
                'merchant_id' => $merchant->id,
                'customer_name' => $t['customer_name'],
                'amount' => $t['amount'],
                'commission' => $t['amount'] * 0.055,
                'installments' => $t['installments'],
                'status' => $t['status'],
            ]);
        }
    }
}