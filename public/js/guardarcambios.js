// Evento para manejar el envío del formulario
$('#updateForm').on('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    // Obtener el ID del producto desde los datos del formulario
    const productId = $(this).data('id');

    // Recoger los datos del formulario
    const updatedProduct = {
        name: $('#productName').val(),
        description: $('#productDescription').val(),
        price: $('#productPrice').val(),
        ram: $('#productRAM').val(),
        storage: $('#productStorage').val(),
        imageUrl: $('#productImage').val()
    };

    // Enviar los datos actualizados al servidor
    $.ajax({
        url: `/api/products/${productId}`,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(updatedProduct),
        success: function() {
            $('#updateModal').modal('hide');
            console.log('Producto actualizado correctamente');
            
            // Llamar a loadProducts para recargar la lista de productos
            loadProducts();
        },
        error: function(err) {
            console.error('Error al actualizar el producto:', err);
        }
    });
});
