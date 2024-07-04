// Crear un nuevo producto

document.getElementById("btn-send").addEventListener("click", async () => {
    const codigo = document.getElementById("codigo").value;
    const titulo = document.getElementById("titulo").value;
    const descripcion = document.getElementById("descripcion").value;
    const precio = document.getElementById("precio").value;
    const cantidad = document.getElementById("cantidad").value;
    const categoria = document.getElementById("categoria").value;

    const newProduct = {
        code: codigo,
        title: titulo,
        description: descripcion,
        price: Number(precio),
        stock: Number(cantidad),
        category: categoria,
        thumbnails: [], // Puedes agregar lógica para manejar las imágenes
        status: true,
    };

    try {
        const response = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        });
        const result = await response.json();
        console.log("Producto creado:", result);

        // Opcional: recargar la lista de productos después de crear uno nuevo
        window.location.reload();
    } catch (error) {
        console.error("Error creando el producto:", error);
    }
});

// Borrar un producto

document.addEventListener("DOMContentLoaded", () => {
    const deleteButtons = document.querySelectorAll("#btn-delete");

    deleteButtons.forEach((button) => {
        button.addEventListener("click", async () => {
            const id = button.getAttribute("data-id");

            try {
                const response = await fetch(`/api/products/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log("Producto eliminado:", result);

                    // Recargar la lista de productos después de eliminar uno
                    window.location.reload();
                } else {
                    console.error(
                        "Error eliminando el producto:",
                        await response.text()
                    );
                }
            } catch (error) {
                console.error("Error eliminando el producto:", error);
            }
        });
    });
});
