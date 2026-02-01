import { createClient } from '@/lib/supabase/server';
import LocationsClient from './LocationsClient';

export default async function LocationsPage() {
    const supabase = await createClient();

    const { data: locations } = await supabase
        .from('locations')
        .select('*')
        .eq('is_active', true)
        .order('name');

    return <LocationsClient locations={locations || []} />;
}
