insert into public.categories (name, slug) values
  ('Consoles', 'consoles'),
  ('Keyboards', 'keyboards'),
  ('Headsets', 'headsets'),
  ('Monitors', 'monitors');

insert into public.products (name, slug, description, price, brand, category_id, image_url, stock, is_new)
select
  'PlayStation 5 Slim',
  'ps5-slim',
  'Next-gen console with 1TB SSD',
  499.99,
  'Sony',
  id,
  'https://example.com/ps5-slim.jpg',
  10,
  true
from public.categories where slug = 'consoles';

insert into public.products (name, slug, description, price, brand, category_id, image_url, stock, is_new)
select
  'HyperX Alloy Origins',
  'hyperx-alloy-origins',
  'Mechanical gaming keyboard with RGB',
  89.99,
  'HyperX',
  id,
  'https://example.com/hyperx-alloy.jpg',
  25,
  false
from public.categories where slug = 'keyboards';