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
    // MOVIMIENTOS DE HOY
    // ===========================

    let comprasHoy = 0;
    let ventasHoy = 0;
    let gananciaHoy = 0;

    const hoy = new Date().toLocaleDateString();

    // ===========================
    // PRODUCTOS
    // ===========================

    productos.forEach(producto => {

        totalUnidades += producto.stock;

        valorInventario += producto.stock * producto.precioCompra;

        if(producto.stock <= 0){

            sinStock++;

        }
        else if(producto.stock <= producto.stockMinimo){

            stockBajo++;

        }

    });

    // ===========================
    // MOVIMIENTOS
    // ===========================

    movimientos.forEach(movimiento => {

        if(!movimiento.fecha.startsWith(hoy)) return;

        if(movimiento.tipo === "Entrada"){

            comprasHoy += movimiento.total;

        }

        if(movimiento.tipo === "Venta"){

            ventasHoy += movimiento.total;

            gananciaHoy += movimiento.ganancia || 0;

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

    document.getElementById("comprasHoy").innerText =
        formatoCOP(comprasHoy);

    document.getElementById("ventasHoy").innerText =
        formatoCOP(ventasHoy);

    document.getElementById("gananciaHoy").innerText =
        formatoCOP(gananciaHoy);

    document.getElementById("stockBajo").innerText =
        stockBajo;

    document.getElementById("sinStock").innerText =
        sinStock;

}