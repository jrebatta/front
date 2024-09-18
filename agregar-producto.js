document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('add-product-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const descripcion = document.getElementById('descripcion').value;
        const precio = parseFloat(document.getElementById('precio').value);
        const stock = parseInt(document.getElementById('stock').value);

        fetch('http://localhost:8080/api/registrarProducto', {
            method: 'POST',
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
                    alert('Producto agregado con éxito');
                    window.location.href = 'productos.html'; // Redirige a la página principal
                } else {
                    alert('Error al agregar el producto');
                }
            });
    });
});
