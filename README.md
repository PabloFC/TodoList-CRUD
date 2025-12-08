# 📝 To-Do List Full Stack

Una aplicación completa de lista de tareas construida con React, Node.js, Express, Sequelize y PostgreSQL.

![To-Do List](https://img.shields.io/badge/status-live-success)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-22.x-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-blue)

## 🌐 Demo en Vivo

- **Frontend**: [https://todolist-frontend-eyf9.onrender.com](https://todolist-frontend-eyf9.onrender.com)
- **Backend API**: [https://todolist-crud.onrender.com](https://todolist-crud.onrender.com)

## ✨ Características

- ✅ Crear nuevas tareas
- ✅ Marcar tareas como completadas
- ✅ Eliminar tareas
- ✅ Persistencia de datos en PostgreSQL
- ✅ Interfaz moderna y responsive
- ✅ API RESTful completa
- ✅ Despliegue en producción

## 🛠️ Stack Tecnológico

### Frontend

- **React** 19.2.0 - Librería de UI
- **Vite** 7.2.6 - Build tool y dev server
- **Axios** - Cliente HTTP
- **TailwindCSS** - Estilos y diseño
- **ESLint** - Linting de código

### Backend

- **Node.js** 22.x - Runtime de JavaScript
- **Express** 4.18.2 - Framework web
- **Sequelize** 6.35.2 - ORM para PostgreSQL
- **PostgreSQL** - Base de datos (Supabase)
- **CORS** - Manejo de políticas de origen cruzado
- **dotenv** - Gestión de variables de entorno

### Deployment

- **Render.com** - Hosting para frontend y backend
- **Supabase** - Base de datos PostgreSQL gestionada

## 📁 Estructura del Proyecto

```
TodoList/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   │   ├── Header.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskList.jsx
│   │   │   └── TaskItem.jsx
│   │   ├── api/           # Servicios API
│   │   │   └── tareas.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/                # Backend Node.js
│   ├── config/
│   │   └── db.js         # Configuración de Sequelize
│   ├── controllers/
│   │   └── tareaController.js
│   ├── models/
│   │   └── Tarea.js      # Modelo de Tarea
│   ├── routes/
│   │   └── tareaRoutes.js
│   ├── index.js          # Punto de entrada
│   └── package.json
│
└── README.md
```

## 🚀 Instalación y Uso Local

### Prerrequisitos

- Node.js 18.x o superior
- PostgreSQL (local o usar Supabase)
- Git

### 1. Clonar el repositorio

```bash
git clone https://github.com/PabloFC/TodoList-CRUD.git
cd TodoList-CRUD
```

### 2. Configurar el Backend

```bash
cd server
npm install
```

Crear archivo `.env` en la carpeta `server`:

```env
DATABASE_URL=postgresql://usuario:password@host:5432/nombre_base_datos
PORT=3000
NODE_ENV=development
```

Iniciar el servidor:

```bash
npm run dev
```

El backend estará disponible en `http://localhost:3000`

### 3. Configurar el Frontend

```bash
cd ../client
npm install
```

Iniciar el cliente:

```bash
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

## 🔌 API Endpoints

### Base URL

```
https://todolist-crud.onrender.com/api
```

### Endpoints disponibles

| Método | Endpoint          | Descripción              |
| ------ | ----------------- | ------------------------ |
| GET    | `/api/tareas`     | Obtener todas las tareas |
| POST   | `/api/tareas`     | Crear una nueva tarea    |
| PUT    | `/api/tareas/:id` | Actualizar una tarea     |
| DELETE | `/api/tareas/:id` | Eliminar una tarea       |

### Ejemplos de uso

**Obtener todas las tareas:**

```bash
curl https://todolist-crud.onrender.com/api/tareas
```

**Crear una tarea:**

```bash
curl -X POST https://todolist-crud.onrender.com/api/tareas \
  -H "Content-Type: application/json" \
  -d '{"texto": "Comprar leche"}'
```

**Actualizar una tarea:**

```bash
curl -X PUT https://todolist-crud.onrender.com/api/tareas/1 \
  -H "Content-Type: application/json" \
  -d '{"completada": true}'
```

**Eliminar una tarea:**

```bash
curl -X DELETE https://todolist-crud.onrender.com/api/tareas/1
```

## 🌍 Despliegue

### Backend en Render

1. Crear un nuevo **Web Service**
2. Conectar el repositorio de GitHub
3. Configurar:
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && node index.js`
   - Variables de entorno: `DATABASE_URL`, `NODE_ENV`, `PORT`

### Frontend en Render

1. Crear un nuevo **Static Site**
2. Conectar el mismo repositorio
3. Configurar:
   - Build Command: `cd client && npm install && npm run build`
   - Publish Directory: `client/dist`

## 🔧 Variables de Entorno

### Backend (`server/.env`)

```env
DATABASE_URL=postgresql://...
PORT=3000
NODE_ENV=production
```

### Frontend

No requiere variables de entorno adicionales. La URL del backend está hardcodeada en `client/src/api/tareas.js`.

## 📝 Modelo de Datos

### Tarea (Task)

```javascript
{
  id: Integer (Primary Key, Auto-increment),
  texto: String (Not Null),
  completada: Boolean (Default: false),
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👤 Autor

**Pablo FC**

- GitHub: [@PabloFC](https://github.com/PabloFC)
- Proyecto: [TodoList-CRUD](https://github.com/PabloFC/TodoList-CRUD)

## 🙏 Agradecimientos

- React Team por la increíble librería
- Render.com por el hosting gratuito
- Supabase por la base de datos PostgreSQL

---

⭐️ Si te gustó este proyecto, no olvides darle una estrella en GitHub!
