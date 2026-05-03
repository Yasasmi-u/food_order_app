USE food_app;

INSERT IGNORE INTO category (id, name) VALUES
(1, 'Rice & Curry'),(2, 'Short Eats'),(3, 'Beverages'),(4, 'Desserts'),(5, 'Burgers');

INSERT IGNORE INTO food_item (id, name, price, status, category_id, image_url) VALUES
(1,'Chicken Rice & Curry',350.00,'AVAILABLE',1,'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400'),
(2,'Fish Ambul Thiyal',400.00,'AVAILABLE',1,'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400'),
(3,'Vegetable Rice',250.00,'AVAILABLE',1,'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400'),
(4,'Egg Roti',80.00,'AVAILABLE',2,'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400'),
(5,'Fish Cutlet',60.00,'AVAILABLE',2,'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400'),
(6,'Vegetable Roti',70.00,'OUT_OF_STOCK',2,'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400'),
(7,'Mango Juice',150.00,'AVAILABLE',3,'https://images.unsplash.com/photo-1546173159-315724a31696?w=400'),
(8,'Lime Soda',120.00,'AVAILABLE',3,'https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=400'),
(9,'Plain Tea',50.00,'AVAILABLE',3,'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400'),
(10,'Watalappan',180.00,'AVAILABLE',4,'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400'),
(11,'Curd & Treacle',160.00,'AVAILABLE',4,'https://images.unsplash.com/photo-1488477181228-5f16ffd71b86?w=400'),
(12,'Chicken Burger',450.00,'AVAILABLE',5,'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400'),
(13,'Beef Burger',500.00,'OUT_OF_STOCK',5,'https://images.unsplash.com/photo-1586816001966-79b736744398?w=400');

INSERT IGNORE INTO user (id, password, role, username) VALUES
(1,'1234','ADMIN','admin'),
(2,'1234','CUSTOMER','Sandun'),
(3,'1234','CUSTOMER','sachini');

INSERT IGNORE INTO cart (id, user_id) VALUES (1,2),(2,3);

UPDATE user_seq SET next_val = 100;
UPDATE orders_seq SET next_val = 100;
UPDATE payment_seq SET next_val = 100;
