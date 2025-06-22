[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/NImNxoFn)
# UnaHur - Red Anti-Social

Se solicita el modelado y desarrollo de un sistema backend para una red social llamada **“UnaHur Anti-Social Net”**, inspirada en plataformas populares que permiten a los usuarios realizar publicaciones y recibir comentarios sobre las mismas.

![Imagen](./assets/ANTI-SOCIALNET.jpeg)

# Contexto del Proyecto

En una primera reunión con los sponsors del proyecto, se definieron los siguientes requerimientos para el desarrollo de un **MVP (Producto Mínimo Viable)**:

- El sistema debe permitir que un usuario registrado realice una publicación (post), incluyendo **obligatoriamente una descripción**. De forma opcional, se podrán asociar **una o más imágenes** a dicha publicación.

- Las publicaciones pueden recibir **comentarios** por parte de otros usuarios.

- Las publicaciones pueden estar asociadas a **etiquetas (tags)**. Una misma etiqueta puede estar vinculada a múltiples publicaciones.

- Es importante que los **comentarios más antiguos que X meses** (valor configurable mediante variables de entorno, por ejemplo, 6 meses) **no se muestren** en la visualización de los posteos.

####

# Entidades y Reglas de Negocio

Los sponsors definieron los siguientes nombres y descripciones para las entidades:

- **User**: Representa a los usuarios registrados en el sistema. El campo `nickName` debe ser **único** y funcionará como identificador principal del usuario.

- **Post**: Publicación realizada por un usuario en una fecha determinada que contiene el texto que desea publicar. Puede tener **cero o más imágenes** asociadas. Debe contemplarse la posibilidad de **agregar o eliminar imágenes** posteriormente.

- **Post_Images**: Entidad que registra las imágenes asociadas a los posts. Para el MVP, solo se requiere almacenar la **URL de la imagen alojada**.

- **Comment**: Comentario que un usuario puede realizar sobre una publicación. Incluye la fecha en la que fue realizado y una indicación de si está **visible o no**, dependiendo de la configuración (X meses).

- **Tag**: Etiqueta que puede ser asignada a un post. Una etiqueta puede estar asociada a **muchos posts**, y un post puede tener **múltiples etiquetas**.

# Requerimientos Técnicos

1. **Modelado de Datos**

   - Diseñar el modelo documental que represtente todas las entidades definidas por los sponsor del proyecto. Queda a su criterio si usan relaciones embebidas o relaciones referenciadas a otros documentos.

### Ejemplo referenciadas

![referenciadas](./assets/Referenciada.png)

2. **Desarrollo del Backend**

   - Crear los **endpoints CRUD** necesarios para cada entidad.

   - Implementar las rutas necesarias para gestionar las relaciones entre entidades (por ejemplo: asociar imágenes a un post, etiquetas a una publicación, etc.).

   - Desarrollar las validaciones necesarias para asegurar la integridad de los datos (schemas, validaciones de integridad referencial).

   - Desarrollar las funciones controladoras con una única responsabiliad evitando realizar comprobaciones innecesarias en esta parte del código.

3. **Configuración y Portabilidad**

   - El sistema debe poder cambiar de **base de datos** de forma transparente, utilizando configuración e instalación de dependencias adecuadas.

   - El sistema debe permitir configurar el **puerto de ejecución y variables de entorno** fácilmente.

4. **Documentación**

   - Generar la documentación de la API utilizando **Swagger (formato YAML)**, incluyendo todos los endpoints definidos.

5. **Colecciones de Prueba**

   - Entregar las colecciones necesarias para realizar pruebas (por ejemplo, colecciones de Postman o archivos JSON de ejemplo).

###
# Explicacion

### Config
Función: Gestiona la configuración y conexión a la base de datos MongoDB.
Centraliza la conexión para evitar redundancia y facilita el cambio de la base de datos si fuera necesario.

db.js: Configura Mongoose para conectarse a MongoDB usando variables de entorno, maneja errores de conexión y confirma cuando la conexión es exitosa.

### Controllers
Función: Contiene la lógica principal para procesar las operaciones del backend. Cada controlador maneja una entidad específica y sus operaciones CRUD.
Centraliza la lógica de negocio, manteniendo el código modular y fácil de mantener.

authController.js: Gestiona el login y registro de usuarios, generando y validando tokens JWT para autenticación segura.
crudController.js: Función genérica para crear controladores CRUD reutilizables, reduce la duplicación de código.
commentController.js, postController.js, tagController.js, userController.js: Controladores específicos para manejar comentarios, posts, etiquetas y usuarios respectivamente, utilizando el controlador genérico para las operaciones CRUD.

### Middleware
Función: Contiene funciones que se ejecutan entre la solicitud y la respuesta, para validar datos y controlar la autenticación.
Garantiza la integridad de los datos y la seguridad del sistema al verificar tokens y validar la entrada antes de que lleguen a los controladores.

authentication.js: Middleware que verifica la validez del token JWT en las solicitudes protegidas y añade la información del usuario autenticado a la petición.
validarComment.js, validarPost.js, validarTag.js: Middlewares que validan los datos entrantes para comentarios, publicaciones y etiquetas respectivamente, usando reglas estrictas para evitar errores y datos inconsistentes.

### Models
Función: Define la estructura y relaciones de los datos mediante esquemas de Mongoose para cada entidad del sistema.
Modela cómo se almacenan los datos en MongoDB, estableciendo reglas de validación y referencias para mantener la integridad referencial.

comment.js: Modelo para comentarios, incluyendo referencia al usuario y al post, estado de visibilidad y fecha de creación.
post.js: Modelo para publicaciones, con referencia al usuario, texto, imágenes, etiquetas y fecha.
tag.js: Modelo para etiquetas, asegurando nombres únicos para facilitar la categorización.
user.js: Modelo para usuarios con campos como nickname único, email, contraseña y fecha de creación.

### Routes
Función: Define los endpoints HTTP que expone la API, asociando rutas con controladores para cada entidad.
Organiza las rutas de forma modular, facilitando el mantenimiento y la escalabilidad del backend.

routesAuth.js: Rutas para autenticación, login y registro.
routesComment.js, routesPost.js, routesTag.js, routesUser.js: Rutas CRUD para comentarios, publicaciones, etiquetas y usuarios, conectadas con sus respectivos controladores.

### Seeders
Función: Scripts para insertar datos iniciales en la base de datos para pruebas y desarrollo.
Permite tener un entorno de pruebas consistente con datos reales para facilitar el desarrollo y la validación de funcionalidades.

seed.js: Conecta con la base de datos, limpia las colecciones y crea usuarios, posts, etiquetas y comentarios de ejemplo.

# Recomendaciones y ayudas

Les entregamos este link que apunta a un front-end ya desarrollado para que puedan investigarlo y puedan crear el back-end que se ajuste lo maximo posiblel funcionamiento del front.

[https://unahur.vmdigitai.com/redes-front/users](https://unahur.vmdigitai.com/redes-front/users)

Por otro lado les dejamos la documentació de los endpoint para que también la puedan revisar y armar siguiendo este link

[https://unahur.vmdigitai.com/swagger/](https://unahur.vmdigitai.com/swagger/)

# Bonus

- Hace el upload de las imganes que se asocian a un POST que lo guarden en una carpeta de imagenes dentro del servidor web.
- ¿Cómo modelarías que un usuario pueda "seguir" a otros usuarios, y a su vez ser seguido por muchos? Followers
- Con la información de los post no varia muy seguido que estrategias podrian utilizar la que la información no sea constantemente consultada desde la base de datos.
