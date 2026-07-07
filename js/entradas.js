function registrarEntrada() {

    const index = document.getElementById("productoEntrada").value;

    const cantidad = Number(
        document.getElementById("cantidadEntrada").value
    );

    const precio = Number(
        document.getElementById("precioEntrada").value
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
            productoAnterior.stock -= movimientoAnterior.cantidad;
        }

    }

    // Agregar al nuevo producto
    productoNuevo.stock += cantidad;
    productoNuevo.precioCompra = precio;
    productoNuevo.ultimaCompra = new Date().toLocaleDateString();

    const nuevoMovimiento = {

        id: indiceMovimientoEditar === -1
            ? Date.now()
            : movimientos[indiceMovimientoEditar].id,

        fecha: document.getElementById("fechaMovimiento").value,
        
        productoCodigo: productoNuevo.codigo,

        productoNombre: productoNuevo.nombre,

        tipo: "Entrada",

        cantidad: cantidad,

        precioUnitario: precio,

        total: cantidad * precio

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

    document.getElementById("btnEntrada").innerText =
        "Registrar Entrada";

    limpiarEntrada();

}

function limpiarEntrada(){

    document.getElementById("cantidadEntrada").value = "";

    document.getElementById("precioEntrada").value = "";

}
