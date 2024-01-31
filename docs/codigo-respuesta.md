Los códigos de respuesta HTTP son una parte crucial de las comunicaciones en la web, proporcionando una manera estandarizada para que los servidores indiquen el estado de las respuestas a las solicitudes hechas por los clientes (navegadores, aplicaciones, etc.). Aquí te explico por qué se usan ciertos códigos en el contexto del controlador de tu API:

1. **`200 OK`**: Este es el código de respuesta estándar para operaciones exitosas. En el caso de `getAllTasks` y `getTaskById`, se usa para indicar que la operación de recuperación fue exitosa. En `updateTask`, indica que la tarea se actualizó correctamente.

2. **`201 Created`**: Específico para `createTask`, este código indica que una nueva tarea fue creada con éxito. Es una buena práctica usar el código `201` en lugar de `200` para respuestas de operaciones de creación, ya que ofrece una indicación más clara de que algo nuevo fue añadido a la base de datos.

3. **`400 Bad Request`**: Este código se utiliza para indicar que algo en la solicitud del cliente estaba mal formado o incorrecto, por ejemplo, si faltan datos requeridos para crear una nueva tarea. Es una forma de decirle al cliente que debe modificar su solicitud antes de intentarlo de nuevo.

4. **`404 Not Found`**: Se utiliza en `getTaskById`, `updateTask` y `deleteTask` para indicar que no se encontró ninguna tarea con el ID proporcionado. Es una manera estándar de indicar que se hizo una solicitud a un recurso que no existe.

5. **`500 Internal Server Error`**: Este código se utiliza para indicar que algo salió mal en el servidor, pero no está claro qué fue exactamente. Se usa en situaciones donde hay una excepción o un error inesperado en el servidor, como un problema de conexión a la base de datos.
