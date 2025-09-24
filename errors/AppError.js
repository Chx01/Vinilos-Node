class AppError extends Error {
    constructor(message, statusCode)  {
        super(message); //Llama al constructor de la clase base Error
        this.statusCode = statusCode; // Establece el código de estado
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"; // Determina si es un error de cliente o servidor 
        this.isOperational = true; //Marca el error como operativo 

        Error.captureStackTrace(this, this.constructor); //Captura la pila de llamadas
    }
}

module.exports = AppError;