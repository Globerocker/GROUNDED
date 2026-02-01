-- Add coordinates to plots table
ALTER TABLE plots
ADD COLUMN IF NOT EXISTS coordinates JSONB;

-- Function to generate random offset coordinates based on location
DO $$
DECLARE
  loc RECORD;
  plot RECORD;
  lat_offset FLOAT;
  lng_offset FLOAT;
BEGIN
  FOR loc IN SELECT id, coordinates FROM locations LOOP
    FOR plot IN SELECT id, plot_number FROM plots WHERE location_id = loc.id LOOP
      -- Generate small offsets (approx 10-50m spacing)
      -- 0.0001 deg is approx 11 meters
      lat_offset := (random() * 0.002) - 0.001; 
      lng_offset := (random() * 0.002) - 0.001;
      
      UPDATE plots
      SET coordinates = jsonb_build_object(
        'lat', (loc.coordinates->>'lat')::float + lat_offset,
        'lng', (loc.coordinates->>'lng')::float + lng_offset
      )
      WHERE id = plot.id;
    END LOOP;
  END LOOP;
END $$;
