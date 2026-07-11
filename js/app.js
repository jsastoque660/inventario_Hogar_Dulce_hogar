function cargarVista(nombre){

    fetch("views/" + nombre + ".html")

    .then(respuesta => respuesta.text())

    .then(html => {

        document.getElementById("vista").innerHTML = html;

        // Ejecutar la función correspondiente
        switch(nombre){

            case "dashboard":
                actualizarDashboard();
                break;

            case "productos":
                document
                    .getElementById("btnCrearProducto")
                    .addEventListener("click", crearProducto);
                document
                    .getElementById("buscar")
                    .addEventListener("input", function(){
                    const texto = this.value.toLowerCase();
                
                    const filtrados = productos.filter(p =>
                        p.codigo.toLowerCase().includes(texto) ||
                        p.nombre.toLowerCase().includes(texto)
                    );
                
                    mostrarProductos(filtrados);
                });
        
            mostrarProductos();
            actualizarSelect();
        
                break;

            case "movimientos":

                actualizarSelect();

                const fecha = document.getElementById("fechaMovimiento");

                if (fecha && !movimientoPendiente) {
                    fecha.value = obtenerFechaHoy();
                }

                document
                    .getElementById("btnEntrada")
                    .addEventListener("click", registrarEntrada);

                document
                    .getElementById("btnVenta")
                    .addEventListener("click", registrarVenta);

                if(movimientoPendiente){
                    cargarMovimientoPendiente();
                }
                break;

            case "historial":
                mostrarMovimientos();
                iniciarFiltrosMovimientos();
                break;

            case "resumen":
                actualizarResumen();
                break;
            
            case "backup":
                actualizarEstadoBackup();
                break;

            case "caja":
                actualizarCajaHoy();
            break;

        }

    });

}

function obtenerFechaHoy(){

    const hoy = new Date();

    const anio = hoy.getFullYear();

    const mes = String(hoy.getMonth() + 1).padStart(2,"0");

    const dia = String(hoy.getDate()).padStart(2,"0");

    return `${anio}-${mes}-${dia}`;

}

function obtenerFechaHoy(){

    return new Intl.DateTimeFormat("en-CA",{

        timeZone:"America/Bogota"

    }).format(new Date());

}

function obtenerFechaHora(){

    return new Intl.DateTimeFormat("sv-SE",{

        timeZone:"America/Bogota",

        year:"numeric",

        month:"2-digit",

        day:"2-digit",

        hour:"2-digit",

        minute:"2-digit",

        second:"2-digit",

        hour12:false

    }).format(new Date()).replace(" ","T");

}

window.onload = function(){

    cargarVista("dashboard");

}