async function socketFunction(socket) {
    console.log('Device connected', socket.id);
    socket.join(socket.id.toString());
    socket.on('disconnect', () => {
        console.log('Device disconnected', socket.id);
    });
    socket.on('send-data', async(document) => {
        SocketController.receiveDataFromClient(socket, document);
    });
}

module.exports = {
    socketFunction,
};