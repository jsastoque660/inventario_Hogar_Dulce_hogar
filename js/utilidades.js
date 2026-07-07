let productos = JSON.parse(localStorage.getItem("inventario")) || [];
let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];

let indiceEditar = -1;
let indiceMovimientoEditar = -1;
let movimientoPendiente = null;

function guardar() {

    localStorage.setItem(
        "inventario",
        JSON.stringify(productos)
    );

    localStorage.setItem(
        "movimientos",
        JSON.stringify(movimientos)
    );

}

function limpiarProducto() {

    document.getElementById("codigo").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("precioCompra").value = "";
    document.getElementById("stockMinimo").value = 5;

}

function formatearFecha(fecha) {

    if (!fecha) return "";

    const partes = fecha.split("-");

    if (partes.length !== 3) return fecha;

    return `${partes[2]}/${partes[1]}/${partes[0]}`;

}

function formatoCOP(valor) {

    return "$ " + Number(valor).toLocaleString("es-CO", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });

}