
const contenedorProductos = document.querySelector("#productos-container");
const estadoProductos = document.querySelector("#estado-productos");

async function cargarProductos() {
    try {
        const respuesta = await fetch("../assets/data/productos.json");

        if (!respuesta.ok) {
            throw new Error("No se pudieron cargar los productos.");
        }

        const productos = await respuesta.json();

        contenedorProductos.innerHTML = productos.map(({ id, nombre, precio, imagen, descripcion, calificacion }) => `
            <div class="col-md-6 col-lg-4">
                <div class="card h-100">
                    <img
                        src="../${imagen.replace("../", "")}"
                        class="card-img-top"
                        alt="${nombre}"
                    >

                    <div class="card-body">
                        <h5 class="card-title">${nombre}</h5>

                        <div class="rating" aria-label="${calificacion} estrellas">
                            ${"⭐".repeat(calificacion)}
                        </div>

                        <p class="card-text">${descripcion}</p>

                        <p class="precio">
                            ${precio.toLocaleString("es-AR", {
                                style: "currency",
                                currency: "ARS",
                                maximumFractionDigits: 0
                            })}
                        </p>

                        <button
                            type="button"
                            class="btn btn-primary"
                            data-producto-id="${id}"
                            disabled
                        >
                            Carrito próximamente
                        </button>
                    </div>
                </div>
            </div>
        `).join("");

    } catch (error) {
        estadoProductos.textContent =
            "No pudimos cargar los productos. Intentá nuevamente más tarde.";

        console.error("Error al cargar productos:", error);

    } finally {
        estadoProductos.hidden = true;
    }
}

cargarProductos();
