### Champscent - Tienda en Línea de Perfumes

Champscent es una plataforma web desarrollada en Angular + Node.js que permite a los usuarios explorar un catálogo de perfumes, realizar compras en línea mediante PayPal y generar facturas en XML. 
También incluye un panel administrativo para gestión de inventario.

---

### Tecnologías utilizadas

- **Frontend:** Angular 19 (standalone components)
- **Backend:** Node.js + Express
- **Base de datos:** MongoDB + Mongoose
- **Pasarela de pago:** PayPal API
- **Factura:** Generación de archivos `.xml` dinámicos

---

### Estructura del Proyecto
Champscent/  
├── champscent/ # Frontend Angular  
├── champscent-api/ # Backend Node.js + Express  
├── README.md  
└── .gitignore  

---

### Instalación y uso local  
Este proyecto está dividido en dos carpetas principales:  
- `champscent`: Frontend hecho con Angular
- `champscent-api`: Backend hecho con Node.js, Express y MongoDB
### Requisitos Previos
- Node.js 18+ y npm  
- MongoDB  
- Angular CLI (`npm install -g @angular/cli`)
### Pasos para instalarlo
### 1. Clonar el repositorio
### 2. Backend (champscent-api)
cd champscent-api  
npm install  
node index.js  
### Asegúrate de tener un archivo .env con la siguiente variable:  
JWT_SECRET=tu_clave_secreta  
PAYPAL_CLIENT_ID=sb  
### 3. Frontend (champscent)
cd ../champscent  
npm install  
ng serve  
Abre http://localhost:4200 en el navegador.

---

### Funcionalidades principales
### Cliente
- Registro e inicio de sesión
- Recuperación de contraseña
- Navegación por catálogo
- Agregar al carrito
- Pago con PayPal
- Generación automática de factura .xml

### Administrador
- Gestión de productos (crear, editar, eliminar)
- Inventario en tiempo real
- Acceso solo para rol admin
  
---

Este proyecto es de uso educativo y personal. Para uso comercial, se recomienda agregar una licencia adecuada.
