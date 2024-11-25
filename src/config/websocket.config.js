import { Server } from "socket.io";

// Configura el servidor Socket.IO
export const config = (httpServer) => {
    // Crea una nueva instancia del servidor Socket.IO
    const socketServer = new Server(httpServer);

    // Escucha el evento de conexión de un nuevo cliente
    socketServer.on("connection", async (socket) => {
        console.log("Conexión establecida con usuario: ", socket.id);


        // Escucha el evento de des-conexión del cliente
        socket.on("disconnecting", (reason) => {
            console.log("Se desconectó el usuario: ", socket.id);
        });
    });
};