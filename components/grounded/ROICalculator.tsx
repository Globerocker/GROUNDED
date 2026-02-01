'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

export default function ROICalculator({ basePrice }: { basePrice: number }) {
    const [nightlyRate, setNightlyRate] = useState(150);
    const [occupancy, setOccupancy] = useState(65);
    const [isManaged, setIsManaged] = useState(true);

    const managementFee = isManaged ? 0.20 : 0; // 20% if managed
    const yearlyRevenue = nightlyRate * 365 * (occupancy / 100);
    const yearlyOpEx = yearlyRevenue * managementFee + (2000); // 2k base utilities/maintenance
    const netIncome = yearlyRevenue - yearlyOpEx;
    const yieldPercentage = (netIncome / basePrice) * 100;

    return (
        <div className="bg-card border border-border p-6 space-y-6">
            <div className="flex justify-between items-baseline border-b border-white/10 pb-4">
                <h3 className="text-lg font-light tracking-wide">ROI Estimator</h3>
                <div className="text-sm px-2 py-1 bg-accent/20 text-accent rounded-sm">
                    {yieldPercentage.toFixed(1)}% Yield
                </div>
            </div>

            <div className="space-y-4">
                {/* Nightly Rate Slider */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm text-foreground/70">
                        <span>Nightly Rate</span>
                        <span>${nightlyRate}</span>
                    </div>
                    <input
                        type="range"
                        min="50"
                        max="500"
                        step="10"
                        aria-label="Nightly Rate"
                        value={nightlyRate}
                        onChange={(e) => setNightlyRate(Number(e.target.value))}
                        className="w-full h-1 bg-white/20 appearance-none cursor-pointer rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent"
                    />
                </div>

                {/* Occupancy Slider */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm text-foreground/70">
                        <span>Occupancy</span>
                        <span>{occupancy}%</span>
                    </div>
                    <input
                        type="range"
                        min="30"
                        max="100"
                        step="5"
                        aria-label="Occupancy Rate"
                        value={occupancy}
                        onChange={(e) => setOccupancy(Number(e.target.value))}
                        className="w-full h-1 bg-white/20 appearance-none cursor-pointer rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent"
                    />
                </div>

                {/* Management Toggle */}
                <div className="flex items-center justify-between text-sm py-2">
                    <span className="text-foreground/70">Fully Managed (20%)</span>
                    <button
                        onClick={() => setIsManaged(!isManaged)}
                        className={`w-10 h-5 rounded-full relative transition-colors ${isManaged ? 'bg-accent' : 'bg-neutral-800'}`}
                        aria-label="Toggle Management Fee"
                    >
                        <motion.div
                            animate={{ x: isManaged ? 20 : 2 }}
                            className="absolute top-1 left-0 w-3 h-3 bg-white rounded-full shadow-sm"
                        />
                    </button>
                </div>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-1">
                <div className="flex justify-between items-end">
                    <span className="text-foreground/60 text-sm">Est. Net Income</span>
                    <span className="text-2xl font-light">${netIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <p className="text-xs text-foreground/30 text-right">Per Year</p>
            </div>
        </div>
    );
}
