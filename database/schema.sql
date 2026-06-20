CREATE DATABASE IF NOT EXISTS vve_meander1 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE vve_meander1;

CREATE TABLE IF NOT EXISTS roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  role_id INT NOT NULL,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NULL,
  apartment_number VARCHAR(50) NULL,
  created_at DATETIME NOT NULL,
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS news_posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  summary TEXT NULL,
  content TEXT NOT NULL,
  is_public TINYINT(1) NOT NULL DEFAULT 1,
  created_by INT NULL,
  published_at DATETIME NOT NULL,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS document_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL UNIQUE,
  created_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS documents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NULL,
  file_path VARCHAR(500) NOT NULL,
  category_id INT NULL,
  is_public TINYINT(1) NOT NULL DEFAULT 0,
  uploaded_by INT NULL,
  created_at DATETIME NOT NULL,
  FOREIGN KEY (category_id) REFERENCES document_categories(id),
  FOREIGN KEY (uploaded_by) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS maintenance_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  subject VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  type ENUM('onderhoud','vraag') NOT NULL,
  status VARCHAR(30) NOT NULL,
  created_at DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL,
  message TEXT NOT NULL,
  created_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  action VARCHAR(120) NOT NULL,
  entity_type VARCHAR(80) NOT NULL,
  entity_id INT NULL,
  details JSON NULL,
  created_at DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO roles (name) VALUES ('admin'), ('bestuur'), ('bewoner')
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO users (role_id, name, email, password_hash, phone, apartment_number, created_at)
SELECT r.id, 'Admin Meander1', 'admin@meander1.nl', '$2b$12$FvVGTbiRca.60ysrESg8deU0QmnwkFlPKaGyaOGQL9E8h24v.cC/K', '020-0000001', 'B-01', NOW()
FROM roles r WHERE r.name='admin'
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO users (role_id, name, email, password_hash, phone, apartment_number, created_at)
SELECT r.id, 'Bestuur Meander1', 'bestuur@meander1.nl', '$2b$12$cK62pCNWU5RUmotNtwaDHu05kNVpsUxt2mkzD1dogi3R27twKeKFW', '020-0000002', 'B-02', NOW()
FROM roles r WHERE r.name='bestuur'
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO users (role_id, name, email, password_hash, phone, apartment_number, created_at)
SELECT r.id, 'Bewoner Voorbeeld', 'bewoner@meander1.nl', '$2b$12$49kW3ZeH/7eStxKeCMGSReoMj96MIDSIQDHOtmKee7ys29wa83/Ku', '020-0000003', 'C-12', NOW()
FROM roles r WHERE r.name='bewoner'
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO document_categories (name, created_at)
VALUES ('ALV'), ('Notulen'), ('Huishoudelijk reglement'), ('Belangrijke mededelingen'), ('Downloads')
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO news_posts (title, summary, content, is_public, created_by, published_at)
SELECT
  'Welkom op de nieuwe VvE-site',
  'Een moderne omgeving voor bewoners en eigenaren.',
  'Met deze webapp delen we nieuws, documenten, onderhoudsupdates en informatie over parkeergarage en Parqy.',
  1,
  u.id,
  NOW()
FROM users u WHERE u.email = 'bestuur@meander1.nl'
LIMIT 1;

INSERT INTO news_posts (title, summary, content, is_public, created_by, published_at)
SELECT
  'ALV documenten beschikbaar',
  'De laatste ALV-stukken staan in de besloten omgeving.',
  'Log in om de agenda, stukken en notulen in te zien.',
  0,
  u.id,
  NOW()
FROM users u WHERE u.email = 'bestuur@meander1.nl'
LIMIT 1;

INSERT INTO documents (title, description, file_path, category_id, is_public, uploaded_by, created_at)
SELECT
  'Voorbeeld huishoudelijk reglement',
  'Placeholder-document op basis van openbare VvE-informatie.',
  '/path/to/private/voorbeeld-reglement.pdf',
  c.id,
  0,
  u.id,
  NOW()
FROM document_categories c, users u
WHERE c.name = 'Huishoudelijk reglement' AND u.email = 'bestuur@meander1.nl'
LIMIT 1;
