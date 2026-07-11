function crearProducto() {

    const codigo = document.getElementById("codigo").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const precioCompra = Number(document.getElementById("precioCompra").value);
    const stockMinimo = Number(document.getElementById("stockMinimo").value);

    if (!codigo || !nombre || precioCompra <= 0) {
        alert("Complete todos los campos.");
        return;
    }

    const existe = productos.some((p, i) =>
        i !== indiceEditar &&
        (p.codigo.toLowerCase() === codigo.toLowerCase() ||
         p.nombre.toLowerCase() === nombre.toLowerCase())
    );

    if (existe) {
        alert("Ya existe un producto con ese código o nombre.");
        return;
    }

    const producto = {
        codigo,
        nombre,
        precioCompra,
        stock: indiceEditar === -1 ? 0 : productos[indiceEditar].stock,
        stockMinimo,
        ultimaCompra: null,
        ultimaVenta: null
    };

    if (indiceEditar === -1) {
        productos.push(producto);
    } else {
        productos[indiceEditar] = producto;
        indiceEditar = -1;
        document.getElementById("btnCrearProducto").innerText = "Crear Producto";
    }

    guardar();
    limpiarProducto();
    mostrarProductos();
    actualizarSelect();
    actualizarResumen();
    actualizarDashboard();
}

function mostrarProductos(lista = productos) {

    const tabla = document.getElementById("tablaProductos");

    if (!tabla) return;

    tabla.innerHTML = "";

    lista.forEach((p) => {

        const i = productos.findIndex(
            producto => producto.codigo === p.codigo
        );

        let color = "";

        if (p.stock <= 0) {
            color = "sinStock";
        }
        else if (p.stock <= p.stockMinimo) {
            color = "stockBajo";
        }
        else {
            color = "stockNormal";
        }

        tabla.innerHTML += `
            <tr class="${color}">

                <td>${p.codigo}</td>
                <td>${p.nombre}</td>
                <td>${p.stock}</td>
                <td>${formatoCOP(p.precioCompra)}</td>
    
                <td>
                    <button onclick="editarProducto(${i})">
                        Editar
                    </button>
    
                    <button onclick="eliminarProducto(${i})">
                        Eliminar
                    </button>
                </td>

            </tr>
        `;
    });

}

function editarProducto(i){

    const producto = productos[i];

    document.getElementById("codigo").value = producto.codigo;
    document.getElementById("nombre").value = producto.nombre;
    document.getElementById("precioCompra").value = producto.precioCompra;
    document.getElementById("stockMinimo").value = producto.stockMinimo;

    indiceEditar = i;

    document.getElementById("btnCrearProducto").innerText =
    "Actualizar Producto";

}

function eliminarProducto(i){

    const tieneMovimientos = movimientos.some(
        m => m.productoCodigo === productos[i].codigo
    );

    if(tieneMovimientos){

        alert(
            `No se puede eliminar "${productos[i].nombre}" porque tiene movimientos registrados.`
        );

        return;

    }

    if(!confirm("¿Deseas eliminar este producto?")){

        return;

    }

    productos.splice(i,1);

    guardar();
    mostrarProductos();
    actualizarSelect();
    actualizarDashboard();
}

function actualizarSelect() {

    const entrada = document.getElementById("productoEntrada");
    const venta = document.getElementById("productoVenta");

    if (!entrada || !venta) return;

    entrada.innerHTML = `<option value="">Seleccione un producto</option>`;
    venta.innerHTML = `<option value="">Seleccione un producto</option>`;

    productos.forEach((producto, indice) => {

        entrada.innerHTML += `
            <option value="${indice}">
                ${producto.codigo} - ${producto.nombre}
            </option>
        `;

        venta.innerHTML += `
            <option value="${indice}">
                ${producto.codigo} - ${producto.nombre}
            </option>
        `;

    });

}