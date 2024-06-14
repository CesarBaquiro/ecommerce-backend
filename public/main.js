// Cliente de socket
const socket = io();

let listaProductos = [];

const code = document.getElementById("codigo");
const title = document.getElementById("titulo");
const description = document.getElementById("descripcion");
const price = document.getElementById("precio");
const stock = document.getElementById("cantidad");
const categoria = document.getElementById("categoria");
const enviar = document.getElementById("enviar");

enviar.addEventListener("click", async () => {
    const nuevoProducto = {
        id: listaProductos.length + 1, // Generar un ID sencillo
        code: code.value,
        title: title.value,
        description: description.value,
        price: parseFloat(price.value),
        stock: parseInt(stock.value),
        category: categoria.value,
        thumbnails: "", // Si no hay thumbnails por defecto
        status: true, // Estado por defecto
    };

    listaProductos.push(nuevoProducto);

    // Imprimir la lista de productos en la consola
    console.log(listaProductos);

    // Emitir el nuevo producto al servidor
    socket.emit("nuevo-producto", nuevoProducto);

    // Limpiar los campos del formulario
    code.value = "";
    title.value = "";
    description.value = "";
    price.value = "";
    stock.value = "";
    categoria.value = "";
});
