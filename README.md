# TuguiaTravel 🌿

Plataforma de turismo digital para el **Eje Cafetero / Risaralda**, Colombia.  
Proyecto académico SENA — Stack personalizado sin WordPress.

## 🗂️ Estructura del proyecto

```
tuguiatravel/
├── css/
│   └── styles.css          # Estilos globales + admin
├── img/                    # Imágenes del sitio
├── js/
│   └── main.js             # JS del frontend
├── tuguiatravel-backend/   # API REST Node.js + Express
│   ├── db/
│   │   └── connection.js   # Conexión a MySQL/MariaDB
│   ├── middleware/
│   │   └── auth.js         # Middleware JWT
│   ├── routes/
│   │   ├── auth.js         # POST /api/login
│   │   ├── hoteles.js      # CRUD hoteles
│   │   ├── restaurantes.js # CRUD restaurantes
│   │   └── agencias.js     # CRUD agencias
│   ├── .env                # Variables de entorno (no incluido)
│   ├── package.json
│   └── server.js           # Servidor principal
├── database/
│   └── tuguiatravel.sql    # Script completo de base de datos
├── index.html              # Página principal
├── experiencias.html
├── aves.html
├── contacto.html
├── login.html              # Panel admin - Login
└── dashboard.html          # Panel admin - CRUD proveedores
```

## 🚀 Instalación y uso

### 1. Base de datos
- Tener XAMPP corriendo con MySQL activo
- Importar `database/tuguiatravel.sql` desde phpMyAdmin o VS Code Database

### 2. Backend
```bash
cd tuguiatravel-backend
npm install
npm run dev
```
Crear archivo `.env` en `tuguiatravel-backend/`:
```
PORT=3000
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=tuguiatravel
JWT_SECRET=tuguiatravel_secret_2025
JWT_EXPIRES=8h
```

### 3. Frontend
Abrir en el navegador:
```
http://localhost:3000
```

### 4. Panel Admin
```
http://localhost:3000/login.html
```
- Email: `admin@tuguiatravel.com`
- Password: `Admin2025*`

## 🛠️ Tecnologías

| Capa | Tecnología |
|---|---|
| Frontend | HTML5, CSS3, Bootstrap 5, JavaScript |
| Backend | Node.js, Express.js |
| Base de datos | MySQL / MariaDB |
| Autenticación | JWT (jsonwebtoken) |
| Servidor local | XAMPP |

## 📍 Municipios cubiertos
Pereira · Santa Rosa de Cabal · Marsella · Balboa · Dosquebradas · La Virginia · Santuario · Apía
