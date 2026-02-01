'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Location {
    id: string;
    name: string;
    longitude?: number;
    latitude?: number;
    coordinates: { lat: number; lng: number };
    description: string;
    airport_code: string;
    airport_distance_km_min: number;
    airport_distance_km_max: number;
    yearly_fee_usd_min: number;
    yearly_fee_usd_max: number;
    [key: string]: any;
}

interface MapViewProps {
    locations: Location[];
    onLocationSelect: (location: Location) => void;
    camera: { center: [number, number]; zoom: number } | null;
}

export default function MapView({ locations, onLocationSelect, camera }: MapViewProps) {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [mapLoaded, setMapLoaded] = useState(false);

    // Initial Map Setup
    useEffect(() => {
        if (!mapContainer.current || map.current) return;

        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/dark-v11',
            center: [-100.3899, 20.5888], // Querétaro center
            zoom: 5.5,
        });

        const nav = new mapboxgl.NavigationControl({ showCompass: false });
        map.current.addControl(nav, 'bottom-right');

        map.current.on('load', () => {
            setMapLoaded(true);

            // Add markers for each location
            locations.forEach((location) => {
                // Create a container for the marker to avoid overwriting Mapbox transforms
                const el = document.createElement('div');
                el.className = 'marker-container group';
                el.style.cursor = 'pointer';

                // Inner element for visual styling and animation
                const inner = document.createElement('div');
                inner.style.width = '24px';
                inner.style.height = '24px';
                inner.style.borderRadius = '50%';
                inner.style.backgroundColor = 'hsl(30 15% 45%)';
                inner.style.border = '2px solid hsl(40 10% 92%)';
                inner.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'; // Bouncy spring
                el.appendChild(inner);

                // Add pulse effect element
                const pulse = document.createElement('div');
                pulse.className = 'absolute inset-0 rounded-full bg-accent opacity-50 animate-ping pointer-events-none';
                inner.appendChild(pulse);

                // Create Popup
                const popup = new mapboxgl.Popup({
                    offset: 25,
                    closeButton: false,
                    closeOnClick: false,
                    className: 'glass-popup'
                }).setHTML(`
                    <div class="px-3 py-2 text-sm space-y-1 min-w-[180px]">
                        <h3 class="font-medium text-base text-foreground mb-1 border-b border-border/50 pb-1">${location.name}</h3>
                        <div class="grid grid-cols-2 gap-2 text-xs text-foreground/80">
                            <div>
                                <span class="block text-foreground/40 text-[10px] uppercase">Temp</span>
                                ${location.average_temp || '24°C'}
                            </div>
                            <div>
                                <span class="block text-foreground/40 text-[10px] uppercase">Airport</span>
                                ${location.airport_code} (${location.airport_distance_km_min}km)
                            </div>
                        </div>
                        <div class="pt-1">
                             <span class="block text-foreground/40 text-[10px] uppercase">Direct Flights</span>
                             <span className="text-accent">${(location.direct_flights || []).join(', ')}</span>
                        </div>
                    </div>
                `);

                el.addEventListener('click', () => {
                    onLocationSelect(location);
                });

                el.addEventListener('mouseenter', () => {
                    inner.style.transform = 'scale(1.5)';
                    inner.style.backgroundColor = 'var(--accent)'; // Highlight on hover
                    popup.setLngLat([location.coordinates.lng, location.coordinates.lat]).addTo(map.current!);
                });

                el.addEventListener('mouseleave', () => {
                    inner.style.transform = 'scale(1)';
                    inner.style.backgroundColor = 'hsl(30 15% 45%)';
                    popup.remove();
                });

                new mapboxgl.Marker(el)
                    .setLngLat([location.coordinates.lng, location.coordinates.lat])
                    .addTo(map.current!);
            });
        });

        return () => {
            map.current?.remove();
        };
    }, []); // Run only once

    // Effect to handle camera updates
    useEffect(() => {
        if (!map.current || !camera) return;

        map.current.flyTo({
            center: camera.center,
            zoom: camera.zoom,
            duration: 2000,
            essential: true
        });
    }, [camera]);

    return (
        <div
            ref={mapContainer}
            className="w-full h-full min-h-[600px] border border-border"
        />
    );
}
