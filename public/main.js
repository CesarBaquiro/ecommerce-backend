//Cliente de socket
const socket = io();

console.log(socket);

const input = document.getElementById("input");
const enviar = document.getElementById("enviar");

enviar.addEventListener("click", () => {
    socket.emit("message", input.value);

    input.value = "";
});
