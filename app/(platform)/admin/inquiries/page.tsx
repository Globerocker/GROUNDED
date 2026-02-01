'use client';

import { useState } from 'react';

// Mock data until we hook up to real `leads` table
const initialPipeline = {
    new: [
        { id: '1', name: 'Alice Smith', email: 'alice@example.com', model: 'Model A', date: '2h ago' },
        { id: '2', name: 'Bob Jones', email: 'bob@example.com', model: 'Location Inquiry', date: '5h ago' },
    ],
    contacted: [
        { id: '3', name: 'Charlie Day', email: 'charlie@example.com', model: 'Model C', date: '1d ago' },
    ],
    negotiating: [],
    closed: []
};

export default function InquiryKanban() {
    const [pipeline, setPipeline] = useState(initialPipeline);

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col">
            <div className="mb-8">
                <h1 className="text-3xl font-light">Inquiry Pipeline</h1>
                <p className="text-neutral-400 mt-2">Track and manage incoming unit reservations.</p>
            </div>

            <div className="flex-1 overflow-x-auto">
                <div className="flex gap-6 h-full min-w-[1000px]">

                    {/* Column: New */}
                    <div className="w-80 bg-neutral-900/50 border border-white/5 rounded-lg flex flex-col">
                        <div className="p-4 border-b border-white/5 flex justify-between items-center">
                            <h3 className="font-medium text-sm">New Leads</h3>
                            <span className="bg-accent text-white text-[10px] px-2 py-0.5 rounded-full">{pipeline.new.length}</span>
                        </div>
                        <div className="p-4 space-y-3 flex-1 overflow-y-auto">
                            {pipeline.new.map(lead => (
                                <div key={lead.id} className="bg-neutral-800 p-4 rounded border border-white/5 shadow-sm hover:border-accent/50 cursor-grab active:cursor-grabbing transition-colors">
                                    <div className="font-medium">{lead.name}</div>
                                    <div className="text-xs text-neutral-400 mt-1">{lead.model}</div>
                                    <div className="text-[10px] text-neutral-500 mt-3 text-right">{lead.date}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Column: Contacted */}
                    <div className="w-80 bg-neutral-900/50 border border-white/5 rounded-lg flex flex-col">
                        <div className="p-4 border-b border-white/5 flex justify-between items-center">
                            <h3 className="font-medium text-sm">Contacted</h3>
                            <span className="bg-white/10 text-neutral-300 text-[10px] px-2 py-0.5 rounded-full">{pipeline.contacted.length}</span>
                        </div>
                        <div className="p-4 space-y-3 flex-1 overflow-y-auto">
                            {pipeline.contacted.map(lead => (
                                <div key={lead.id} className="bg-neutral-800 p-4 rounded border border-white/5 shadow-sm hover:border-accent/50 cursor-grab active:cursor-grabbing transition-colors">
                                    <div className="font-medium">{lead.name}</div>
                                    <div className="text-xs text-neutral-400 mt-1">{lead.model}</div>
                                    <div className="text-[10px] text-neutral-500 mt-3 text-right">{lead.date}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Column: Negotiating */}
                    <div className="w-80 bg-neutral-900/50 border border-white/5 rounded-lg flex flex-col">
                        <div className="p-4 border-b border-white/5 flex justify-between items-center">
                            <h3 className="font-medium text-sm">Negotiating</h3>
                            <span className="bg-white/10 text-neutral-300 text-[10px] px-2 py-0.5 rounded-full">0</span>
                        </div>
                        <div className="p-4 flex-1 bg-white/5 border-dashed border-2 border-white/5 rounded m-2 flex items-center justify-center text-xs text-neutral-600">
                            Drop items here
                        </div>
                    </div>

                    {/* Column: Closed */}
                    <div className="w-80 bg-neutral-900/50 border border-white/5 rounded-lg flex flex-col">
                        <div className="p-4 border-b border-white/5 flex justify-between items-center">
                            <h3 className="font-medium text-sm text-emerald-400">Deposited</h3>
                            <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full">0</span>
                        </div>
                        <div className="p-4 flex-1 bg-white/5 border-dashed border-2 border-white/5 rounded m-2 flex items-center justify-center text-xs text-neutral-600">
                            Drop items here
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
