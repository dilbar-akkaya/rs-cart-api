INSERT INTO carts (id, user_id, created_at, updated_at, status)
VALUES 
  ('49c14b5f-e1da-44e3-bca0-45d0758c6715', '81dba628-c9d5-44b5-9256-d03a83aab8ae', TO_DATE('15.06.2024', 'DD.MM.YYYY'), TO_DATE('16.06.2024', 'DD.MM.YYYY'), 'OPEN'),
  ('d50047ee-87a7-4499-8626-e04669929911', '4b666ca5-0535-47b7-b72f-ccc645d036b6', TO_DATE('15.06.2024', 'DD.MM.YYYY'), TO_DATE('16.06.2024', 'DD.MM.YYYY'), 'ORDERED');

INSERT INTO cart_items (cart_id, product_id, count)
VALUES 
  ('49c14b5f-e1da-44e3-bca0-45d0758c6715', 'fba648b8-c403-46cf-8873-3ae02bec66fe', 1),
  ('d50047ee-87a7-4499-8626-e04669929911', '8516f142-800e-4cc9-bfdc-89e93e53ae12', 2);

INSERT INTO products (id, title, description, price)
VALUES 
  ('fba648b8-c403-46cf-8873-3ae02bec66fe', 'Product 1', 'This is product 1', 99),
  ('8516f142-800e-4cc9-bfdc-89e93e53ae12', 'Product 2', 'This is product 2', 199);