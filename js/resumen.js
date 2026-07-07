function actualizarResumen() {

    const tabla = document.getElementById("tablaResumen");

    if (!tabla) return;

    tabla.innerHTML = "";

    productos.forEach(producto => {

        const compras = movimientos.filter(m =>
            m.productoCodigo === producto.codigo &&
            m.tipo === "Entrada"
        );

        const ventas = movimientos.filter(m =>
            m.productoCodigo === producto.codigo &&
            m.tipo === "Venta"
        );

        let promedioCompra = 0;
        let promedioVenta = 0;

        // Promedio ponderado de compras
        if (compras.length > 0) {

            let totalDinero = 0;
            let totalCantidad = 0;

            compras.forEach(c => {
                totalDinero += c.precioUnitario * c.cantidad;
                totalCantidad += c.cantidad;
            });

            promedioCompra = totalDinero / totalCantidad;
        }

        // Promedio ponderado de ventas
        if (ventas.length > 0) {

            let totalDinero = 0;
            let totalCantidad = 0;

            ventas.forEach(v => {
                totalDinero += v.precioUnitario * v.cantidad;
                totalCantidad += v.cantidad;
            });

            promedioVenta = totalDinero / totalCantidad;
        }

        tabla.innerHTML += `
            <tr>

                <td>${producto.codigo}</td>

                <td>${producto.nombre}</td>

                <td>${formatoCOP(promedioCompra)}</td>

                <td>${formatoCOP(promedioVenta)}</td>

                <td>${producto.stock}</td>

            </tr>
        `;

    });

}