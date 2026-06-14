import { Link } from '@inertiajs/react';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    storeName?: string;
}

export default function MerchantLayout({ children, storeName }: Props) {
    return (
        <div className="min-h-screen bg-brand-light font-sans" dir="rtl">
            <nav className="bg-brand-dark text-white">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-xl font-bold">
                        <span className="text-primary">◈</span>
                        <span>پنل ادمین BNPL</span>
                    </div>
                    {storeName && (
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-300">{storeName}</span>
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition"
                            >
                                خروج
                            </Link>
                        </div>
                    )}
                </div>
            </nav>

            <main>{children}</main>
        </div>
    );
}