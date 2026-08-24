# Marketplace — E-commerce Full Stack

Plataforma de comercio electrónico multi-vendedor desarrollada como Trabajo Práctico Obligatorio de la materia **Aplicaciones Interactivas** (UADE, 1° cuatrimestre 2025).

El sistema implementa el ciclo completo de una tienda online: catálogo por categorías, publicaciones de vendedores, carrito con control de stock y expiración, cupones de descuento, gestión de direcciones de envío, checkout y seguimiento de pedidos, con un panel de administración separado para el rol vendedor.

## Stack

| Capa | Tecnologías |
|---|---|
| **Backend** | Java 17, Spring Boot 3.1, Spring Security, Spring Data JPA (Hibernate), Maven |
| **Autenticación** | JWT (JJWT 0.12), filtro personalizado + control de acceso por rol |
| **Base de datos** | MySQL 8 |
| **Frontend** | React 19, Vite 6, Redux Toolkit, React Router 7, Axios, Tailwind CSS 4 |
| **Visualización** | Recharts (métricas del panel de administración) |

## Funcionalidades

**Tienda**
- Catálogo de productos con navegación por categorías y detalle de producto
- Registro e inicio de sesión con JWT, sesión persistida en Redux
- Carrito de compras con validación de stock disponible
- Aplicación de cupones de descuento
- Alta y selección de direcciones de envío
- Checkout con confirmación, y páginas de resultado exitoso y fallido
- Historial de pedidos y detalle de cada orden

**Panel de administración (rol `VENDOR`)**
- ABM de productos y publicaciones, con carga de imágenes
- ABM de categorías
- ABM de cupones de descuento
- Gestión de pedidos recibidos y cambio de estado
- Métricas de ventas visualizadas con Recharts

**Procesos automáticos**
- Job programado (`@Scheduled`, diario a medianoche) que expira los carritos vencidos y libera el stock reservado. También expuesto como endpoint manual en `/admin/cron/cart-expiration`.

## Arquitectura

```
┌──────────────────────────────────────────┐
│  Frontend — React + Vite (puerto 5173)   │
│  Redux Toolkit · React Router · Axios    │
└────────────────────┬─────────────────────┘
                     │ REST + Bearer JWT
┌────────────────────▼─────────────────────┐
│  Backend — Spring Boot (puerto 4002)     │
│  Controllers → Services → Repositories   │
│  Spring Security + JwtAuthenticationFilter│
└────────────────────┬─────────────────────┘
                     │ JPA / Hibernate
              ┌──────▼──────┐
              │   MySQL 8   │
              └─────────────┘
```

El backend sigue una separación por capas clásica: los controladores exponen la API REST, la lógica de negocio vive en interfaces de servicio con su implementación, y el acceso a datos se resuelve con repositorios de Spring Data. Las excepciones de dominio (stock insuficiente, categoría duplicada, recurso no encontrado) se centralizan en un `GlobalExceptionHandler` que las traduce a respuestas HTTP consistentes.

## Modelo de dominio

`User` · `Producto` · `Publicacion` · `Category` · `Carrito` / `CarritoDetalle` · `Order` / `DetalleOrder` · `Cupon` · `ShippingAddress`

Roles disponibles: `USER` (comprador) y `VENDOR` (vendedor con acceso al panel).

## Puesta en marcha

### Prerrequisitos

- JDK 17
- Node.js 18 o superior
- MySQL 8 en ejecución

### 1. Base de datos

```sql
CREATE DATABASE marketplace;
```

El esquema se genera automáticamente al levantar el backend (`spring.jpa.hibernate.ddl-auto=update`).

### 2. Backend

Configurar las credenciales en `backend/demo/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/marketplace
spring.datasource.username=TU_USUARIO
spring.datasource.password=TU_PASSWORD
```

Levantar el servidor:

```bash
cd backend/demo
./mvnw spring-boot:run      # Windows: mvnw.cmd spring-boot:run
```

Queda escuchando en `http://localhost:4002`.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Queda disponible en `http://localhost:5173`.

## API

Los recursos principales se exponen bajo:

| Recurso | Ruta base |
|---|---|
| Autenticación | `/auth` |
| Usuarios | `/users` |
| Productos | `/products` |
| Publicaciones | `/publicaciones` |
| Categorías | `/categories` |
| Carrito | `/cart` |
| Pedidos | `/orders` |
| Cupones | `/cupones` |
| Direcciones de envío | `/shipping-address` |
| Imágenes | `/images` |
| Administración | `/admin` |

Las rutas protegidas requieren el header `Authorization: Bearer <token>`, obtenido al autenticarse.

Con Actuator habilitado, el mapa completo de endpoints está en `http://localhost:4002/actuator/mappings`.

## Estructura del proyecto

```
├── backend/demo/
│   └── src/main/java/com/uade/tpo/demo/
│       ├── controllers/       # Endpoints REST
│       │   ├── auth/          # Registro, login, manejo de credenciales
│       │   └── config/        # Spring Security, JWT, CORS
│       ├── service/           # Lógica de negocio
│       ├── repository/        # Spring Data JPA
│       ├── entity/            # Entidades y DTOs
│       ├── enums/             # Role, estados
│       └── exceptions/        # Excepciones de dominio + handler global
└── frontend/src/
    ├── pages/
    │   ├── tienda/            # Catálogo, carrito, checkout, pedidos
    │   ├── admin/             # Panel de vendedor
    │   └── auth/              # Login y registro
    ├── redux/                 # Store, reducers y capa de API
    ├── services/              # Cliente HTTP y servicios de dominio
    ├── components/            # Componentes reutilizables
    ├── layouts/               # Layouts de tienda y admin
    ├── hooks/                 # Hooks personalizados
    └── routes/                # Ruteo y rutas protegidas
```

## Contexto

Trabajo Práctico Obligatorio — Aplicaciones Interactivas, Ingeniería en Informática, UADE (1C 2025). Grupo 8.

---

*Proyecto desarrollado en equipo. Mi contribución: `<completar>`.*
