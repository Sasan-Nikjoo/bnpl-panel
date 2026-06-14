import MerchantLayout from '@/layouts/MerchantLayout';
import { Head } from '@inertiajs/react';

interface Transaction {
    id: number;
    customer_name: string;
    amount: number;
    commission: number;
    installments: number;
    status: 'completed' | 'pending' | 'overdue';
    created_at: string;
}

interface Merchant {
    store_name: string;
    category: string;
    commission_rate: number;
    status: string;
}

interface Stats {
    total_transactions: number;
    total_volume: number;
    total_commission: number;
    pending_count: number;
}

interface Props {
    merchant: Merchant;
    transactions: Transaction[];
    stats: Stats;
}

const statusLabels: Record<string, { text: string; color: string }> = {
    completed: { text: 'تکمیل‌شده', color: 'bg-green-100 text-green-700' },
    pending: { text: 'در انتظار', color: 'bg-yellow-100 text-yellow-700' },
    overdue: { text: 'معوقه', color: 'bg-red-100 text-red-700' },
};

function formatCurrency(value: number) {
    return new Intl.NumberFormat('fa-IR').format(value) + ' تومان';
}

export default function MerchantDashboard({ merchant, transactions, stats }: Props) {
    return (
        <>
            <Head title="داشبورد ادمین" />

            <MerchantLayout storeName={merchant.store_name}>
                <div className="max-w-7xl mx-auto px-6 py-10">

                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-brand-dark">
                            خوش آمدید، {merchant.store_name} 👋
                        </h1>
                        <p className="text-muted mt-1">
                            دسته‌بندی: {merchant.category} · کارمزد: {merchant.commission_rate}٪
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                            <div className="text-muted text-sm mb-2">تعداد تراکنش‌ها</div>
                            <div className="text-3xl font-bold text-brand-dark">{stats.total_transactions}</div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                            <div className="text-muted text-sm mb-2">حجم کل معاملات</div>
                            <div className="text-2xl font-bold text-brand-dark">{formatCurrency(stats.total_volume)}</div>
                        </div>
                        <div className="bg-primary text-white rounded-2xl shadow-sm p-6">
                            <div className="text-sm mb-2 opacity-90">کارمزد دریافتی توسط BNPL</div>
                            <div className="text-2xl font-bold">{formatCurrency(stats.total_commission)}</div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                            <div className="text-muted text-sm mb-2">تراکنش‌های در انتظار</div>
                            <div className="text-3xl font-bold text-brand-dark">{stats.pending_count}</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h2 className="font-bold text-brand-dark">تراکنش‌های اخیر</h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 text-muted">
                                    <tr>
                                        <th className="px-6 py-3 text-right font-medium">مشتری</th>
                                        <th className="px-6 py-3 text-right font-medium">مبلغ خرید</th>
                                        <th className="px-6 py-3 text-right font-medium">کارمزد</th>
                                        <th className="px-6 py-3 text-right font-medium">تعداد اقساط</th>
                                        <th className="px-6 py-3 text-right font-medium">وضعیت</th>
                                        <th className="px-6 py-3 text-right font-medium">تاریخ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((t) => (
                                        <tr key={t.id} className="border-t border-gray-50 hover:bg-gray-50 transition">
                                            <td className="px-6 py-4 font-medium text-brand-dark">{t.customer_name}</td>
                                            <td className="px-6 py-4">{formatCurrency(t.amount)}</td>
                                            <td className="px-6 py-4 text-primary">{formatCurrency(t.commission)}</td>
                                            <td className="px-6 py-4">{t.installments} قسط</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusLabels[t.status].color}`}>
                                                    {statusLabels[t.status].text}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-muted">
                                                {new Date(t.created_at).toLocaleDateString('fa-IR')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {transactions.length === 0 && (
                            <div className="text-center py-12 text-muted">
                                هنوز تراکنشی ثبت نشده است
                            </div>
                        )}
                    </div>
                </div>
            </MerchantLayout>
        </>
    );
}