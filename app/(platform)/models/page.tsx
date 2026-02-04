import { createClient } from '@/lib/supabase/server';
import ModelsList from '@/components/grounded/ModelsList';

interface ModelsPageProps {
    searchParams: Promise<{
        plot_id?: string;
    }>;
}

export default async function ModelsPage({ searchParams }: ModelsPageProps) {
    const { plot_id } = await searchParams;
    const supabase = await createClient();

    const { data: models } = await supabase
        .from('house_models')
        .select('*')
        .order('bedrooms');

    return (
        <main className="min-h-screen pt-32 pb-16 px-6 md:px-12 bg-background text-foreground">
            <div className="max-w-[1600px] mx-auto">
                <div className="mb-24 space-y-6">
                    <h1 className="text-8xl md:text-[10rem] font-light leading-[0.8] tracking-tighter opacity-90">
                        Collection
                    </h1>
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-border/30 pb-8">
                        <p className="text-lg md:text-xl text-foreground/60 max-w-xl leading-relaxed">
                            Permanent infrastructure designed for resilience.
                            Select a unit to view technical specifications and investment potential.
                        </p>
                        <div className="text-xs uppercase tracking-widest text-accent">
                            {models?.length || 0} Units Available
                        </div>
                    </div>
                </div>

                {models && <ModelsList models={models} plotId={plot_id} />}
            </div>
        </main>
    );
}
