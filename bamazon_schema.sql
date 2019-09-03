DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Keyboard", "Electronics", 70, 50), ("Mouse", "Electronics", 45, 65), ("Monitor", "Electronics", 150, 35),
("Mousepad", "Electronics", 10, 75), ("HDMI Cable", "Electronics", 12, 85), ("Mineral Water x 12", "Food", 8, 50),
("Deodorant", "Personal Care", 6, 80), ("Polo Shirt", "Clothing", 25, 60), ("Pint Glass", "Home Goods", 8, 50),
("Limited Edition Shoe", "Clothing", 999, 1);
