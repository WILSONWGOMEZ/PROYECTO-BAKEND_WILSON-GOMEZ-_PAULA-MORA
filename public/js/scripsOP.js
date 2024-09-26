function enviarOpiniones() {
    // Obtener los valores de los campos de entrada
    var productName = document.getElementById('productNameInput').value;
    var opinion = document.getElementById('opinionInput').value;
    var suggestion = document.getElementById('suggestionInput').value;
    var websiteFeedback = document.getElementById('websiteInput').value;

    // Validación básica
    if (!productName || !opinion || !suggestion || !websiteFeedback) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    // Crear un objeto con las opiniones
    var opiniones = {
        productName: productName,
        opinion: opinion,
        suggestion: suggestion,
        website: websiteFeedback
    };

    // Obtener opiniones almacenadas en localStorage
    var storedOpiniones = JSON.parse(localStorage.getItem("opiniones")) || [];

    // Agregar la nueva opinión al arreglo
    storedOpiniones.push(opiniones);

    // Guardar el arreglo actualizado en localStorage
    localStorage.setItem("opiniones", JSON.stringify(storedOpiniones));

    // Limpiar los campos después de enviar
    document.getElementById('productNameInput').value = '';
    document.getElementById('opinionInput').value = '';
    document.getElementById('suggestionInput').value = '';
    document.getElementById('websiteInput').value = '';

    // Redirigir a Opiniones.html
    window.location.href = 'Opiniones.html';
}
