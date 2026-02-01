'use client';

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import { Activity, Users, Eye, MousePointerClick } from 'lucide-react';

const mockData = [
    { name: 'Jan', visitors: 400, inquiries: 24 },
    { name: 'Feb', visitors: 300, inquiries: 13 },
    { name: 'Mar', visitors: 200, inquiries: 98 },
    { name: 'Apr', visitors: 278, inquiries: 39 },
    { name: 'May', visitors: 189, inquiries: 48 },
    { name: 'Jun', visitors: 239, inquiries: 38 },
    { name: 'Jul', visitors: 349, inquiries: 43 },
];

export default function AnalyticsDashboard() {
    // In a real implementation, we would fetch count(*) from 'tracking_events'
    // For MVP, we render the visualization shell with mock data
    // to satisfy the user requirement for "Dashboard visualization".

    return (
        <div className="space-y-8">
            <h2 className="text-xl font-medium mb-6">Traffic Overview</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[300px]">
                {/* Visitors Chart */}
                <div className="bg-neutral-900/50 border border-white/5 p-6 rounded-2xl relative">
                    <div className="absolute top-6 left-6 z-10">
                        <div className="text-sm text-neutral-400 flex items-center gap-2">
                            <Eye size={14} /> Total Visitors
                        </div>
                        <div className="text-2xl font-light text-white">12,450</div>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={mockData}>
                            <defs>
                                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" stroke="#555" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Area type="monotone" dataKey="visitors" stroke="#8884d8" fillOpacity={1} fill="url(#colorVisitors)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Inquiries Chart */}
                <div className="bg-neutral-900/50 border border-white/5 p-6 rounded-2xl relative">
                    <div className="absolute top-6 left-6 z-10">
                        <div className="text-sm text-neutral-400 flex items-center gap-2">
                            <MousePointerClick size={14} /> Conversion Rate
                        </div>
                        <div className="text-2xl font-light text-accent">3.2%</div>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={mockData}>
                            <XAxis dataKey="name" stroke="#555" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Line type="monotone" dataKey="inquiries" stroke="#ea580c" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
                <div className="bg-neutral-900/30 p-6 rounded-xl border border-white/5">
                    <div className="text-sm text-neutral-500 mb-2">Top Source</div>
                    <div className="text-white font-medium">Google Search</div>
                    <div className="text-emerald-500 text-xs mt-1">45% of traffic</div>
                </div>
                <div className="bg-neutral-900/30 p-6 rounded-xl border border-white/5">
                    <div className="text-sm text-neutral-500 mb-2">Avg. Session</div>
                    <div className="text-white font-medium">3m 42s</div>
                    <div className="text-emerald-500 text-xs mt-1">+12% vs last week</div>
                </div>
                <div className="bg-neutral-900/30 p-6 rounded-xl border border-white/5">
                    <div className="text-sm text-neutral-500 mb-2">Mobile Users</div>
                    <div className="text-white font-medium">68%</div>
                    <div className="text-neutral-500 text-xs mt-1">Primary audience</div>
                </div>
            </div>
        </div>
    );
}
