// Función para obtener y mostrar los productos
async function loadProducts() {
    try {
        const response = await fetch('/api/product'); // Asegúrate de que apunte a tu API existente
        const data = await response.json(); // Parsear la respuesta a JSON

        const productList = document.getElementById('product-list'); // Contenedor de los productos

        // Verificar si hay productos en la respuesta
        if (data.products && data.products.length > 0) {
            data.products.forEach(product => {
                // Crear un elemento HTML para cada producto
                const productItem = document.createElement('div');
                productItem.classList.add('product-item');

                productItem.innerHTML = `
                    <h2>${product.title}</h2>
                    <img src="${product.image_url}" alt="${product.title}" style="width:150px;height:auto;"/>
                    <p><strong>Marca:</strong> ${product.brand}</p>
                    <p><strong>Precio:</strong> $${product.price}</p>
                    <p><strong>Almacenamiento:</strong> ${product.storage}</p>
                    <p><strong>Cámara:</strong> ${product.camera}</p>
                    <p><strong>Conectividad:</strong> ${product.connect}</p>
                    <p><strong>RAM:</strong> ${product.ram}</p>
                    <p><strong>Pantalla:</strong> ${product.screen}</p>
                    <p><strong>Garantía:</strong> ${product.warranty}</p>
                    <p><strong>Descripción:</strong> ${product.description}</p>
                `;

                productList.appendChild(productItem); // Agregar el producto al contenedor
            });
        } else {
            productList.innerHTML = '<p>No hay productos disponibles.</p>';
        }
    } catch (error) {
        console.error('Error al cargar los productos:', error);
        document.getElementById('product-list').innerHTML = '<p>Error al cargar los productos.</p>';
    }
}

// Llamar a la función cuando se cargue la página
window.onload = loadProducts;
