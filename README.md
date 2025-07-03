# 📦 Pedidos API – Proyecto Backend con NestJS + PostgreSQL

API RESTful completa para gestión de usuarios, productos, categorías y pedidos. Implementa autenticación con JWT, buenas prácticas de estructura modular y pruebas con Postman.

---

## 🚀 Tecnologías utilizadas

- **NestJS** (framework principal)
- **TypeORM** (ORM para PostgreSQL)
- **PostgreSQL** (base de datos relacional)
- **JWT** (autenticación segura)
- **bcrypt** (hash de contraseñas)
- **Docker (opcional)** para levantar PostgreSQL

---

## ⚙️ Instalación del proyecto

1. Clonar el repositorio:

```bash
git clone https://github.com/TU_USUARIO/pedidos-api.git
cd pedidos-api
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear archivo de entorno `.env` desde el ejemplo:

```bash
cp .env.example .env
```

4. Iniciar base de datos (si usas Docker):

```bash
docker compose up -d
```

5. Iniciar NestJS en modo desarrollo:

```bash
npm run start:dev
```

---

## 📂 Variables de entorno

Archivo `.env.example` incluido. Debes configurar:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=pedidos_db
```

---

## 📚 Endpoints disponibles

Organizados por recurso. Todos los protegidos requieren header:

```
Authorization: Bearer <token>
```

### 🔐 Auth
| Método | Ruta             | Descripción             |
|--------|------------------|-------------------------|
| POST   | /auth/register   | Registro de usuario     |
| POST   | /auth/login      | Login y retorno de token|

### 👤 Usuarios
| Método | Ruta            | Descripción               |
|--------|------------------|---------------------------|
| GET    | /usuarios        | Listar todos los usuarios |
| GET    | /usuarios/:id    | Obtener un usuario por ID |
| POST   | /usuarios        | Crear usuario manualmente |

### 🗂 Categorías
| Método | Ruta              | Descripción                 |
|--------|-------------------|-----------------------------|
| GET    | /categorias       | Listar todas                |
| GET    | /categorias/:id   | Obtener una categoría       |
| POST   | /categorias       | Crear categoría             |
| PATCH  | /categorias/:id   | Actualizar categoría        |
| DELETE | /categorias/:id   | Eliminar categoría          |

### 📦 Productos
| Método | Ruta              | Descripción              |
|--------|-------------------|--------------------------|
| GET    | /productos        | Listar productos         |
| GET    | /productos/:id    | Obtener un producto      |
| POST   | /productos        | Crear producto           |
| PATCH  | /productos/:id    | Actualizar producto      |
| DELETE | /productos/:id    | Eliminar producto        |

### 🧾 Pedidos
| Método | Ruta                   | Descripción                          |
|--------|------------------------|--------------------------------------|
| GET    | /pedidos               | Listar todos los pedidos             |
| GET    | /pedidos/:id           | Ver pedido específico                |
| GET    | /pedidos/mis-pedidos   | Ver mis pedidos                      |
| POST   | /pedidos               | Crear pedido como usuario autenticado|

---

## 🧪 Pruebas con Postman

Importa el archivo incluido:  
📁 `pedidos-api-coleccion-completa.postman_collection.json`

Variables:
- `{{base_url}} = http://localhost:3000`
- `{{token}} = JWT obtenido en login`

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