const API_URL = 'https://pokeapi.co/api/v2/pokemon';

const formulario = document.getElementById('formBuscar');
const btnBuscar = document.getElementById('btnBuscar');
const inputNombre = document.getElementById('inputNombre');
const resultado = document.getElementById('resultado');

// Colores por tipo de Pokémon
const COLORES_TIPO = {
    normal: '#a8a77a',
    fire: '#ee8130',
    water: '#6390f0',
    electric: '#f7d02c',
    grass: '#7ac74c',
    ice: '#96d9d6',
    fighting: '#c22e28',
    poison: '#a33ea1',
    ground: '#e2bf65',
    flying: '#a98ff3',
    psychic: '#f95587',
    bug: '#a6b91a',
    rock: '#b6a136',
    ghost: '#735797',
    dragon: '#6f35fc',
    dark: '#705746',
    steel: '#b7b7ce',
    fairy: '#d685ad'
};

// Traducción de tipos al español
const TIPOS_ES = {
    normal: 'Normal',
    fire: 'Fuego',
    water: 'Agua',
    electric: 'Eléctrico',
    grass: 'Planta',
    ice: 'Hielo',
    fighting: 'Lucha',
    poison: 'Veneno',
    ground: 'Tierra',
    flying: 'Volador',
    psychic: 'Psíquico',
    bug: 'Bicho',
    rock: 'Roca',
    ghost: 'Fantasma',
    dragon: 'Dragón',
    dark: 'Siniestro',
    steel: 'Acero',
    fairy: 'Hada'
};

// Traducción de estadísticas al español
const STATS_ES = {
    hp: 'PS',
    attack: 'Ataque',
    defense: 'Defensa',
    'special-attack': 'At. especial',
    'special-defense': 'Def. especial',
    speed: 'Velocidad'
};

const STAT_MAXIMO = 255;

/* ---------- Eventos ---------- */

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    buscarPokemon(inputNombre.value);
});

document.querySelectorAll('.chip').forEach((chip) => {
    chip.addEventListener('click', () => {
        inputNombre.value = chip.dataset.nombre;
        buscarPokemon(chip.dataset.nombre);
    });
});

/* ---------- Lógica principal ---------- */

async function buscarPokemon(entrada) {
    const nombre = entrada.toLowerCase().trim();

    if (!nombre) return;

    mostrarCargando();
    btnBuscar.disabled = true;

    try {
        const respuesta = await fetch(`${API_URL}/${encodeURIComponent(nombre)}`);

        if (respuesta.status === 404) {
            throw new Error(`No encontramos ningún Pokémon llamado "${entrada.trim()}". Revisa el nombre e inténtalo de nuevo.`);
        }

        if (!respuesta.ok) {
            throw new Error('El servicio no está disponible en este momento. Inténtalo más tarde.');
        }

        const datos = await respuesta.json();
        mostrarPokemon(datos);
    } catch (error) {
        const mensaje = error instanceof TypeError
            ? 'No hay conexión con el servidor. Verifica tu internet.'
            : error.message;
        mostrarError(mensaje);
    } finally {
        btnBuscar.disabled = false;
    }
}

/* ---------- Renderizado ---------- */

function mostrarCargando() {
    resultado.innerHTML = `
        <div class="estado" role="status">
            <div class="spinner"></div>
            <span>Buscando Pokémon…</span>
        </div>
    `;
}

function mostrarError(mensaje) {
    resultado.innerHTML = `
        <div class="estado estado--error" role="alert">
            <span class="estado__icono" aria-hidden="true">⚠️</span>
            <span>${escaparHTML(mensaje)}</span>
        </div>
    `;
}

function mostrarPokemon(datos) {
    const tipoPrincipal = datos.types[0].type.name;
    const colorPrincipal = COLORES_TIPO[tipoPrincipal] || '#94a3b8';

    const tipos = datos.types
        .map(({ type }) => `
            <span class="tipo" style="--color-tipo: ${COLORES_TIPO[type.name] || '#94a3b8'}">
                ${TIPOS_ES[type.name] || type.name}
            </span>`)
        .join('');

    const pesoKg = (datos.weight / 10).toFixed(1);
    const alturaM = (datos.height / 10).toFixed(1);

    const imagen = datos.sprites.other?.['official-artwork']?.front_default
        || datos.sprites.front_default
        || '';

    const stats = datos.stats
        .map(({ base_stat, stat }) => {
            const porcentaje = Math.min((base_stat / STAT_MAXIMO) * 100, 100).toFixed(0);
            return `
                <div class="stat">
                    <span class="stat__nombre">${STATS_ES[stat.name] || stat.name}</span>
                    <span class="stat__valor">${base_stat}</span>
                    <div class="stat__barra">
                        <div class="stat__relleno" style="--ancho: ${porcentaje}%"></div>
                    </div>
                </div>`;
        })
        .join('');

    resultado.innerHTML = `
        <article class="tarjeta" style="--tipo-color: ${colorPrincipal}">
            <div class="tarjeta__cabecera">
                <span class="tarjeta__numero">N.º ${String(datos.id).padStart(3, '0')}</span>
                <h2 class="tarjeta__nombre">${escaparHTML(datos.name)}</h2>
                <img class="tarjeta__imagen" src="${imagen}" alt="Imagen de ${escaparHTML(datos.name)}">
            </div>
            <div class="tarjeta__cuerpo">
                <div class="tipos">${tipos}</div>

                <div class="medidas">
                    <div class="medida">
                        <span class="medida__valor">${pesoKg} kg</span>
                        <span class="medida__etiqueta">Peso</span>
                    </div>
                    <div class="medida">
                        <span class="medida__valor">${alturaM} m</span>
                        <span class="medida__etiqueta">Altura</span>
                    </div>
                </div>

                <h3 class="stats__titulo">Estadísticas base</h3>
                ${stats}
            </div>
        </article>
    `;
}

/* ---------- Utilidades ---------- */

function escaparHTML(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}