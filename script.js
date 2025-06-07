const imagenesPorCarrusel = {
        bmw: ["imgs/BMW M4 2020.jpeg", "imgs/BMW dorado.jpeg", "imgs/BMW azul.jpeg"],
        camaro: ["imgs/Camaro.avif", "imgs/Camaro Rojo.avif", "imgs/Camaro Blanco.avif"],
        honda: ["imgs/Honda civic Si 2015.JPG", "imgs/Honda civic negro.jpg", "imgs/Honda civic blanco.jpg"],
        hyundai: ["imgs/Hyundai Accent 2017.avif", "imgs/Hyundai Azul.jpeg", "imgs/Hyundai gris.jpeg"],
        mazda: ["imgs/Mazda 2014.jpeg", "imgs/Mazda gris.jpeg", "imgs/Mazda rojo.jpeg"],
        yaris: ["imgs/Toyota Yaris 2024.jpg", "imgs/Toyota Yaris azul.jpeg", "imgs/Toyota Yaris rojo.jpeg"]
    }
   
const indiceActualPorCarrusel = {
     bmw: 0,
     camaro: 0,
     honda: 0,
     hyundai: 0,
     mazda: 0,
     yaris: 0
};

window.cambiarImagen = function(carruselId, direccion) {
    indiceActualPorCarrusel[carruselId] += direccion;

    const totalImagenes = imagenesPorCarrusel[carruselId].length;

    if (indiceActualPorCarrusel[carruselId] >= totalImagenes) {
        indiceActualPorCarrusel[carruselId] = 0;
    } else if (indiceActualPorCarrusel[carruselId] < 0) {
        indiceActualPorCarrusel[carruselId] = totalImagenes - 1;
    }

    const nuevoIndice = indiceActualPorCarrusel[carruselId];
    const carrusel = document.querySelector(`[data-carrusel="${carruselId}"]`);
    const imagen = carrusel.querySelector('.imagen-producto');

    imagen.src = imagenesPorCarrusel[carruselId][nuevoIndice];
    imagen.alt = `Imagen ${nuevoIndice + 1} del ${carruselId}`;

    imagen.style.opacity = 0;
        setTimeout(() => {
            imagen.style.opacity = 2;
        }, 50);
};


window.cantidad = 1;
window.elementoCantidad = document.querySelector('.cantidad');
window.carritoCount = document.getElementById('carrito-count');


window.modificarCantidad = function(cambio) {
    window.cantidad = Math.max(1, Math.min(99, window.cantidad + cambio));
    if (window.elementoCantidad) {
        window.elementoCantidad.textContent = window.cantidad;
    }
};

window.Comprar = function() {
    const producto = document.querySelector('.product');

    if(!producto) {
        alert("Error: No se encontro el producto");
        return;
    }

    const nombre = producto.querySelector('h3')?.textContent || "Producto Generico";
    const precio = producto.querySelector('span')?.textContent || "Precio no disponible";

    alert(`✅ Added to cart:\n${nombre}\n${precio}`)
};

document.querySelector('.chatbot-icon').addEventListener('click', () =>{
    const chatContainer = document.querySelector('.chat-container');
    chatContainer.style.display = chatContainer.style.display === 'block' ? 'none' : 'block';
});

document.querySelectorAll('.chat-options button').forEach(button => {
    button.addEventListener('click', () => {
        const mensajes = document.querySelector('.chat-messages');
        const userOption = button.textContent;

        const userMsg = document.createElement('div');
        userMsg.className = 'message user';
        userMsg.textContent = userOption;
        mensajes.appendChild(userMsg);

        const botMsg = document.createElement('div');
        botMsg.className = 'message bot';

        const tipo = button.getAttribute('data-option');
        if(tipo === 'precios'){
            botMsg.textContent = "Our vehicles have a variety of prices. Check the catalog for more details.";
        }else if (tipo === 'cita'){
            botMsg.textContent = "Perfect! Text us at WhatsApp 5612-8753 to schedule your appointment.";
        }else if (tipo === 'info'){
            botMsg.textContent = "We offer accessories, car washes, and mechanics. Visit the services section for more information.";
        }

        mensajes.appendChild(botMsg);
        mensajes.scrollTop = mensajes.scrollHeight;
    })
})