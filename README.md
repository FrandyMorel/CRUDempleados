
CRUD Empleados

Sistema de gestión de empleados desarrollado con React + ViteJS para el frontend y .NET + Entity Framework para el backend, utilizando una base de datos SQL para el almacenamiento de la información.

Tecnologías utilizadas
Frontend
React
Vite
Tailwind CSS
SweetAlert2
Backend
.NET
Entity Framework
Microsoft SQL Server
Características

El sistema permite realizar operaciones CRUD completas sobre empleados:

✅ Añadir empleados
✅ Editar empleados
✅ Eliminar empleados
✅ Visualizar listado de empleados

Cada empleado contiene la siguiente información:

Nombre
Apellido
Número telefónico
Sueldo

Además, el sistema utiliza alertas visuales con SweetAlert para confirmar acciones como eliminar o editar registros.

Estructura del proyecto
CRUD-Empleados/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── Controllers/
│   ├── Models/
│   ├── Data/
│   └── Program.cs
│
└── README.md
Instalación
Clonar el repositorio
git clone https://github.com/usuario/crud-empleados.git
Configuración del Frontend

Entrar a la carpeta del frontend:

cd frontend

Instalar dependencias:

npm install

Iniciar el servidor:

npm run dev
Configuración del Backend

Entrar a la carpeta del backend:

cd backend

Restaurar paquetes:

dotnet restore

Ejecutar migraciones:

dotnet ef database update

Iniciar el servidor:

dotnet run
Base de Datos

El proyecto utiliza SQL Server junto con Entity Framework para la gestión y persistencia de datos.

Ejemplo de entidad Empleado:

public class Empleado
{
    public int Id { get; set; }
    public string Nombre { get; set; }
    public string Apellido { get; set; }
    public string Numero { get; set; }
    public decimal Sueldo { get; set; }
}
Funcionalidades principales
Añadir empleado

Permite registrar un nuevo empleado con sus datos básicos.

Editar empleado

Actualiza la información de un empleado existente.

Eliminar empleado

Elimina empleados de la base de datos con confirmación mediante SweetAlert.

Listar empleados

Muestra todos los empleados registrados en una tabla dinámica.

Capturas del sistema

Aquí puedes agregar imágenes del proyecto:

![Vista principal](./screenshots/home.png)
![Formulario](./screenshots/form.png)
Autor

Desarrollado por FrandyMorel