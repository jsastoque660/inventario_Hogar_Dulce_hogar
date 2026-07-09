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
                    fecha.value = new Date().toISOString().split("T")[0];
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

window.onload = function(){

    cargarVista("dashboard");

}