import { createClient } from '@/lib/supabase/server';
import ModelDetail from '@/components/grounded/ModelDetail';
import Modal from '@/components/ui/Modal';
import { notFound } from 'next/navigation';

export default async function ModelModalPage({ params }: { params: Promise<{ id: string }> }) {
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
        <Modal>
            <ModelDetail model={model} />
        </Modal>
    );
}
