function actualizarDashboard() {

    if (!document.getElementById("totalProductos")) return;

    // ===========================
    // DATOS GENERALES
    // ===========================

    let totalProductos = productos.length;
    let totalUnidades = 0;
    let valorInventario = 0;

    let stockBajo = 0;
    let sinStock = 0;

    // ===========================
    // PRODUCTOS
    // ===========================

    productos.forEach(producto => {

        totalUnidades += producto.stock;

        valorInventario +=
            producto.stock * producto.precioCompra;

        if(producto.stock <= 0){

            sinStock++;

        }
        else if(producto.stock <= producto.stockMinimo){

            stockBajo++;

        }

    });

    // ===========================
    // MOSTRAR
    // ===========================

    document.getElementById("totalProductos").innerText =
        totalProductos;

    document.getElementById("totalUnidades").innerText =
        totalUnidades;

    document.getElementById("valorInventario").innerText =
        formatoCOP(valorInventario);

    document.getElementById("stockBajo").innerText =
        stockBajo;

    document.getElementById("sinStock").innerText =
        sinStock;

}