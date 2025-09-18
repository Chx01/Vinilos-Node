
const express =require('express')
const cors = require("cors");
const app = express()

app.get('/', (req, res) => {

    res.send("Hola Mundo!")

})

app.listen(3000, () => {

    console.log("Servidor iniciado en el puerto 3000")
    
})

// Instancia de Sequelize para conectarse a la base de datos
const sequelize = require("./helpers/database.js"); 

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

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Confugure Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: { title: 'API Vinilos',
        version: '1.0.0',
        description: 'API Vinilos',    
        },
    },
    apis: ['./routes/*.js', ' ./models/*.js'],
};

const swaggerSpec = swaggerJsdoc (swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/vinilos", require("./routes/viniloRoutes"));

