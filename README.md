# Like Me - Backend: II

Este repositorio contiene una API simple de Express.js que se conecta a una base de datos PostgreSQL. Proporciona endpoints para obtener, crear, eliminar y agregar likes a publicaciones.

## Prerrequisitos

Antes de ejecutar la aplicación, asegúrate de tener instalados los siguientes elementos:

- [Node.js](https://nodejs.org) (v12 o superior)
- [PostgreSQL](https://www.postgresql.org/) (v10 o superior)

## Empezando

Para comenzar, sigue los siguientes pasos:

1. Clona este repositorio en tu máquina local.
2. Navega hasta el directorio del proyecto.
3. Instala las dependencias ejecutando el siguiente comando:

```bash
npm install
```

4. Asegúrate de tener un servidor PostgreSQL en funcionamiento y actualiza los detalles de conexión en el archivo `index.js` si es necesario.

```javascript
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "likeme",
  password: "postgres",
  port: 5432,
  allowExitOnIdle: true,
});
```

5. Inicia el servidor de desarrollo ejecutando el siguiente comando:

```bash
npm start
```
o
```bash
npm run dev
```

El servidor se ejecutará en el puerto 3000. Puedes acceder a los endpoints de la API utilizando la siguiente URL base: `http://localhost:3000`.

## Endpoints

### Obtener publicaciones

```
GET /posts
```

Este endpoint devuelve todas las publicaciones existentes en la base de datos.

### Crear publicación

```
POST /posts
```

Este endpoint permite crear una nueva publicación. Debes enviar un objeto JSON en el cuerpo de la solicitud con los siguientes campos: `titulo`, `img` y `descripcion`. El campo `likes` se establecerá automáticamente en 0.

### Eliminar publicación

```
DELETE /posts/:id
```

Este endpoint permite eliminar una publicación específica. Debes proporcionar el ID de la publicación en la URL.

### Agregar like a una publicación

```
PUT /posts/like/:id
```

Este endpoint permite agregar un like a una publicación específica. Debes proporcionar el ID de la publicación en la URL.

## Manejo de errores

Si ocurre algún error en el servidor durante las solicitudes, se devolverá una respuesta con el código de estado 500 y un mensaje de error.

Espero que esta información sea útil. Si tienes alguna otra pregunta, no dudes en hacerla.
