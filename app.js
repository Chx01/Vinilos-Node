
const express =require('express')
const cors = require("cors");
const sequelize = require("./helpers/database.js");
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express(); 
app.use(cors());
app.use(express.json());

// Importaciones de los modelos 
const Editorial = require("./models/editoriales.js"); 
const Membresia = require("./models/membresias.js"); 
const Prestamo = require("./models/prestamos.js");
const Socio = require("./models/socios.js");
const Usuario = require("./models/usuarios.js");
const Vinilo = require("./models/vinilos.js");

// Sincronizar los modelos para verificar la conexión con la base de datos
sequelize
.sync({ alter: true })
.then(() => {
console.log("Todos los modelos se sincronizaron correctamente.");
}) .catch((err) => {
console.log("Ha ocurrido un error al sincronizar los modelos: ", err); 
});

// Confugure Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: { title: 'API Gestión de Vinilos',
        version: '1.0.0',
        description: 'Documentación de la API de gestión de vinilos',    
        },
    },
    apis: ['./routes/*.js', ' ./models/*.js'],
};

const swaggerSpec = swaggerJsdoc (swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
app.use("/vinilos", require("./routes/viniloRoutes"));

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Swagger UI en http://localhost:${PORT}/api-docs`);
});

