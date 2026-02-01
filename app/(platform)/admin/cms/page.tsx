import { createClient } from '@/lib/supabase/server';
import { deleteModel, deleteLocation } from '@/app/actions/admin';
import DeleteButton from '@/components/admin/DeleteButton';
import { Plus } from 'lucide-react';

export default async function AdminCMS() {
    const supabase = await createClient();

    // Fetch data in parallel
    const [
        { data: models },
        { data: locations }
    ] = await Promise.all([
        supabase.from('house_models').select('*').order('name'),
        supabase.from('locations').select('*').order('name')
    ]);

    return (
        <div className="space-y-16 pb-20">
            <div>
                <h1 className="text-3xl font-light">Content Management</h1>
                <p className="text-neutral-400 mt-2">Manage your fleet of properties and infrastructure.</p>
            </div>

            {/* Models Section */}
            <div className="space-y-6">
                <div className="flex justify-between items-end border-b border-white/10 pb-4">
                    <div>
                        <h2 className="text-xl font-medium">House Models</h2>
                        <p className="text-sm text-neutral-500 mt-1">Available prefabricated units</p>
                    </div>
                    <button className="flex items-center gap-2 text-xs bg-white text-black hover:bg-neutral-200 font-medium px-4 py-2 rounded-full transition-colors">
                        <Plus size={14} />
                        Add Model
                    </button>
                </div>
                <div className="rounded-xl overflow-hidden border border-white/5 bg-white/[0.02]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-white/5 text-neutral-400 uppercase text-[10px] tracking-wider font-medium">
                                <tr>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Base Price</th>
                                    <th className="px-6 py-4">Size (m²)</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {models?.map((model) => (
                                    <tr key={model.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4 font-medium text-white">{model.name}</td>
                                        <td className="px-6 py-4 text-neutral-400">
                                            ${model.price_usd_min.toLocaleString()} - ${model.price_usd_max.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-neutral-400">
                                            {model.size_sqm_min} - {model.size_sqm_max}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-end items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="text-neutral-400 hover:text-white transition-colors">Edit</button>
                                                <DeleteButton
                                                    id={model.id}
                                                    onDelete={deleteModel}
                                                    resourceName={model.name}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {(!models || models.length === 0) && (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-neutral-500">
                                            No models found. Add one to get started.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Locations Section */}
            <div className="space-y-6">
                <div className="flex justify-between items-end border-b border-white/10 pb-4">
                    <div>
                        <h2 className="text-xl font-medium">Locations</h2>
                        <p className="text-sm text-neutral-500 mt-1">Active implementation sites</p>
                    </div>
                    <button className="flex items-center gap-2 text-xs bg-white text-black hover:bg-neutral-200 font-medium px-4 py-2 rounded-full transition-colors">
                        <Plus size={14} />
                        Add Location
                    </button>
                </div>
                <div className="rounded-xl overflow-hidden border border-white/5 bg-white/[0.02]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-white/5 text-neutral-400 uppercase text-[10px] tracking-wider font-medium">
                                <tr>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Code</th>
                                    <th className="px-6 py-4">Fee / Yr</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {locations?.map((loc) => (
                                    <tr key={loc.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4 font-medium text-white">{loc.name}</td>
                                        <td className="px-6 py-4 text-neutral-400 font-mono text-xs">{loc.airport_code}</td>
                                        <td className="px-6 py-4 text-neutral-400">
                                            ${loc.yearly_fee_usd_min.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-end items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="text-neutral-400 hover:text-white transition-colors">Edit</button>
                                                <DeleteButton
                                                    id={loc.id}
                                                    onDelete={deleteLocation}
                                                    resourceName={loc.name}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {(!locations || locations.length === 0) && (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-neutral-500">
                                            No locations found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
