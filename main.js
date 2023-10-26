function productosPorCategoria(products, categories) {
    return products.filter(product => categories.includes(product.category));
}

function mostrarProductos(productosOrdenados) {
    return productosOrdenados.map((producto, index) => `${index + 1})- ${producto.title}`).join('\n');
}

function productosPorTitulo(products) {
    return products.sort((a, b) => a.title.localeCompare(b.title));
}

function calcularFechaEntrega(diasHabiles) {
    let fechaEntrega = new Date();
    while (diasHabiles > 0) {
        fechaEntrega.setDate(fechaEntrega.getDate() + 1);
        
        if (fechaEntrega.getDay() !== 0 && fechaEntrega.getDay() !== 6) {
            diasHabiles--;
        }
    }
    return fechaEntrega;
}

const categoriaSeleccionada = ["men's clothing", "women's clothing"];
const mensajeBienvenida = "¡Hola! Bienvenido a nuestro e-commerce"
const mensajeGracias = "Gracias por visitar nuestro e-commerce"


function obtenerProductoSeleccionado(mensajeProductos, productosOrdenados) {
    let productoEncontrado = false;
    let productoElegido = prompt(`Estos son los productos disponibles, con entrega a domicilio en 5 días hábiles:\nELIJA EL NÚMERO DEL PRODUCTO\n${mensajeProductos}`);
    let productoSeleccionado;

    while (!productoEncontrado) {
        const numeroProductoElegido = parseInt(productoElegido);
        if (numeroProductoElegido > 0 && numeroProductoElegido <= productosOrdenados.length) {
            productoSeleccionado = productosOrdenados[numeroProductoElegido - 1];
            productoEncontrado = true;

        } else if (productoElegido === null) {
            const respuestaUsuario = confirm("¿Esta seguro que desea abandonar la compra?");
            if (respuestaUsuario) {
                alert(mensajeGracias);
                break;
            } else {
                productoElegido = prompt(`Estos son los productos disponibles:\n${mensajeProductos}\n¿Qué producto desea comprar?`);
            }
        } else {
            const respuestaUsuario = confirm("El número de producto seleccionado no es válido. ¿Desea intentarlo nuevamente?");
            if (respuestaUsuario) {
                productoElegido = prompt(`Estos son los productos disponibles:\n${mensajeProductos}\n¿Qué producto desea comprar?`);
                if (productoElegido === null) {
                    alert(mensajeGracias);
                    break;
                }
            } else {
                alert(mensajeGracias);
                break;
            }
        }
    }

    return productoSeleccionado;
}

function confirmarCompra(productoSeleccionado) {
    const confirmacionCompra = confirm(`Nombre: ${productoSeleccionado.title}\nDescripción: ${productoSeleccionado.description}\nPrecio: $${productoSeleccionado.price}\n¿Desea completar la compra?`);
    if (confirmacionCompra) {
        const fechaEntrega = calcularFechaEntrega(5);
        alert(`¡Gracias por su compra! La fecha estimada de entrega es ${fechaEntrega.toLocaleDateString()}.`);
    } else {
        alert("Gracias por visitar nuestro e-commerce");
    }
}


const productosFiltrados = productosPorCategoria(products, categoriaSeleccionada);
alert("¡Hola! Bienvenido a nuestro e-commerce");
alert(`A continuacion encontraras:\n1- Ropa de hombre\n2- Ropa de mujer`);
const productosOrdenados = productosPorTitulo(productosFiltrados);
const mensajeProductos = mostrarProductos(productosOrdenados);
const productoSeleccionado = obtenerProductoSeleccionado(mensajeProductos, productosOrdenados);

if (productoSeleccionado) {
    confirmarCompra(productoSeleccionado);
}