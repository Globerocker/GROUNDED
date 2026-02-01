

import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import {
    LayoutDashboard,
    FileText,
    MessageSquare,
    Settings,
    LogOut
} from 'lucide-react';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    return (
        <div className="flex h-screen bg-background pt-20">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 flex flex-col">
                <div className="p-6 border-b border-white/10">
                    <span className="font-medium tracking-widest text-sm text-neutral-400">ADMIN CONTROL</span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded hover:bg-white/5 text-neutral-400 hover:text-white transition-colors">
                        <LayoutDashboard size={18} />
                        <span>Overview</span>
                    </Link>
                    <Link href="/admin/cms" className="flex items-center gap-3 px-4 py-3 rounded hover:bg-white/5 text-neutral-400 hover:text-white transition-colors">
                        <FileText size={18} />
                        <span>CMS Content</span>
                    </Link>
                    <Link href="/admin/inquiries" className="flex items-center gap-3 px-4 py-3 rounded hover:bg-white/5 text-neutral-400 hover:text-white transition-colors">
                        <MessageSquare size={18} />
                        <span>Inquiries</span>
                    </Link>
                    <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded hover:bg-white/5 text-neutral-400 hover:text-white transition-colors">
                        <Settings size={18} />
                        <span>Settings</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-white/10">
                    <form action={async () => {
                        'use server';
                        const supabase = await createClient();
                        await supabase.auth.signOut();
                        redirect('/');
                    }}>
                        <button className="flex items-center gap-3 px-4 py-3 w-full rounded hover:bg-red-500/10 text-neutral-400 hover:text-red-400 transition-colors">
                            <LogOut size={18} />
                            <span>Logout</span>
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    );
}
