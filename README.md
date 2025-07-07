# 📦 Pedidos API – Backend con NestJS + PostgreSQL

API RESTful completa para gestionar usuarios, productos, categorías y pedidos. Utiliza autenticación JWT y sigue buenas prácticas de desarrollo backend con NestJS, implementando una arquitectura modular escalable.

---

## 🏗️ Arquitectura del Proyecto

Este proyecto sigue una **arquitectura modular** basada en los principios de NestJS:

- **Patrón Módulo-Controlador-Servicio**: Separación clara de responsabilidades
- **Inyección de Dependencias**: Gestión automática de dependencias con decoradores
- **Guards y Middleware**: Sistema de autenticación y autorización con JWT
- **DTOs y Validación**: Validación de datos con class-validator
- **TypeORM**: ORM con decoradores y relaciones automáticas
- **Transformers**: Serialización de datos con class-transformer

### Estructura Modular

```
src/
├── auth/                    # Módulo de autenticación
│   ├── auth.controller.ts   # Endpoints de login/register
│   ├── auth.service.ts      # Lógica de autenticación
│   ├── auth.module.ts       # Configuración del módulo
│   ├── dto/                 # DTOs de autenticación
│   └── strategies/          # Estrategias de Passport
├── modules/
│   ├── usuario/             # Gestión de usuarios
│   ├── categoria/           # Gestión de categorías
│   ├── producto/            # Gestión de productos
│   └── pedido/              # Gestión de pedidos
├── main.ts                  # Punto de entrada
└── app.module.ts           # Módulo principal
```

---

## 🗃️ Modelo Entidad-Relación (ERD)

```
┌─────────────────┐       ┌─────────────────┐
│     Usuario     │       │    Categoria    │
├─────────────────┤       ├─────────────────┤
│ id (PK)         │       │ id (PK)         │
│ nombre          │       │ nombre          │
│ email (unique)  │       │ descripcion     │
│ password        │       └─────────────────┘
│ creadoEn        │                │
└─────────────────┘                │
         │                         │
         │ 1:N                     │ 1:N
         │                         │
         ▼                         ▼
┌─────────────────┐       ┌─────────────────┐
│     Pedido      │       │    Producto     │
├─────────────────┤       ├─────────────────┤
│ id (PK)         │       │ id (PK)         │
│ fecha           │       │ nombre          │
│ total           │       │ precio          │
│ usuario_id (FK) │       │ categoria_id(FK)│
└─────────────────┘       └─────────────────┘
         │                         │
         │ 1:N                     │ N:1
         │                         │
         ▼                         ▼
┌─────────────────┐       ┌─────────────────┐
│  DetallePedido  │───────│    Producto     │
├─────────────────┤   N:1 │   (referencia)  │
│ id (PK)         │       └─────────────────┘
│ cantidad        │
│ precio_unitario │
│ pedido_id (FK)  │
│ producto_id(FK) │
└─────────────────┘
```

### Relaciones:

- **Usuario → Pedido**: Un usuario puede tener múltiples pedidos (1:N)
- **Categoria → Producto**: Una categoría puede tener múltiples productos (1:N)
- **Pedido → DetallePedido**: Un pedido puede tener múltiples detalles (1:N)
- **Producto → DetallePedido**: Un producto puede estar en múltiples detalles (1:N)

---

## 🚀 Tecnologías y Versiones

### Core Framework
- **NestJS**: `^11.0.1` – Framework Node.js para aplicaciones escalables
- **TypeScript**: `^5.7.3` – Superset de JavaScript con tipado estático
- **Node.js**: Compatible con versiones LTS

### Base de Datos
- **PostgreSQL**: `^8.16.3` (driver pg)
- **TypeORM**: `^0.3.24` – ORM con decoradores y migraciones
- **MySQL**: `^3.14.1` (soporte adicional)
- **SQL Server**: `^11.0.1` (soporte adicional)

### Autenticación y Seguridad
- **JWT**: `^11.0.0` – Tokens de autenticación
- **Passport**: `^0.7.0` – Middleware de autenticación
- **bcrypt**: `^6.0.0` – Hash de contraseñas

### Validación y Transformación
- **class-validator**: `^0.14.2` – Validación de DTOs
- **class-transformer**: `^0.5.1` – Transformación de objetos

### Herramientas de Desarrollo
- **ESLint**: `^9.18.0` – Linter de código
- **Prettier**: `^3.4.2` – Formateador de código
- **Jest**: `^29.7.0` – Framework de testing
- **SWC**: `^1.10.7` – Compilador rápido

### Configuración
- **@nestjs/config**: `^4.0.2` – Gestión de variables de entorno
- **reflect-metadata**: `^0.2.2` – Soporte para decoradores
- **rxjs**: `^7.8.1` – Programación reactiva

---

## ⚙️ Instalación del proyecto

1. Clona el repositorio:

```bash
git clone https://github.com/TU_USUARIO/pedidos-api.git
cd pedidos-api
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea el archivo `.env` desde el ejemplo:

```bash
cp .env.example .env
```

4. (Opcional) Levanta PostgreSQL en Docker:

```bash
docker compose up -d
```

5. Inicia el servidor NestJS en modo desarrollo:

```bash
npm run start:dev
```

---

## 🐳 Levantar PostgreSQL con Docker

Puedes levantar fácilmente la base de datos PostgreSQL con una de estas opciones:

### ✅ Opción 1: Docker CLI

```bash
docker run --name postgres-nest \
  -e POSTGRES_DB=pedidos_db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -d postgres
```

Este contenedor expone:

- `DB_NAME`: `pedidos_db`
- `USER`: `postgres`
- `PASSWORD`: `postgres`
- Puerto local: `5432`

---

### ✅ Opción 2: Docker Compose

Crea un archivo `docker-compose.yml` con el siguiente contenido:

```yaml
version: '3.8'
services:
  postgres:
    image: postgres
    container_name: postgres-nest
    restart: always
    environment:
      POSTGRES_DB: pedidos_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
```

Luego ejecuta:

```bash
docker-compose up -d
```

---

## 📂 Variables de entorno

Archivo `.env.example` incluido, en base a este configura tu archivo `.env` con los siguientes valores:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=pedidos_db
JWT_SECRET=changeme
```

---

## 📚 Endpoints disponibles

> Todos los endpoints protegidos requieren el siguiente header:

```
Authorization: Bearer <token>
```

### 🔐 Autenticación

| Método | Ruta            | Descripción             |
|--------|------------------|-------------------------|
| POST   | /auth/register   | Registrar nuevo usuario |
| POST   | /auth/login      | Iniciar sesión (JWT)    |

### 👤 Usuarios

| Método | Ruta            | Descripción               |
|--------|------------------|---------------------------|
| GET    | /usuarios        | Listar todos los usuarios |
| GET    | /usuarios/:id    | Obtener usuario por ID    |
| POST   | /usuarios        | Crear usuario manualmente |

### 🗂 Categorías

| Método | Ruta              | Descripción               |
|--------|-------------------|---------------------------|
| GET    | /categorias       | Listar categorías         |
| GET    | /categorias/:id   | Obtener categoría         |
| POST   | /categorias       | Crear categoría           |
| PATCH  | /categorias/:id   | Actualizar categoría      |
| DELETE | /categorias/:id   | Eliminar categoría        |

### 📦 Productos

| Método | Ruta              | Descripción               |
|--------|-------------------|---------------------------|
| GET    | /productos        | Listar productos          |
| GET    | /productos/:id    | Obtener producto          |
| POST   | /productos        | Crear producto            |
| PATCH  | /productos/:id    | Actualizar producto       |
| DELETE | /productos/:id    | Eliminar producto         |

### 🧾 Pedidos

| Método | Ruta                   | Descripción                     |
|--------|------------------------|---------------------------------|
| GET    | /pedidos               | Listar todos los pedidos        |
| GET    | /pedidos/:id           | Ver pedido específico           |
| GET    | /pedidos/mis-pedidos   | Ver pedidos del usuario logueado|
| POST   | /pedidos               | Crear un nuevo pedido           |

---

## 🧪 Pruebas con Postman

1. Importa el archivo incluido:  
   📁 `Pedidos-Api.postman_collection.json`

2. Define estas variables en tu entorno de Postman:

| Variable     | Valor                   |
|--------------|-------------------------|
| `base_url`   | `http://localhost:3000` |
| `token`      | Token JWT de sesión     |

---

## 📁 Estructura del proyecto

```
src/
├── auth/
├── modules/
│   ├── categoria/
│   ├── producto/
│   ├── usuario/
│   └── pedido/
├── main.ts
├── app.module.ts
.env.example
```

---

## ✍ Autor

Desarrollado por **Alejo** como entrega académica del backend de pedidos usando NestJS.
