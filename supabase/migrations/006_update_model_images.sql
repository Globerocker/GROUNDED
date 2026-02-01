-- Update House Models with correct images
UPDATE house_models 
SET images = ARRAY['/images/models/model_a_exterior_1769883040320.png', '/images/models/model_a_interior_1769883053783.png'] 
WHERE name = 'Model A – Studio';

UPDATE house_models 
SET images = ARRAY['/images/models/model_b_exterior_1769883069908.png', '/images/models/model_b_interior_1769883084425.png'] 
WHERE name = 'Model B – 1 Bedroom';

UPDATE house_models 
SET images = ARRAY['/images/models/model_c_exterior_1769883099326.png', '/images/models/model_c_interior_1769883111015.png'] 
WHERE name = 'Model C – 2 Bedroom';

UPDATE house_models 
SET images = ARRAY['/images/models/model_d_exterior_1769883126934.png', '/images/models/model_d_interior_1769883142529.png'] 
WHERE name = 'Model D – 3 Bedroom';
