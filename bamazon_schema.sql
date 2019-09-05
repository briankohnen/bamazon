DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  product_sales INT DEFAULT 0,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Keyboard", "Electronics", 70, 50, 0), ("Mouse", "Electronics", 45, 65, 0), ("Monitor", "Electronics", 150, 35, 0),
("Mousepad", "Electronics", 10, 75, 0), ("HDMI Cable", "Electronics", 12, 85, 0), ("Mineral Water x 12", "Food", 8, 50, 0),
("Deodorant", "Personal Care", 6, 80, 0), ("Polo Shirt", "Clothing", 25, 60, 0), ("Pint Glass", "Home Goods", 8, 50, 0),
("Limited Edition Shoe", "Clothing", 999, 1, 0);


USE bamazon_db;

CREATE TABLE departments (
	id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(45) NOT NULL,
    over_head_costs INT NOT NULL,
    PRIMARY KEY(id)
);

USE bamazon_db;

INSERT INTO departments(department_name, over_head_costs)
VALUES ("Electronics", 1000), ("Food", 800), ("Personal Care", 500), ("Home Goods", 600), ("Clothing", 750);