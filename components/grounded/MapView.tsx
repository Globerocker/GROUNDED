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
                const el = document.createElement('div');
                el.className = 'marker';
                el.style.width = '24px';
                el.style.height = '24px';
                el.style.borderRadius = '50%';
                el.style.backgroundColor = 'hsl(30 15% 45%)';
                el.style.border = '2px solid hsl(40 10% 92%)';
                el.style.cursor = 'pointer';
                el.style.transition = 'transform 0.2s ease';

                // Add pulse effect element
                const pulse = document.createElement('div');
                pulse.className = 'absolute inset-0 rounded-full bg-accent opacity-50 animate-ping';
                el.appendChild(pulse);

                el.addEventListener('click', () => {
                    onLocationSelect(location);
                });

                el.addEventListener('mouseenter', () => {
                    el.style.transform = 'scale(1.2)';
                });

                el.addEventListener('mouseleave', () => {
                    el.style.transform = 'scale(1)';
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
