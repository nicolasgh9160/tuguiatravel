-- ============================================================
--  TuguiaTravel — Script completo de base de datos
--  Motor: MariaDB / MySQL (XAMPP)
--  Uso: Importar desde phpMyAdmin o ejecutar en VS Code > Database
-- ============================================================

CREATE DATABASE IF NOT EXISTS tuguiatravel
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE tuguiatravel;

-- ============================================================
-- 1. USUARIOS
-- ============================================================
CREATE TABLE IF NOT EXISTS usuarios (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  nombre        VARCHAR(80)  NOT NULL,
  email         VARCHAR(120) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  rol           ENUM('admin','editor') NOT NULL DEFAULT 'editor',
  activo        TINYINT(1)   NOT NULL DEFAULT 1,
  creado_en     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- password: Admin2025*
INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES
('Administrador', 'admin@tuguiatravel.com',
 '$2b$10$iSFB2IRODDS2IpmmYPI80.oO7O/57sqlox/1dCTryAAO0weO/UEty',
 'admin');

-- ============================================================
-- 2. HOTELES
-- ============================================================
CREATE TABLE IF NOT EXISTS hoteles (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  nombre      VARCHAR(120) NOT NULL,
  municipio   VARCHAR(80)  NOT NULL,
  direccion   VARCHAR(200),
  telefono    VARCHAR(20),
  email       VARCHAR(120),
  sitio_web   VARCHAR(200),
  descripcion TEXT,
  categoria   ENUM('1 estrella','2 estrellas','3 estrellas','4 estrellas','5 estrellas','sin categoria') DEFAULT 'sin categoria',
  activo      TINYINT(1)   NOT NULL DEFAULT 1,
  creado_en   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO hoteles (nombre, municipio, direccion, telefono, email, descripcion, categoria) VALUES
('Hotel Movich Pereira',     'Pereira',    'Cra 13 # 15-73',        '3206001122', 'reservas@movich.com',     'Hotel moderno en el centro de Pereira con vista a la ciudad.',          '4 estrellas'),
('Hacienda San José',        'Santa Rosa', 'Vía Santa Rosa km 3',   '3115002233', 'info@hsanjose.com',       'Hacienda cafetera tradicional con piscina natural y senderos.',         '3 estrellas'),
('Hotel Termales del Otoño', 'Santa Rosa', 'Sector Termales km 10', '3204003344', 'termales@otono.com',      'Resort termal rodeado de bosque de niebla en Santa Rosa de Cabal.',    '4 estrellas'),
('Hacienda Vista Hermosa',   'Balboa',     'Vereda La Linda',       '3113004455', 'info@vistahermosa.com',   'Finca cafetera con experiencias de campo y turismo rural comunitario.', '3 estrellas'),
('Posada Las Madrigueras',   'Marsella',   'Calle 5 # 3-20',        '3102005566', 'reservas@madrigueras.com','Posada boutique en el municipio Patrimonio de Marsella.',              '3 estrellas');

-- ============================================================
-- 3. RESTAURANTES
-- ============================================================
CREATE TABLE IF NOT EXISTS restaurantes (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  nombre      VARCHAR(120) NOT NULL,
  municipio   VARCHAR(80)  NOT NULL,
  direccion   VARCHAR(200),
  telefono    VARCHAR(20),
  email       VARCHAR(120),
  sitio_web   VARCHAR(200),
  descripcion TEXT,
  tipo_cocina VARCHAR(80),
  activo      TINYINT(1)   NOT NULL DEFAULT 1,
  creado_en   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO restaurantes (nombre, municipio, direccion, telefono, email, descripcion, tipo_cocina) VALUES
('La Fogata Risaraldense', 'Pereira',    'Cra 8 # 19-22',          '3201006677', 'info@lafogata.com',    'Cocina tradicional paisa con bandeja completa y sancocho de gallina.',  'Cocina paisa'),
('Café del Quindío',       'Pereira',    'Cll 17 # 9-41',          '3189007788', 'cafe@delquindio.com',  'Café de especialidad con granos del Eje Cafetero y postres artesanales.','Café y postres'),
('El Balcón del Eje',      'Marsella',   'Parque Principal',       '3175008899', 'balcon@eje.com',       'Restaurante con vista al parque patrimonio, gastronomía regional.',     'Cocina regional'),
('Truchería El Manantial', 'Santa Rosa', 'Vía Termales km 2',      '3162009900', 'trucha@manantial.com', 'Especialidad en trucha del río fresca, acompañada de patacones.',       'Mariscos y trucha'),
('Sabores de Balboa',      'Balboa',     'Calle Principal # 4-10', '3150001011', 'sabores@balboa.com',   'Cocina casera con productos frescos de la región del Cauca risaraldense.','Cocina casera');

-- ============================================================
-- 4. AGENCIAS
-- ============================================================
CREATE TABLE IF NOT EXISTS agencias (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  nombre       VARCHAR(120) NOT NULL,
  municipio    VARCHAR(80)  NOT NULL,
  direccion    VARCHAR(200),
  telefono     VARCHAR(20),
  email        VARCHAR(120),
  sitio_web    VARCHAR(200),
  descripcion  TEXT,
  especialidad VARCHAR(120),
  registro_rnt VARCHAR(40),
  activo       TINYINT(1)   NOT NULL DEFAULT 1,
  creado_en    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO agencias (nombre, municipio, direccion, telefono, email, descripcion, especialidad, registro_rnt) VALUES
('Eje Aventura Tours',     'Pereira',    'Cra 10 # 20-15', '3201011122', 'info@ejeaventura.com',  'Operador especializado en ecoturismo y aventura en el Eje Cafetero.',  'Ecoturismo y aventura', 'RNT-001234'),
('Risaralda Birdwatching', 'Pereira',    'Cll 23 # 11-08', '3188012233', 'aves@risaralda.com',    'Guías especializados en avistamiento de aves, más de 600 especies.',   'Avistamiento de aves',  'RNT-005678'),
('Café & Cultura Tours',   'Marsella',   'Parque Central', '3175013344', 'info@cafeycultura.com', 'Recorridos por haciendas cafeteras, proceso del café y cultura local.', 'Turismo cafetero',      'RNT-009012'),
('Termales Travel',        'Santa Rosa', 'Cra 5 # 8-30',   '3162014455', 'reservas@termales.com', 'Paquetes a los termales de Santa Rosa con transporte y hospedaje.',    'Turismo termal',        'RNT-003456'),
('Rutas del Cauca',        'Balboa',     'Cll 3 # 2-45',   '3149015566', 'rutas@cauca.com',       'Turismo rural y comunitario en los municipios del sur de Risaralda.', 'Turismo rural',         'RNT-007890');

-- ============================================================
-- Verificación
-- ============================================================
SELECT 'usuarios'     AS tabla, COUNT(*) AS registros FROM usuarios
UNION ALL
SELECT 'hoteles',      COUNT(*) FROM hoteles
UNION ALL
SELECT 'restaurantes', COUNT(*) FROM restaurantes
UNION ALL
SELECT 'agencias',     COUNT(*) FROM agencias;
