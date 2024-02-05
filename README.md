## ApiRestFul

Escrita en node, utilizando express

### Instalaciones necesarias

```sh
 npm install express -S
 npm install mongoose -S
 npm install nodemon -D
 npm install cors -S
 npm install dotenv -S

 npm install jsonwebtoken -S
 npm install bcrypt -S
```

## Ejemplo para crear un nueva tarea en la base de datos - POST

```json
{
  "titulo": "Proyecto Angular",
  "descripcion": "Desarrollo de una aplicación web con Angular",
  "estado": "pendiente",
  "fechaVencimiento": "2024-03-15"
}
```

## Ejemplo para registrar un usuario en la base de datos - POST http://localhost:3000/api/users/register

```json
{
  "username":"sofia",
  "email":"sofia@correo.com",
  "password":"secreto"
}
```

## Ejemplo para hacer login de un usuario en la base de datos - POST http://localhost:3000/api/users/login

```json
{
  "email":"sofia@correo.com",
  "password":"secreto"
}
```

