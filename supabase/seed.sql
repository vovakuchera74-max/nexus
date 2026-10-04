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

-- PlayStation 5 Slim
insert into public.product_specs (product_id, label, value, sort_order)
select p.id, v.label, v.value, v.sort_order
from public.products p
cross join (values
  ('Storage', '1TB SSD', 1),
  ('Resolution', 'Up to 4K', 2),
  ('Frame Rate', 'Up to 120fps', 3),
  ('Connectivity', 'Wi-Fi 6, Bluetooth 5.1', 4)
) as v(label, value, sort_order)
where p.slug = 'ps5-slim';

-- PlayStation 5 DualSense Wireless Controller
insert into public.product_specs (product_id, label, value, sort_order)
select p.id, v.label, v.value, v.sort_order
from public.products p
cross join (values
  ('Connection', 'Bluetooth / USB-C', 1),
  ('Battery Life', 'Up to 12 hours', 2),
  ('Weight', '280 g', 3),
  ('Compatibility', 'PS5, PC', 4)
) as v(label, value, sort_order)
where p.slug = 'ps5-dualsense-controller';

-- Razer DeathAdder V3 HyperSpeed Mouse
insert into public.product_specs (product_id, label, value, sort_order)
select p.id, v.label, v.value, v.sort_order
from public.products p
cross join (values
  ('Sensor', 'Focus Pro 30K', 1),
  ('DPI', '30 000', 2),
  ('Connection', 'Wireless 2.4GHz', 3),
  ('Weight', '63 g', 4),
  ('Battery Life', 'Up to 90 hours', 5)
) as v(label, value, sort_order)
where p.slug = 'razer-deathadder-v3';

-- HyperX Alloy Origins Mechanical Keyboard
insert into public.product_specs (product_id, label, value, sort_order)
select p.id, v.label, v.value, v.sort_order
from public.products p
cross join (values
  ('Switch Type', 'HyperX Aqua (Linear)', 1),
  ('Backlight', 'RGB, per-key', 2),
  ('Connection', 'Wired USB-C', 3),
  ('Layout', 'Full-size', 4)
) as v(label, value, sort_order)
where p.slug = 'hyperx-alloy-origins';

-- Logitech G Gaming Mouse Pad XXL
insert into public.product_specs (product_id, label, value, sort_order)
select p.id, v.label, v.value, v.sort_order
from public.products p
cross join (values
  ('Dimensions', '900 x 400 mm', 1),
  ('Material', 'Woven cloth surface', 2),
  ('Base', 'Non-slip rubber', 3)
) as v(label, value, sort_order)
where p.slug = 'logitech-g-mousepad-xxl';

-- SteelSeries Arctis Nova Pro Headset
insert into public.product_specs (product_id, label, value, sort_order)
select p.id, v.label, v.value, v.sort_order
from public.products p
cross join (values
  ('Driver Size', '40mm Neodymium', 1),
  ('Connection', 'Wireless 2.4GHz / Bluetooth', 2),
  ('Battery Life', 'Up to 44 hours (dual battery)', 3),
  ('Noise Cancelling', 'Active (ANC)', 4)
) as v(label, value, sort_order)
where p.slug = 'steelseries-arctis-nova-pro';

-- ASUS ROG Swift 27" 240Hz OLED Monitor
insert into public.product_specs (product_id, label, value, sort_order)
select p.id, v.label, v.value, v.sort_order
from public.products p
cross join (values
  ('Panel', 'OLED', 1),
  ('Refresh Rate', '240 Hz', 2),
  ('Resolution', '2560 x 1440', 3),
  ('Response Time', '0.03 ms', 4),
  ('Size', '27"', 5)
) as v(label, value, sort_order)
where p.slug = 'asus-rog-swift-27-oled';

-- ASUS ROG Zephyrus G14 Gaming Laptop
insert into public.product_specs (product_id, label, value, sort_order)
select p.id, v.label, v.value, v.sort_order
from public.products p
cross join (values
  ('CPU', 'AMD Ryzen 9', 1),
  ('GPU', 'NVIDIA RTX 4060', 2),
  ('RAM', '16 GB', 3),
  ('Storage', '1TB SSD', 4),
  ('Display', '14" QHD 165Hz', 5)
) as v(label, value, sort_order)
where p.slug = 'asus-rog-zephyrus-g14';