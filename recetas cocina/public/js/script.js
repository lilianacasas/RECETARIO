// Función para crear una nueva receta
function crearReceta() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const ingredients = document.getElementById('ingredients').value;
    const instructions = document.getElementById('instructions').value;

    const nuevaReceta = {
        title: title,
        description: description,
        ingredients: ingredients.split(','),
        instructions: instructions.split(',')
    };

    fetch('/api/recetas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevaReceta)
    })
        .then(response => response.json())
        .then(data => {
            alert('Receta creada exitosamente!');
            console.log('Receta creada:', data);
            cargarRecetas(); // Actualiza la lista de recetas después de crear una nueva
        })
        .catch(error => {
            console.error('Error al crear la receta:', error);
        });
}

// Función para cargar y mostrar la lista de recetas
function cargarRecetas() {
    fetch('/api/recetas')
        .then(response => response.json())
        .then(data => {
            const recipesList = document.getElementById('recipes-list');
            recipesList.innerHTML = ''; // Limpiar la lista antes de cargar
            data.forEach(receta => {
                const recetaElement = document.createElement('div');
                recetaElement.innerHTML = `
                    <h3>${receta.title}</h3>
                    <p>${receta.description}</p>
                    <p><strong>Ingredientes:</strong> ${receta.ingredients.join(', ')}</p>
                    <p><strong>Instrucciones:</strong> ${receta.instructions.join(', ')}</p>
                    <button onclick="prepararActualizacion(${receta.id})">Actualizar</button>
                    <button onclick="eliminarReceta(${receta.id})">Eliminar</button>
                `;
                recipesList.appendChild(recetaElement);
            });
        })
        .catch(error => {
            console.error('Error al cargar las recetas:', error);
        });
}

// Función para preparar los datos para actualizar una receta
function prepararActualizacion(id) {
    // Aquí, puedes cargar los datos de la receta seleccionada en los campos del formulario
    // Para ello, primero haremos una solicitud para obtener los detalles de la receta
    fetch(`/api/recetas/${ id }`)
        .then(response => response.json())
        .then(data => {
            // Llenar los campos del formulario con la información de la receta
            document.getElementById('title').value = data.title;
            document.getElementById('description').value = data.description;
            document.getElementById('ingredients').value = data.ingredients.join(', ');
            document.getElementById('instructions').value = data.instructions.join(', ');

            // Cambiar el botón de crear a actualizar
            const crearButton = document.querySelector('#form-crear-receta button[type="submit"]');
            crearButton.textContent = 'Actualizar Receta';
            crearButton.onclick = function () {
                actualizarReceta(id); // Llamar a la función de actualización
            };
        })
        .catch(error => {
            console.error('Error al cargar la receta para actualizar:', error);
        });
}

// Función para actualizar una receta
function actualizarReceta(id) {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const ingredients = document.getElementById('ingredients').value;
    const instructions = document.getElementById('instructions').value;

    const recetaActualizada = {
        title: title,
        description: description,
        ingredients: ingredients.split(','),
        instructions: instructions.split(',')
    };

    fetch(`/api/recetas/${ id }`, { // Asegúrate de usar la URL correcta aquí
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recetaActualizada)
    })
        .then(response => response.json())
        .then(data => {
            alert('Receta actualizada exitosamente!');
            console.log('Receta actualizada:', data);
            cargarRecetas(); // Actualiza la lista de recetas después de actualizar
            resetFormulario(); // Resetea el formulario después de la actualización
        })
        .catch(error => {
            console.error('Error al actualizar la receta:', error);
        });
}

// Función para eliminar una receta
function eliminarReceta(id) {
    if (confirm('¿Estás seguro de que quieres eliminar esta receta?')) {
        fetch(`/api/recetas/${ id }`, { // Asegúrate de usar la URL correcta aquí
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                alert('Receta eliminada exitosamente!');
                console.log('Receta eliminada:', data);
                cargarRecetas(); // Actualiza la lista de recetas después de eliminar
            })
            .catch(error => {
                console.error('Error al eliminar la receta:', error);
            });
    }
}

// Función para registrar un nuevo usuario
function registrarUsuario() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const nuevoUsuario = {
        name: name,
        email: email,
        password: password
    };

    fetch('/api/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoUsuario)
    })
        .then(response => response.json())
        .then(data => {
            alert('Usuario registrado exitosamente!');
            console.log('Usuario registrado:', data);
        })
        .catch(error => {
            console.error('Error al registrar el usuario:', error);
        });
}

// Función para actualizar un usuario
function actualizarUsuario(id) {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const usuarioActualizado = {
        name: name,
        email: email,
        password: password
    };

    fetch(`/api/usuarios/${ id }`, { // Asegúrate de usar la URL correcta aquí
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuarioActualizado)
    })
        .then(response => response.json())
        .then(data => {
            alert('Usuario actualizado exitosamente!');
            console.log('Usuario actualizado:', data);
        })
        .catch(error => {
            console.error('Error al actualizar el usuario:', error);
        });
}

// Función para resetear el formulario después de la actualización
function resetFormulario() {
    document.getElementById('form-crear-receta').reset();
    const crearButton = document.querySelector('#form-crear-receta button[type="submit"]');
    crearButton.textContent = 'Crear Receta'; // Resetear el texto del botón
    crearButton.onclick = crearReceta; // Resetear la función onclick al original
}

// Cargar recetas al iniciar la página
window.onload = cargarRecetas;