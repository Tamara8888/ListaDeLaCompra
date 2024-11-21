const listaProductos = document.getElementById('listaProductos');
const total = document.getElementById('total');
let sumaTotal = 0;

// Cargar productos desde localStorage al cargar la página
window.onload = function() {
    cargarProductos();
};

// Función para cargar productos desde localStorage
function cargarProductos() {
    // Obtener los productos guardados del localStorage, o un arreglo vacío si no existen
    const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
    
    // Limpiar la lista antes de cargar nuevos productos
    listaProductos.innerHTML = '';

    // Recorrer los productos guardados y añadirlos a la tabla
    productosGuardados.forEach((producto) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `<td>${producto.nombre}</td><td>${producto.precio.toFixed(2)}</td>`;
        listaProductos.appendChild(fila);

        sumaTotal += producto.precio;  // Actualizar el total
    });

    // Mostrar el total calculado
    total.textContent = sumaTotal.toFixed(2);
}

// Función para agregar un producto a la lista
function agregarProducto() {
    const producto = document.getElementById('producto').value;
    const precio = parseFloat(document.getElementById('precio').value);
    
    if (!producto || isNaN(precio)) {
        alert('Por favor, completa todos los campos');
        return;
    }

    // Crear un nuevo objeto producto
    const nuevoProducto = {
        nombre: producto,
        precio: precio
    };

    // Obtener los productos guardados en localStorage, o un arreglo vacío si no existen
    const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];

    // Añadir el nuevo producto al arreglo de productos
    productosGuardados.push(nuevoProducto);

    // Guardar el arreglo actualizado en localStorage
    localStorage.setItem('productos', JSON.stringify(productosGuardados));

    // Añadir el producto a la tabla
    const fila = document.createElement('tr');
    fila.innerHTML = `<td>${producto}</td><td>${precio.toFixed(2)}</td>`;
    listaProductos.appendChild(fila);

    // Actualizar el total
    sumaTotal += precio;
    total.textContent = sumaTotal.toFixed(2);

    // Limpiar los campos
    document.getElementById('producto').value = '';
    document.getElementById('precio').value = '';
}

