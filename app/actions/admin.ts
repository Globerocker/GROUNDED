'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateLeadStatus(id: string, newStatus: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('waitlist')
        .update({ status: newStatus })
        .eq('id', id);

    if (error) {
        console.error('Error updating lead status:', error);
        throw new Error('Failed to update lead status');
    }

    revalidatePath('/admin/inquiries');
}

export async function deleteModel(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('house_models')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting model:', error);
        throw new Error('Failed to delete model');
    }

    revalidatePath('/admin/cms');
}

export async function deleteLocation(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('locations')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting location:', error);
        throw new Error('Failed to delete location');
    }

    revalidatePath('/admin/cms');
}
