function registrarVenta() {

    const index = document.getElementById("productoVenta").value;

    const cantidad = Number(
        document.getElementById("cantidadVenta").value
    );

    const precio = Number(
        document.getElementById("precioVenta").value
    );

    if (index === "") {
        alert("Seleccione un producto.");
        return;
    }

    if (cantidad <= 0) {
        alert("Cantidad inválida.");
        return;
    }

    if (precio <= 0) {
        alert("Precio inválido.");
        return;
    }

    const productoNuevo = productos[index];

    // ===========================
    // SI ESTAMOS EDITANDO
    // ===========================
    if (indiceMovimientoEditar !== -1) {

        const movimientoAnterior = movimientos[indiceMovimientoEditar];

        const productoAnterior = productos.find(
            p => p.codigo === movimientoAnterior.productoCodigo
        );

        if (productoAnterior) {
            productoAnterior.stock += movimientoAnterior.cantidad;
        }

    }

    if (cantidad > productoNuevo.stock) {
        alert("No hay suficiente stock.");
        return;
    }

    productoNuevo.stock -= cantidad;
    productoNuevo.ultimaVenta = new Date().toLocaleDateString();

    const nuevoMovimiento = {

        id: indiceMovimientoEditar === -1
            ? Date.now()
            : movimientos[indiceMovimientoEditar].id,

        fecha: document.getElementById("fechaMovimiento").value,
        
        productoCodigo: productoNuevo.codigo,

        productoNombre: productoNuevo.nombre,

        tipo: "Venta",

        cantidad: cantidad,

        precioUnitario: precio,

        total: cantidad * precio,

        ganancia: (precio - productoNuevo.precioCompra) * cantidad

    };

    if (indiceMovimientoEditar === -1) {

        movimientos.push(nuevoMovimiento);

    } else {

        movimientos[indiceMovimientoEditar] = nuevoMovimiento;

    }

    guardar();

    mostrarProductos();
    mostrarMovimientos();
    actualizarSelect();
    actualizarResumen();
    actualizarDashboard();

    movimientoPendiente = null;
    indiceMovimientoEditar = -1;
    tipoMovimientoEditar = "";

    document.getElementById("btnVenta").innerText =
        "Registrar Venta";

    limpiarVenta();

}

function limpiarVenta(){

    document.getElementById("cantidadVenta").value = "";

    document.getElementById("precioVenta").value = "";

}