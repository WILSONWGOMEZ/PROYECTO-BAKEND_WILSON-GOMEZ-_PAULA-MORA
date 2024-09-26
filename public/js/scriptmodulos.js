document.addEventListener('DOMContentLoaded', () => {
    const products = document.querySelectorAll('.product');

    // Función para aplicar filtros
    function applyFilters() {
        const selectedBrands = Array.from(document.querySelectorAll('input[name="brand"]:checked')).map(cb => cb.value);
        const selectedPrices = Array.from(document.querySelectorAll('input[name="price"]:checked')).map(cb => cb.value);
        const selectedStorages = Array.from(document.querySelectorAll('input[name="storage"]:checked')).map(cb => cb.value);
        const selectedCameras = Array.from(document.querySelectorAll('input[name="camera"]:checked')).map(cb => cb.value);
        const selectedConnects = Array.from(document.querySelectorAll('input[name="connect"]:checked')).map(cb => cb.value);
        const selectedRams = Array.from(document.querySelectorAll('input[name="ram"]:checked')).map(cb => cb.value);
        const selectedScreens = Array.from(document.querySelectorAll('input[name="screen"]:checked')).map(cb => cb.value);
        const selectedWarranties = Array.from(document.querySelectorAll('input[name="warranty"]:checked')).map(cb => cb.value);

        products.forEach(product => {
            const brand = product.getAttribute('data-brand');
            const price = parseFloat(product.getAttribute('data-price'));
            const storage = product.getAttribute('data-storage');
            const camera = product.getAttribute('data-camera');
            const connect = product.getAttribute('data-connect');
            const ram = product.getAttribute('data-ram');
            const screen = product.getAttribute('data-screen');
            const warranty = product.getAttribute('data-warranty');

            const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(brand);
            const matchesPrice = selectedPrices.length === 0 || selectedPrices.some(range => {
                const [min, max] = range.split('-').map(Number);
                return isNaN(max) ? price >= min : (price >= min && price <= max);
            });
            const matchesStorage = selectedStorages.length === 0 || selectedStorages.includes(storage);
            const matchesCamera = selectedCameras.length === 0 || selectedCameras.includes(camera);
            const matchesConnect = selectedConnects.length === 0 || selectedConnects.includes(connect);
            const matchesRam = selectedRams.length === 0 || selectedRams.includes(ram);
            const matchesScreen = selectedScreens.length === 0 || selectedScreens.includes(screen);
            const matchesWarranty = selectedWarranties.length === 0 || selectedWarranties.includes(warranty);

            if (matchesBrand && matchesPrice && matchesStorage && matchesCamera && matchesConnect && matchesRam && matchesScreen && matchesWarranty) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });

    applyFilters();

    // Función para abrir el modal
    function openUpdateModal(product) {
        const mongoId = product.getAttribute('data-mongo-id');
        console.log('Abriendo modal para ID:', mongoId); // Debugging

        fetch(`/api/product/${mongoId}`) // Cambiado aquí
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la red');
                }
                return response.json();
            })
            .then(data => {
                console.log('Datos del producto:', data); // Debugging
                document.getElementById('productName').value = data.product.title;
                document.getElementById('productDescription').value = data.product.description;
                document.getElementById('productPrice').value = data.product.price;
                document.getElementById('productRAM').value = data.product.ram;
                document.getElementById('productStorage').value = data.product.storage;
                document.getElementById('productImage').value = data.product.image_url;

                $('#updateModal').data('mongoId', mongoId);
                $('#updateModal').modal('show');
            })
            .catch(error => {
                console.error('Error al obtener el producto:', error);
            });
    }

    // Manejar el formulario de actualización
    document.getElementById('updateForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const mongoId = $('#updateModal').data('mongoId');
        const updatedData = {
            title: document.getElementById('productName').value,
            description: document.getElementById('productDescription').value,
            price: parseFloat(document.getElementById('productPrice').value),
            ram: document.getElementById('productRAM').value,
            storage: document.getElementById('productStorage').value,
            image_url: document.getElementById('productImage').value,
        };

        console.log('Actualizando producto con ID:', mongoId); // Debugging
        console.log('Datos a enviar:', updatedData); // Debugging

        fetch(`/api/product/${mongoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
        .then(response => {
            if (response.ok) {
                $('#updateModal').modal('hide');
                console.log('Producto actualizado correctamente');
                // Aquí podrías actualizar la tarjeta en el DOM si es necesario
            } else {
                console.error('Error al actualizar el producto');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    document.querySelectorAll('.btn-secondary').forEach(button => {
        button.addEventListener('click', function() {
            const product = this.closest('.product');
            openUpdateModal(product);
        });
    });
});
