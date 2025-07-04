# 📦 Pedidos API – Backend con NestJS + PostgreSQL

API RESTful completa para gestionar usuarios, productos, categorías y pedidos. Utiliza autenticación JWT y sigue buenas prácticas de desarrollo backend con NestJS.

---

## 🚀 Tecnologías utilizadas

- **NestJS** – Framework Node.js para aplicaciones escalables
- **TypeORM** – ORM para PostgreSQL
- **PostgreSQL** – Base de datos relacional
- **JWT** – Autenticación con tokens
- **bcrypt** – Hash de contraseñas
- **Docker** – (opcional) Para levantar la base de datos

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

---

## 📝 Licencia

Este proyecto se distribuye bajo licencia académica. Basado en [NestJS](https://nestjs.com).
