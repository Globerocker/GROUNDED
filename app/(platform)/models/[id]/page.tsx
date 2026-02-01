import { createClient } from '@/lib/supabase/server';
import ModelDetail from '@/components/grounded/ModelDetail';
import { notFound } from 'next/navigation';

export default async function ModelPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: model } = await supabase
        .from('house_models')
        .select('*')
        .eq('id', id)
        .single();

    if (!model) {
        notFound();
    }

    return (
        <main className="min-h-screen pt-24 px-8 max-w-7xl mx-auto">
            <ModelDetail model={model} />
        </main>
    );
}
