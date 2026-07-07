function exportarRespaldo() {

    const respaldo = {

        productos: productos,

        movimientos: movimientos,

        fecha: new Date().toLocaleString(),

        version: "1.0"

    };

    const texto = JSON.stringify(respaldo, null, 4);

    const blob = new Blob([texto], {

        type: "application/json"

    });

    const enlace = document.createElement("a");

    enlace.href = URL.createObjectURL(blob);

    const hoy = new Date().toISOString().split("T")[0];

    enlace.download =
        `Inventario_Hogar_Dulce_Hogar_${hoy}.json`;

    enlace.click();

}

function importarRespaldo(evento){

    const archivo = evento.target.files[0];

    if(!archivo) return;

    const lector = new FileReader();

    lector.onload = function(e){

        const datos = JSON.parse(e.target.result);

        productos = datos.productos || [];

        movimientos = datos.movimientos || [];

        guardar();

        mostrarProductos();

        mostrarMovimientos();

        actualizarSelect();

        actualizarResumen();

        actualizarDashboard();

        alert("Respaldo restaurado correctamente.");

    };

    lector.readAsText(archivo);

}

function actualizarEstadoBackup(){

    const fecha = localStorage.getItem("ultimoBackup");

    document.getElementById("ultimoBackup").innerText =
        fecha || "Nunca";

    document.getElementById("infoProductos").innerText =
        productos.length;

    document.getElementById("infoMovimientos").innerText =
        movimientos.length;

    let valorInventario = 0;

    productos.forEach(p => {

        valorInventario +=
            p.stock * p.precioCompra;

    });

    document.getElementById("infoInventario").innerText =
        valorInventario.toLocaleString(
            "es-CO",
            {
                style:"currency",
                currency:"COP"
            }
        );

    const entradas =
        movimientos.filter(m => m.tipo === "Entrada");

    const ventas =
        movimientos.filter(m => m.tipo === "Venta");

    document.getElementById("ultimaEntrada").innerText =
        entradas.length
        ? entradas[entradas.length-1].fecha
        : "Sin registros";

    document.getElementById("ultimaVenta").innerText =
        ventas.length
        ? ventas[ventas.length-1].fecha
        : "Sin registros";

    const respaldo = JSON.stringify({

        productos,

        movimientos

    });

    const kb =
        (new Blob([respaldo]).size/1024).toFixed(2);

    document.getElementById("tamanoBackup").innerText =
        kb + " KB";

}