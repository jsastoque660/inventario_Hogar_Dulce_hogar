function actualizarCajaHoy(){

    const hoy = new Date();

    const fechaHoy = hoy.toISOString().split("T")[0];

    // Inicializar búsqueda por día
    const inputDia = document.getElementById("buscarDia");

    if(inputDia){

        inputDia.value = fechaHoy;

    }

    // Inicializar búsqueda por mes
    const inputMes = document.getElementById("buscarMes");

    if(inputMes){

        inputMes.value = String(hoy.getMonth() + 1).padStart(2, "0");

    }

    // Inicializar año
    const inputAnio = document.getElementById("buscarAnio");

    if(inputAnio){

        inputAnio.value = hoy.getFullYear();

    }

    document.getElementById("tituloCaja").innerText =
        "Resumen del día: " + formatearFecha(fechaHoy);

    calcularCaja(fechaHoy);

}

function calcularCaja(fecha = null, mes = null, anio = null){

    let ventas = 0;
    let compras = 0;
    let ganancia = 0;

    let movimientosCaja = 0;

    let productosVendidos = 0;
    let productosComprados = 0;

    movimientos.forEach(m => {

        let incluir = false;

        // Buscar por día
        if(fecha){

            incluir = m.fecha === fecha;

        }

        // Buscar por mes
        else if(mes && anio){

            const partes = m.fecha.split("-");

            incluir =
                partes[0] == anio &&
                partes[1] == mes;

        }

        if(!incluir) return;

        movimientosCaja++;

        if(m.tipo === "Venta"){

            ventas += m.total;

            ganancia += m.ganancia || 0;

            productosVendidos += m.cantidad;

        }

        if(m.tipo === "Entrada"){

            compras += m.total;

            productosComprados += m.cantidad;

        }

    });

    document.getElementById("cajaVentas").innerText =
        formatearPesos(ventas);

    document.getElementById("cajaCompras").innerText =
        formatearPesos(compras);

    document.getElementById("cajaGanancia").innerText =
        formatearPesos(ganancia);

    document.getElementById("cajaMovimientos").innerText =
        movimientosCaja;

    document.getElementById("productosVendidos").innerText =
        productosVendidos;

    document.getElementById("productosComprados").innerText =
        productosComprados;

    const rentabilidad =
        ventas > 0
            ? (ganancia / ventas * 100).toFixed(2)
            : 0;

    document.getElementById("rentabilidad").innerText =
        rentabilidad + "%";

}

function formatearPesos(valor){

    return valor.toLocaleString(

        "es-CO",

        {

            style:"currency",

            currency:"COP"

        }

    );

}

function buscarCajaDia(){

    const fecha =
        document.getElementById("buscarDia").value;

    document.getElementById("tituloCaja").innerText =
        "Resumen del día: " + formatearFecha(fecha);

    calcularCaja(fecha);

}

function buscarCajaMes(){

    const mes =
        document.getElementById("buscarMes").value;

    const anio =
        document.getElementById("buscarAnio").value;

    const nombresMeses = {

        "01":"Enero",
        "02":"Febrero",
        "03":"Marzo",
        "04":"Abril",
        "05":"Mayo",
        "06":"Junio",
        "07":"Julio",
        "08":"Agosto",
        "09":"Septiembre",
        "10":"Octubre",
        "11":"Noviembre",
        "12":"Diciembre"

    };

    document.getElementById("tituloCaja").innerText =
        "Resumen de " +
        nombresMeses[mes] +
        " " +
        anio;

    calcularCaja(null, mes, anio);

}

