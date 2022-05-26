--Creación de la base de datos
CREATE DATABASE Ophelia;

--Creación de tablas
CREATE TABLE Producto(
	id int IDENTITY(1,1) PRIMARY KEY,
	nombre varchar(255) NOT NULL,
	inventario int NOT NULL,
	valor int NOT NULL
);

CREATE TABLE Ventas_Productos_Año(
	id int IDENTITY(1,1) PRIMARY KEY,
	idProducto int FOREIGN KEY REFERENCES Producto(id),
	cantidad int NOT NULL,
	año varchar(5) NOT NULL
);

CREATE TABLE Cliente(
	id int IDENTITY(1,1) PRIMARY KEY,
	nombre varchar(255) NOT NULL,
	edad int NOT NULL
);

CREATE TABLE Factura(
	id int IDENTITY(1,1) PRIMARY KEY,
	idCliente int FOREIGN KEY REFERENCES Cliente(id),
	fecha datetime2 NOT NULL,
	valor int NOT NULL
);

CREATE TABLE Detalle_Factura(
	id int IDENTITY(1,1) PRIMARY KEY,
	idFactura int FOREIGN KEY REFERENCES Factura(id),
	idProducto int FOREIGN KEY REFERENCES Producto(id),
	cantidad int NOT NULL,
	valor int NOT NULL
);

--Inserción de datos de prueba
INSERT INTO Producto VALUES
	('iPhone 11', 10, 2800000),
	('Xiaomi 11', 15, 1800000),
	('Samsung Galaxy S20', 8, 2280000),
	('Xiaomi SmartBand 6', 20, 165000),
	('Huawei Band 6', 18, 205000),
	('Apple Watch SE', 10, 1450000),
	('Apple Airpods Pro', 15, 940000),
	('Apple Earpods Lighting', 25, 90000),
	('Apple Earpods 3.5mm', 40, 60000),
	('Diadema JLB Tune', 13, 90000),
	('Audifonos Samsung Galaxy', 30, 20000),
	('Xiaomi Airdots 3', 10, 160000),
	('Xbox One Series S 512GB', 8, 1530000),
	('Nintendo Switch 32GB', 10, 1400000);

INSERT INTO Ventas_Productos_Año VALUES
	(1, 4, 2000),
	(2, 7, 2000),
	(3, 3, 2000),
	(4, 20, 2000),
	(5, 7, 2000),
	(6, 7, 2000),
	(7, 4, 2000),
	(8, 15, 2000),
	(9, 26, 2000),
	(10, 17, 2000),
	(11, 34, 2000),
	(12, 10, 2000),
	(13, 8, 2000),
	(14, 2, 2000);

INSERT INTO Cliente VALUES
	('Hernando Quintero', 46),
	('Claudia Zamudio', 21),
	('Lizeth Carvajal', 36),
	('Victor Suarez', 25),
	('Sofía Ortega', 21),
	('Luis Puentes', 20),
	('Paula Rosales', 34),
	('Omar Torres', 36);

INSERT INTO Factura VALUES
	(5,'2000-02-14',5750000),
	(4,'2000-02-17',3600000),
	(1,'2000-02-22',1000000),
	(1,'2000-03-26',100000),
	(4,'2000-03-27',900000),
	(7,'2000-04-14',1540000),
	(2,'2000-04-23',500000),
	(3,'2000-05-23',8900000),
	(4,'2000-06-02',789000),
	(7,'2000-07-21',6400000),
	(3,'2000-08-01',1340000),
	(4,'2000-08-17',600000),
	(5,'2000-08-18',512000),
	(7,'2000-08-21',1450000),
	(6,'2000-08-30',7650000),
	(8,'2000-09-21',7800000),
	(7,'2000-10-02',230000),
	(6,'2000-10-17',20000),
	(5,'2000-11-12',20000),
	(8,'2000-12-09',160000);

INSERT INTO Detalle_Factura VALUES
	(1,10,5,450000),
	(1,3,1,2280000),
	(2,4,3,6000000),
	(2,6,1,1450000),
	(3,3,5,6000000),
	(3,3,1,2280000),
	(4,11,1,20000),
	(4,1,1,2800000),
	(5,9,2,120000),
	(5,10,3,270000),
	(5,3,1,2280000),
	(5,10,5,450000),
	(6,9,4,360000),
	(6,2,2,3600000),
	(6,11,2,40000),
	(7,11,5,100000),
	(7,8,2,180000),
	(7,8,1,90000),
	(8,12,1,160000),
	(8,14,5,5000000),
	(8,7,1,940000),
	(9,10,1,90000),
	(9,6,1,1450000),
	(9,3,2,4000000),
	(10,12,1,160000),
	(10,11,3,60000),
	(10,14,1,1400000),
	(11,2,1,1800000),
	(11,2,4,6000000),
	(12,4,1,165000),
	(13,11,1,20000),
	(14,1,5,6000000),
	(15,4,1,165000),
	(16,5,2,410000),
	(17,13,1,1530000),
	(18,5,3,615000),
	(19,5,1,205000),
	(20,13,2,3000000);

--Consultas

--Lista de precios de todos los productos
SELECT nombre, valor FROM Producto

-- Obtener la lista de productos cuya existencia en el inventario 
-- haya llegado al mínimo permitido (5 unidades)
SELECT * FROM Producto WHERE inventario <= 5

-- Obtener una lista de clientes no mayores de 35 años que hayan 
-- realizado compras entre el 1 de febrero de 2000 y el 25 de mayo de 2000
SELECT Cliente.nombre, Cliente.edad, Factura.fecha 
FROM Cliente
INNER JOIN Factura ON Cliente.id = Factura.idCliente
WHERE Factura.fecha BETWEEN '2000-02-01' AND '2000-05-25';

-- Obtener el valor total vendido por cada producto en el año 2000
SELECT Producto.nombre, Ventas_Productos_Año.cantidad, total_ventas_año = (Ventas_Productos_Año.cantidad * Producto.valor)
FROM Producto
INNER JOIN Ventas_Productos_Año ON Producto.id = Ventas_Productos_Año.idProducto
WHERE Ventas_Productos_Año.año = '2000';

-- Obtener la última fecha de compra de un cliente y según su frecuencia 
-- de compra estimar en qué fecha podría volver a comprar.
-- Cambiar el valor de la variable para filtrar un cliente diferente
DECLARE @idCliente int = 1;
SELECT Cliente.nombre,
		ultima_compra=(MAX(Factura.fecha)), 
		fecha_estimada_prox_compra=(DATEADD(day,((DATEDIFF(day,MIN(Factura.fecha),MAX(Factura.fecha)))/(SELECT COUNT(Factura.id) FROM Factura WHERE idCliente=@idCliente)),(MAX(Factura.fecha))))
FROM Cliente
INNER JOIN Factura ON Cliente.id=Factura.idCliente
WHERE Cliente.id = @idCliente
GROUP BY Cliente.nombre;