function mostrarMovimientos(lista = movimientos) {

    const tabla = document.getElementById("tablaMovimientos");

    if (!tabla) return;

    tabla.innerHTML = "";

    [...lista]
    .reverse()
    .forEach((m) => {

        const i = movimientos.findIndex(
            mov => mov.id === m.id
        );

        // Buscar el producto actual por su código
        const productoActual = productos.find(
            p => p.codigo === m.productoCodigo
        );

        // Si existe, usar el nombre actual.
        // Si no existe (por ejemplo, el producto fue eliminado),
        // usar el nombre guardado en el movimiento.
        const nombreProducto = productoActual
            ? productoActual.nombre
            : (m.productoNombre || m.producto || "");

        tabla.innerHTML += `
            <tr>
                <td>${formatearFecha(m.fecha)}</td>
               <td>${m.productoCodigo || ""}</td>
                <td>${nombreProducto}</td>
                <td>
                    <span class="${m.tipo === 'Entrada' ? 'badgeEntrada' : 'badgeVenta'}">
                        ${m.tipo}
                    </span>
                </td>
                <td>${m.cantidad || 0}</td>
                <td>${formatoCOP(m.precioUnitario || 0)}</td>
                <td>${formatoCOP(m.total || 0)}</td>
                <td>
                    <button onclick="editarMovimiento(${i})">Editar</button>
                    <button onclick="eliminarMovimiento(${i})">Eliminar</button>
                </td>
            </tr>
        `;

    });

}

function editarMovimiento(i){

    movimientoPendiente = movimientos[i];

    cargarVista("movimientos");

}

function eliminarMovimiento(i){

    if(!confirm("¿Eliminar este movimiento?")){
        return;
    }

    const m = movimientos[i];

    const producto = productos.find(p => p.codigo === m.productoCodigo);

    if(producto){

        if(m.tipo === "Entrada"){

            producto.stock -= m.cantidad;

        }else{

            producto.stock += m.cantidad;

        }

    }

    movimientos.splice(i,1);

    guardar();
    mostrarProductos();
    mostrarMovimientos();
    actualizarResumen();
    actualizarDashboard();

}

function cargarMovimientoPendiente(){

    indiceMovimientoEditar =
        movimientos.findIndex(m => m.id === movimientoPendiente.id);

    if(indiceMovimientoEditar === -1){
        movimientoPendiente = null;
        return;
    }

    const m = movimientoPendiente;

    // Cargar la fecha del movimiento
    document.getElementById("fechaMovimiento").value = m.fecha;

    if(m.tipo === "Entrada"){

        document.getElementById("productoEntrada").value =
            productos.findIndex(p => p.codigo === m.productoCodigo);

        document.getElementById("cantidadEntrada").value =
            m.cantidad;

        document.getElementById("precioEntrada").value =
            m.precioUnitario;

        document.getElementById("btnEntrada").innerText =
            "Actualizar Entrada";

    }
    else{

        document.getElementById("productoVenta").value =
            productos.findIndex(p => p.codigo === m.productoCodigo);

        document.getElementById("cantidadVenta").value =
            m.cantidad;

        document.getElementById("precioVenta").value =
            m.precioUnitario;

        document.getElementById("btnVenta").innerText =
            "Actualizar Venta";

    }

}

function filtrarMovimientos() {

    let lista = [...movimientos];

    // Buscar
    const texto = document.getElementById("buscarMovimiento").value.toLowerCase();

    if(texto !== ""){

        lista = lista.filter(m =>

            m.productoCodigo.toLowerCase().includes(texto) ||

            m.productoNombre.toLowerCase().includes(texto)

        );

    }

    // Tipo
    const tipo = document.getElementById("filtroTipo").value;

    if(tipo !== "Todos"){

        lista = lista.filter(m => m.tipo === tipo);

    }

    // Fecha desde
    const desde = document.getElementById("fechaDesde").value;

    if(desde){

        lista = lista.filter(m => m.fecha >= desde);

    }

    // Fecha hasta
    const hasta = document.getElementById("fechaHasta").value;

    if(hasta){

        lista = lista.filter(m => m.fecha <= hasta);

    }

    // Orden
    const orden = document.getElementById("ordenMovimiento").value;

    lista.sort((a,b)=>{

        if(orden==="reciente"){

            return b.fecha.localeCompare(a.fecha);

        }

        return a.fecha.localeCompare(b.fecha);

    });

    mostrarMovimientos(lista);

}

function iniciarFiltrosMovimientos(){

    document.getElementById("buscarMovimiento")
        ?.addEventListener("input", filtrarMovimientos);

    document.getElementById("filtroTipo")
        ?.addEventListener("change", filtrarMovimientos);

    document.getElementById("ordenMovimiento")
        ?.addEventListener("change", filtrarMovimientos);

    document.getElementById("fechaDesde")
        ?.addEventListener("change", filtrarMovimientos);

    document.getElementById("fechaHasta")
        ?.addEventListener("change", filtrarMovimientos);
    document.getElementById("btnLimpiarFiltros")
    ?.addEventListener("click", limpiarFiltros);
}

function limpiarFiltros(){

    document.getElementById("buscarMovimiento").value = "";

    document.getElementById("filtroTipo").value = "Todos";

    document.getElementById("ordenMovimiento").value = "reciente";

    document.getElementById("fechaDesde").value = "";

    document.getElementById("fechaHasta").value = "";

    filtrarMovimientos();

}