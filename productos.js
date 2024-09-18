document.addEventListener('DOMContentLoaded', function() {
    fetch('http://192.168.18.18:8080/api/productosTotal')
        .then(response => response.json())
        .then(data => {
            const productContainer = document.querySelector('.row');
            data.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'col-md-4'; // Ajusta las columnas según el tamaño
                productCard.innerHTML = `
                    <div class="card mb-4">
                        <img src="placeholder.jpg" class="card-img-top" alt="${product.descripcion}">
                        <div class="card-body">
                            <h5 class="card-title">${product.descripcion}</h5>
                            <p class="card-text">Precio: S/${product.precio.toFixed(2)}</p>
                            <p class="card-text">Stock: ${product.stock}</p>
                            <p class="card-text">Venta: S/${product.venta.toFixed(2)}</p>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-primary edit" data-id="${product.codigo}">Editar</button>
                            <button class="btn btn-danger delete" data-id="${product.codigo}">Eliminar</button>
                        </div>
                    </div>
                `;
                productContainer.appendChild(productCard);
            });

            document.querySelectorAll('.edit').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = this.getAttribute('data-id');
                    window.location.href = `editar-producto.html?id=${productId}`;
                });
            });

            document.querySelectorAll('.delete').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = this.getAttribute('data-id');
                    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
                        fetch(`http://192.168.18.18:8080/api/borrarProducto/${productId}`, {
                            method: 'DELETE'
                        })
                            .then(response => {
                                if (response.ok) {
                                    alert('Producto eliminado con éxito');
                                    location.reload();
                                } else {
                                    alert('Error al eliminar el producto');
                                }
                            });
                    }
                });
            });
        });

    document.querySelector('.add-product').addEventListener('click', function() {
        window.location.href = 'agregar-producto.html';
    });
});
