CREATE DATABASE rinl_auction_system;
USE rinl_auction_system;
CREATE TABLE admins (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100)
);
CREATE TABLE companies (
    company_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    address TEXT
);
CREATE TABLE inventory (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT,
    created_by_admin_id INT,
    FOREIGN KEY (created_by_admin_id) REFERENCES admins(admin_id)
);
CREATE TABLE auctions (
    auction_id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT NOT NULL,
    auction_type ENUM('highest', 'lowest') NOT NULL,
    base_price DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL,
    start_time DATETIME,
    end_time DATETIME,
    FOREIGN KEY (item_id) REFERENCES inventory(item_id)
);
CREATE TABLE bids (
    bid_id INT AUTO_INCREMENT PRIMARY KEY,
    auction_id INT NOT NULL,
    company_id INT NOT NULL,
    bid_amount DECIMAL(10,2) NOT NULL,
    bid_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (auction_id) REFERENCES auctions(auction_id),
    FOREIGN KEY (company_id) REFERENCES companies(company_id)
);
CREATE TABLE images (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT NOT NULL,
    url TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (item_id) REFERENCES inventory(item_id)
);

ALTER TABLE auctions
ADD COLUMN winner_company_id INT,
ADD COLUMN is_closed BOOLEAN DEFAULT FALSE;
ALTER TABLE inventory
ADD COLUMN quantity INT NOT NULL DEFAULT 0;

select * from companies;
INSERT INTO admins (username, password, email)
VALUES ('rinladmin', 'admin123', 'admin@rinl.com');

------------------------------------- adding data to inventory-------------------

USE rinl_auction_system;

-- Insert Sample Inventory Items
INSERT INTO inventory (item_name, description, image_url, quantity, created_by_admin_id)
VALUES 
('Mild Steel Plates', 'High-strength MS plates suitable for structural work.', 'https://plus.unsplash.com/premium_photo-1661963247622-be10e1ea2c25?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 100, 1),
('Rebar Steel Rods', 'Thermo-mechanically treated rebars used for reinforced concrete.', 'https://images.unsplash.com/photo-1623428454598-1bfe414bac03?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 250, 1),
('Hot Rolled Coils', 'Premium quality hot rolled steel coils.', 'https://plus.unsplash.com/premium_photo-1682144786282-62202bd9f5bd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 150, 1),
('Structural Beams', 'Wide-flange beams used in bridges and buildings.', 'https://images.unsplash.com/photo-1709244596178-4c2656d02d1e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 80, 1),
('Steel Pipes', 'Galvanized steel pipes suitable for water and gas supply.', 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 200, 1);


select * from inventory;
select * from auctions;
select * from bids;
-- ALTER TABLE auctions 
-- MODIFY COLUMN auction_type VARCHAR(20) NOT NULL;

UPDATE auctions SET end_time = '2024-06-30 01:00:00', is_closed = 0 WHERE auction_id = 7;
UPDATE auctions SET start_time = NOW() WHERE start_time IS NULL;
SET SQL_SAFE_UPDATES = 0;

