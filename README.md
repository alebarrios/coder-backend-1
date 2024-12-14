# Programación Backend I: Desarrollo Avanzado de Backend (comisión 70365)

## Entrega Final - Alejandro Barrios
Instrucciones para ejecutar el proyecto:
* Clonar repositorio: https://github.com/alebarrios/coder-backend-1.git
* Desde la raíz del proyecto, ejecutar comando: ```npm install```
* Dado que la aplicación se conecta a una MongoDB, es necesario crear un archivo llamado ```.env``` en la raíz del proyecto con las siguientes variables:
  * ```MONGO_USERNAME=tu_usuario```
  * ```MONGO_PASSWORD=tu_contraseña```
  * ```MONGO_DBNAME=nombre_de_tu_base_de_datos```
  * ```MONGO_CLUSTER_URL=tu_cluster.mongodb.net```
* Para correr el proyecto localmente, ejecutar: ```npm start```

## Dependencias
* **express**: Web Framework liviano para Node.js.
* **express-handlebars**: Handlebars view engine para Express.js.
* **socket.io**: Framework para utilizar Websockets.
* **mongoose**: Framework para conectar con MongoDB (Base de Datos).
* **mongoose-paginate-v2**: plugin de paginación en mongoose.
* **dotenv**: librería para proteger información sensitiva.

## Dependencias (Dev)
* **nodemon**: Para reiniciar web server automáticamente al modificar el código fuente.
* **jest**: Javascript Testing Framework.
* **supertest**: Javascript HTTP Tester.
* **cross-env**: Para ejecutar scripts que utilizan variables de ambiente en diferentes plataformas (Windows, Linux)