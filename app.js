const listaProductos = document.getElementById('listaProductos');
const total = document.getElementById('total');
let sumaTotal = 0;

function agregarProducto() {
    const producto = document.getElementById('producto').value;
    const precio = parseFloat(document.getElementById('precio').value);
    
    if (!producto || isNaN(precio)) {
        alert('Por favor, completa todos los campos');
        return;
    }

    // Añadir producto a la lista
    const fila = document.createElement('tr');
    fila.innerHTML = `<td>${producto}</td><td>${precio.toFixed(2)}</td>`;
    listaProductos.appendChild(fila);

    // Actualizar el total
    sumaTotal += precio;
    total.textContent = sumaTotal.toFixed(2);

    // Limpiar campos
    document.getElementById('producto').value = '';
    document.getElementById('precio').value = '';
}
