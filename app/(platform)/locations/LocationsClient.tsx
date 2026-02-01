'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import MapView from '@/components/grounded/MapView';

interface Location {
    id: string;
    name: string;
    airport_code: string;
    coordinates: { lat: number; lng: number };
    airport_distance_km_min: number;
    airport_distance_km_max: number;
    yearly_fee_usd_min: number;
    yearly_fee_usd_max: number;
    description: string;
}

interface Plot {
    id: string;
    plot_number: string;
    size_sqm: number;
    yearly_fee_usd: number;
    status: string;
}

interface LocationsPageProps {
    locations: Location[];
}

export default function LocationsClient({ locations: initialLocations }: LocationsPageProps) {
    // Enrich locations with mock data for "Million Dollar" feel
    const locations = initialLocations.map(loc => ({
        ...loc,
        average_temp: loc.name.includes('Queretaro') ? '22°C' :
            loc.name.includes('Merida') ? '28°C' :
                loc.name.includes('Puebla') ? '20°C' :
                    loc.name.includes('Guadalajara') ? '24°C' : '23°C',
        direct_flights: loc.name.includes('Queretaro') ? ['IAH', 'DFW', 'ORD'] :
            loc.name.includes('Merida') ? ['MIA', 'IAH', 'YYZ'] :
                loc.name.includes('Guadalajara') ? ['LAX', 'PHX', 'JFK'] : ['MEX', 'IAH']
    }));
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
    const [plots, setPlots] = useState<Plot[]>([]);
    const [loading, setLoading] = useState(false);
    const [camera, setCamera] = useState<{ center: [number, number]; zoom: number } | null>(null);

    const handleLocationSelect = async (location: Location) => {
        setSelectedLocation(location);
        setCamera({
            center: [location.coordinates.lng, location.coordinates.lat],
            zoom: 15 // Slightly closer for drama
        });
        setLoading(true);

        const supabase = createClient();
        const { data, error } = await supabase
            .from('plots')
            .select('*')
            .eq('location_id', location.id)
            .eq('status', 'available')
            .order('plot_number');

        if (!error && data) {
            // Mock coordinates if missing (Deterministic based on ID)
            const plotsWithCoords = data.map((plot: any) => {
                if (plot.coordinates) return plot;
                const idStr = plot.id || plot.plot_number;
                const latOffset = ((idStr.charCodeAt(0) % 10) - 5) * 0.0005;
                const lngOffset = ((idStr.charCodeAt(1) % 10) - 5) * 0.0005;
                return {
                    ...plot,
                    coordinates: {
                        lat: location.coordinates.lat + latOffset,
                        lng: location.coordinates.lng + lngOffset
                    }
                };
            });
            setPlots(plotsWithCoords);
        }
        setLoading(false);
    };

    const handlePlotSelect = (plot: Plot & { coordinates?: { lat: number; lng: number } }) => {
        if (plot.coordinates) {
            setCamera({
                center: [plot.coordinates.lng, plot.coordinates.lat],
                zoom: 19
            });
        }
    };

    return (
        <div className="relative h-screen w-full overflow-hidden bg-background text-foreground">
            {/* Full Screen Map */}
            <div className="absolute inset-0 z-0">
                <MapView
                    locations={locations}
                    onLocationSelect={handleLocationSelect}
                    camera={camera}
                />
            </div>

            {/* Floating Glass Panel */}
            <div className="absolute top-0 left-0 h-full w-full md:w-[480px] z-10 pointer-events-none p-4 md:p-8 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    {!selectedLocation ? (
                        <motion.div
                            key="list"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl pointer-events-auto"
                        >
                            <div className="p-8 border-b border-white/10">
                                <h1 className="text-4xl font-light tracking-tight">Network</h1>
                                <p className="text-foreground/60 mt-2">Select a secured territory.</p>
                            </div>
                            <div className="max-h-[60vh] overflow-y-auto">
                                {locations.map(loc => (
                                    <button
                                        key={loc.id}
                                        onClick={() => handleLocationSelect(loc)}
                                        className="w-full text-left p-6 border-b border-white/5 hover:bg-white/5 transition-colors group"
                                    >
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xl font-light group-hover:text-accent transition-colors">{loc.name}</span>
                                            <span className="text-xs uppercase tracking-widest text-foreground/40">{loc.airport_code}</span>
                                        </div>
                                        <div className="flex gap-4 text-xs text-foreground/60">
                                            <span>{loc.airport_distance_km_min}km from airport</span>
                                            <span>Starts ${loc.yearly_fee_usd_min / 1000}k/yr</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="detail"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl pointer-events-auto"
                        >
                            <div className="relative h-48 bg-neutral-800">
                                {/* Placeholder for Location Hero - could be dynamic */}
                                <div className="absolute inset-0 flex items-center justify-center text-white/20">Location Image</div>
                                <button
                                    onClick={() => {
                                        setSelectedLocation(null);
                                        setCamera(null); // Optional: Reset camera
                                    }}
                                    className="absolute top-4 left-4 p-2 bg-black/50 rounded-full hover:bg-black/80 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                                </button>
                            </div>

                            <div className="p-8 space-y-6">
                                <div>
                                    <h2 className="text-3xl font-light">{selectedLocation.name}</h2>
                                    <p className="text-sm text-foreground/60 mt-2 leading-relaxed">{selectedLocation.description}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm bg-white/5 p-4 rounded-lg">
                                    <div>
                                        <div className="text-foreground/40 text-xs uppercase tracking-widest">Access</div>
                                        <div>{selectedLocation.airport_code} ({selectedLocation.airport_distance_km_min}km)</div>
                                    </div>
                                    <div>
                                        <div className="text-foreground/40 text-xs uppercase tracking-widest">Lease</div>
                                        <div>From ${(selectedLocation.yearly_fee_usd_min).toLocaleString()}/yr</div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-xs uppercase tracking-widest text-accent">Available Plots</h3>
                                    {loading ? (
                                        <div className="text-center py-8 text-foreground/40">Scanning sector...</div>
                                    ) : (
                                        <div className="space-y-2 max-h-[30vh] overflow-y-auto pr-2">
                                            {plots.length > 0 ? plots.map(plot => (
                                                <div
                                                    key={plot.id}
                                                    onClick={() => handlePlotSelect(plot as any)}
                                                    className="flex items-center justify-between p-3 border border-white/10 rounded-md hover:border-accent cursor-pointer transition-all group"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                                        <span className="font-medium">Plot {plot.plot_number}</span>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-sm">${plot.yearly_fee_usd.toLocaleString()}</div>
                                                        <div className="text-[10px] text-foreground/50">{plot.size_sqm} sqm</div>
                                                    </div>
                                                </div>
                                            )) : (
                                                <div className="text-foreground/40 italic">No plots available currently.</div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
