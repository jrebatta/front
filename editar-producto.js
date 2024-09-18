document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        fetch(`http://192.168.18.18:8080/api/productos/${productId}`)
            .then(response => response.json())
            .then(product => {
                document.getElementById('product-id').value = product.codigo;
                document.getElementById('descripcion').value = product.descripcion;
                document.getElementById('precio').value = product.precio;
                document.getElementById('stock').value = product.stock;
            });

        document.getElementById('edit-product-form').addEventListener('submit', function(event) {
            event.preventDefault();

            const id = document.getElementById('product-id').value;
            const descripcion = document.getElementById('descripcion').value;
            const precio = parseFloat(document.getElementById('precio').value);
            const stock = parseInt(document.getElementById('stock').value);

            fetch(`http://localhost:8080/api/actualizarProducto/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    descripcion,
                    precio,
                    stock
                })
            })
                .then(response => {
                    if (response.ok) {
                        alert('Producto actualizado con éxito');
                        window.location.href = 'productos.html'; // Redirige a la página principal o a donde desees
                    } else {
                        alert('Error al actualizar el producto');
                    }
                });
        });
    } else {
        alert('No se encontró el ID del producto');
        window.location.href = 'index.html'; // Redirige a la página principal si no hay ID
    }
});
