INSERT INTO categorias (nombre) VALUES 
('Bebidas'), 
('Snacks'), 
('Limpieza');

INSERT INTO productos (nombre, categoria_id, precio, stock) VALUES 
('Coca Cola 2L', 1, 15.00, 20),
('Agua Mineral 600ml', 1, 5.00, 3),
('Jugo de Naranja', 1, 12.00, 10),
('Papas Fritas Layes', 2, 10.00, 4),
('Chocolate Soda', 2, 6.00, 2),
('Galletas Negrita', 2, 4.50, 15),
('Detergente OMO', 3, 25.00, 8),
('Lavandina', 3, 8.00, 3),
('Esponja de cocina', 3, 3.00, 50),
('Pepsi 2L', 1, 14.00, 12),
('Galletas Oreo', 2, 7.00, 1),
('Shampoo', 3, 35.00, 6);

INSERT INTO clientes (nombre, telefono, email) VALUES 
('Juan Perez', '70012345', 'juan@email.com'),
('Maria Gomez', '71123456', 'maria@email.com'),
('Carlos Ruiz', '72234567', 'carlos@email.com'),
('Ana Torres', '73345678', 'ana@email.com'),
('Luis Mamani', '74456789', 'luis@email.com'),
('Sofia Choque', '75567890', 'sofia@email.com');

INSERT INTO pedidos (cliente_id, fecha, estado) VALUES 
(1, '2026-10-01', 'Completado'),
(1, '2026-10-05', 'Pendiente'),
(2, '2026-10-02', 'Completado'),
(3, '2026-10-03', 'Cancelado'),
(4, '2026-10-04', 'Completado'),
(5, '2026-10-05', 'Completado'),
(6, '2026-10-06', 'Pendiente'),
(2, '2026-10-07', 'Completado'),
(3, '2026-10-08', 'Completado'),
(4, '2026-10-09', 'Completado');