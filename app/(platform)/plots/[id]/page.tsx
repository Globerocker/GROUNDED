import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

interface PlotPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function PlotPage({ params }: PlotPageProps) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: plot } = await supabase
        .from('plots')
        .select(`
      *,
      location:locations(*)
    `)
        .eq('id', id)
        .single();

    if (!plot || plot.status !== 'available') {
        notFound();
    }

    return (
        <main className="min-h-screen px-8 py-16">
            <div className="max-w-4xl mx-auto space-y-12">
                {/* Breadcrumb */}
                <div className="text-sm text-foreground/60">
                    <a href="/locations" className="hover:text-foreground">Locations</a>
                    <span className="mx-2">/</span>
                    <span>{plot.location.name}</span>
                    <span className="mx-2">/</span>
                    <span className="text-foreground">{plot.plot_number}</span>
                </div>

                {/* Plot Details */}
                <div className="space-y-4">
                    <h1>Plot {plot.plot_number}</h1>
                    <p className="text-xl text-foreground/80">
                        {plot.location.name}
                    </p>
                </div>

                {/* Infrastructure Facts */}
                <div className="grid grid-cols-2 gap-8 py-8 border-y border-border">
                    <div>
                        <div className="text-sm text-foreground/60 mb-1">Size</div>
                        <div className="text-2xl">{plot.size_sqm} sqm</div>
                    </div>
                    <div>
                        <div className="text-sm text-foreground/60 mb-1">Yearly usage fee</div>
                        <div className="text-2xl">${plot.yearly_fee_usd.toLocaleString()}</div>
                    </div>
                    <div>
                        <div className="text-sm text-foreground/60 mb-1">Airport</div>
                        <div className="text-lg">{plot.location.airport_code}</div>
                    </div>
                    <div>
                        <div className="text-sm text-foreground/60 mb-1">Distance</div>
                        <div className="text-lg">
                            {plot.location.airport_distance_km_min}–{plot.location.airport_distance_km_max} km
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl">Location description</h2>
                    <p className="text-foreground/80 leading-relaxed">
                        {plot.location.description}
                    </p>
                </div>

                {/* CTA */}
                <div className="pt-8">
                    <a
                        href={`/models?plot_id=${plot.id}`}
                        className="inline-block px-8 py-4 bg-accent text-foreground hover:bg-accent/90 transition-colors"
                    >
                        Select this plot
                    </a>
                </div>
            </div>
        </main>
    );
}
