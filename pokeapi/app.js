const btnBuscar = document.getElementById('btnBuscar');
const inputNombre = document.getElementById('inputNombre');
const resultado = document.getElementById('resultado');

btnBuscar.addEventListener('click', async () => {
    const nombre = inputNombre.value.toLowerCase().trim();

    if (!nombre) return;

    resultado.innerHTML = 'Buscando...';

    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);

        if (!respuesta.ok) {
            throw new Error('Pokemon no encontrado');
        }

        const datos = await respuesta.json();

        mostrarPokemon(datos);
    } catch (error) {
        resultado.innerHTML = `<p>❌ ${error.message}</p>`;
    }
});

function mostrarPokemon(datos) {
    const tipos = datos.types.map(t => t.type.name).join(', ');

    const pesoKg = (datos.weight / 10).toFixed(1);
    const alturaM = (datos.height / 10).toFixed(1);

    resultado.innerHTML = `
        <div class="tarjeta">
            <h2>${datos.name.toUpperCase()}</h2>
            <img src="${datos.sprites.front_default}" alt="${datos.name}">
            <p><strong>Tipo:</strong> ${tipos}</p>
            <p><strong>Peso:</strong> ${pesoKg} kg</p>
            <p><strong>Altura:</strong> ${alturaM} m</p>
        </div>
    `;
}