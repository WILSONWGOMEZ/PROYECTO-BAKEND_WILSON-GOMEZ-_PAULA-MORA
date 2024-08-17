
    document.addEventListener('DOMContentLoaded', () => {
        // Obtener todos los elementos de producto
        const products = document.querySelectorAll('.product');

        // Función para aplicar filtros
        function applyFilters() {
            // Obtener todos los filtros seleccionados
            const selectedBrands = Array.from(document.querySelectorAll('input[name="brand"]:checked')).map(cb => cb.value);
            const selectedPrices = Array.from(document.querySelectorAll('input[name="price"]:checked')).map(cb => cb.value);
            const selectedStorages = Array.from(document.querySelectorAll('input[name="storage"]:checked')).map(cb => cb.value);
            const selectedCameras = Array.from(document.querySelectorAll('input[name="camera"]:checked')).map(cb => cb.value);
            const selectedConnects = Array.from(document.querySelectorAll('input[name="connect"]:checked')).map(cb => cb.value);
            const selectedRams = Array.from(document.querySelectorAll('input[name="ram"]:checked')).map(cb => cb.value);
            const selectedScreens = Array.from(document.querySelectorAll('input[name="screen"]:checked')).map(cb => cb.value);
            const selectedWarranties = Array.from(document.querySelectorAll('input[name="warranty"]:checked')).map(cb => cb.value);

            // Filtrar los productos
            products.forEach(product => {
                const brand = product.getAttribute('data-brand');
                const price = product.getAttribute('data-price');
                const storage = product.getAttribute('data-storage');
                const camera = product.getAttribute('data-camera');
                const connect = product.getAttribute('data-connect');
                const ram = product.getAttribute('data-ram');
                const screen = product.getAttribute('data-screen');
                const warranty = product.getAttribute('data-warranty');

                const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(brand);
                const matchesPrice = selectedPrices.length === 0 || selectedPrices.includes(price);
                const matchesStorage = selectedStorages.length === 0 || selectedStorages.includes(storage);
                const matchesCamera = selectedCameras.length === 0 || selectedCameras.includes(camera);
                const matchesConnect = selectedConnects.length === 0 || selectedConnects.includes(connect);
                const matchesRam = selectedRams.length === 0 || selectedRams.includes(ram);
                const matchesScreen = selectedScreens.length === 0 || selectedScreens.includes(screen);
                const matchesWarranty = selectedWarranties.length === 0 || selectedWarranties.includes(warranty);

                // Mostrar u ocultar productos según los filtros
                if (matchesBrand && matchesPrice && matchesStorage && matchesCamera && matchesConnect && matchesRam && matchesScreen && matchesWarranty) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        }

        // Agregar evento de cambio a los filtros
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', applyFilters);
        });

        // Aplicar filtros al cargar la página
        applyFilters();
    });
