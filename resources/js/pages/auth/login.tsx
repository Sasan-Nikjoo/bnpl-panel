import { Head, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    function submit(e: FormEvent) {
        e.preventDefault();
        post('/login');
    }

    return (
        <>
            <Head title="ورود" />

            <div className="min-h-screen bg-brand-dark flex items-center justify-center font-sans" dir="rtl">
                <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md">

                    <div className="text-center mb-8">
                        <div className="text-3xl font-bold text-primary mb-2">◈ BNPL</div>
                        <p className="text-muted">ورود به پنل مرچنت</p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-brand-dark mb-1">
                                ایمیل
                            </label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                                placeholder="shop@example.com"
                            />
                            {errors.email && (
                                <p className="text-secondary text-sm mt-1">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-brand-dark mb-1">
                                رمز عبور
                            </label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                                placeholder="••••••••"
                            />
                            {errors.password && (
                                <p className="text-secondary text-sm mt-1">{errors.password}</p>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="rounded"
                            />
                            <label htmlFor="remember" className="text-sm text-muted">
                                مرا به خاطر بسپار
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition disabled:opacity-50"
                        >
                            {processing ? 'در حال ورود...' : 'ورود به پنل'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-muted">
                        <p>برای تست:</p>
                        <p className="font-mono mt-1">shop@example.com / password</p>
                    </div>
                </div>
            </div>
        </>
    );
}