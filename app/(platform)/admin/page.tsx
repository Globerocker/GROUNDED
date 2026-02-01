import { createClient } from '@/lib/supabase/server';
import { ArrowUpRight, DollarSign, Users, Home } from 'lucide-react';
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';

export default async function AdminOverview() {
    const supabase = await createClient();

    // Fetch quick stats
    const { count: modelCount } = await supabase.from('house_models').select('*', { count: 'exact', head: true });
    const { count: locCount } = await supabase.from('locations').select('*', { count: 'exact', head: true });

    // Determine active sales (mock for now as 'orders' table is empty in seed)
    const activeSales = 3;

    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-3xl font-light">Overview</h1>
                <p className="text-neutral-400 mt-2">Welcome back, Admin.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-neutral-900 border border-white/10 p-6 rounded-lg space-y-4">
                    <div className="flex justify-between items-start">
                        <div className="p-2 bg-white/5 rounded-md">
                            <Home size={20} className="text-neutral-400" />
                        </div>
                        <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                            +12% <ArrowUpRight size={12} />
                        </span>
                    </div>
                    <div>
                        <div className="text-2xl font-light">{modelCount || 0} Models</div>
                        <div className="text-sm text-neutral-500">Active catalog items</div>
                    </div>
                </div>

                <div className="bg-neutral-900 border border-white/10 p-6 rounded-lg space-y-4">
                    <div className="flex justify-between items-start">
                        <div className="p-2 bg-white/5 rounded-md">
                            <Users size={20} className="text-neutral-400" />
                        </div>
                        <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                            +5% <ArrowUpRight size={12} />
                        </span>
                    </div>
                    <div>
                        <div className="text-2xl font-light">{locCount || 0} Locations</div>
                        <div className="text-sm text-neutral-500">Active deployment sites</div>
                    </div>
                </div>

                <div className="bg-neutral-900 border border-white/10 p-6 rounded-lg space-y-4">
                    <div className="flex justify-between items-start">
                        <div className="p-2 bg-white/5 rounded-md">
                            <DollarSign size={20} className="text-neutral-400" />
                        </div>
                        <span className="text-xs font-medium text-white/40">
                            YTD
                        </span>
                    </div>
                    <div>
                        <div className="text-2xl font-light">{activeSales} Active Leads</div>
                        <div className="text-sm text-neutral-500">In negotiation pipeline</div>
                    </div>
                </div>
            </div>

            {/* Analytics Section */}
            <div className="pt-8 border-t border-white/5">
                <AnalyticsDashboard />
            </div>
        </div>
    );
}
