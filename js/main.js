const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";

// Cargamos los primeros 151 (Primera Generación)
async function traerPokemons() {
    for (let i = 1; i <= 151; i++) {
        const response = await fetch(URL + i);
        const data = await response.json();
        mostrarPokemon(data);
    }
}

function mostrarPokemon(poke) {
    // Procesar tipos
    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    // Formatear ID (001, 010, etc)
    let pokeId = poke.id.toString();
    if (pokeId.length === 1) pokeId = "00" + pokeId;
    else if (pokeId.length === 2) pokeId = "0" + pokeId;

    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
        <div class="pokemon-card card h-100 border-0 shadow-sm p-3">
            <p class="pokemon-id-back">#${pokeId}</p>
            <div class="d-flex justify-content-center">
                <img src="${poke.sprites.other["official-artwork"].front_default}" 
                     class="img-fluid" alt="${poke.name}" style="max-height: 150px; z-index: 2;">
            </div>
            <div class="card-body text-center mt-3">
                <small class="text-muted fw-bold">#${pokeId}</small>
                <h2 class="h5 fw-bold text-uppercase">${poke.name}</h2>
                <div class="d-flex gap-2 justify-content-center my-3">
                    ${tipos}
                </div>
                <div class="d-flex justify-content-around bg-light rounded-pill py-1">
                    <span class="small fw-bold">${poke.height}M</span>
                    <span class="small fw-bold">${poke.weight}KG</span>
                </div>
            </div>
        </div>
    `;
    listaPokemon.append(div);
}

// Lógica de los filtros
botonesHeader.forEach(boton => boton.addEventListener("click", async (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = ""; // Limpiamos la pantalla

    for (let i = 1; i <= 151; i++) {
        const response = await fetch(URL + i);
        const data = await response.json();

        if(botonId === "ver-todos") {
            mostrarPokemon(data);
        } else {
            const tipos = data.types.map(type => type.type.name);
            if (tipos.includes(botonId)) {
                mostrarPokemon(data);
            }
        }
    }
}));

traerPokemons();