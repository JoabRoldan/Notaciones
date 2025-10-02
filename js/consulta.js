$(document).ready(() => {
    let contenido = ``;
    let pokemonData = []; 

    function extraer_datos(url) {
        $.ajax({
            url: url,
            success: function (respuesta) {
                let imagenPokemon = respuesta.sprites.other.home.front_default;
                let pokemon = {
                    nombre: respuesta.name,
                    estatura: respuesta.height,
                    habilidades: respuesta.abilities.map(a => a.ability.name),
                    tipos: respuesta.types.map(type => type.type.name),
                    imagen: imagenPokemon
                };

                
                pokemonData.push(pokemon);

                
                contenido += `
                    <div class="col-sm-6 col-md-4 col-lg-3 mb-3">
                        <div class="card">
                            <div class="card-title">
                                <h3 class="text">${pokemon.nombre}</h3>
                            </div>
                            <div class="card-img">
                                <img class="mx-auto d-block" src="${pokemon.imagen}" width="235px">
                            </div>
                            <div class="card-body">
                                <p>Estatura: ${pokemon.estatura}</p>
                                <p>Habilidades: ${pokemon.habilidades.join(', ')}</p>
                                <p>Tipos: ${pokemon.tipos.join(', ')}</p>
                            </div>
                        </div>
                    </div>
                `;
                $('#contenido_pokemon').html(contenido);

                // Cuando tenemos 20 Pokémon, enviamos al backend
                if (pokemonData.length === 20) {
                    enviar_al_backend(pokemonData);
                }
            },
            error: function () {
                $('#contenido_pokemon').html('<p class="text-danger">Error al obtener los datos del Pokémon.</p>');
            }
        });
    }

    function cargar_pokemon(limit = 20) {
        $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon?limit=${limit}`,
            type: "GET",
            success: function (respuesta) {
                contenido = '';  
                pokemonData = []; // Reiniciamos la lista
                let pokemonList = respuesta.results;
                for (let i = 0; i < pokemonList.length; i++) {
                    extraer_datos(pokemonList[i].url);
                }
            },
            error: function () {
                $('#contenido_pokemon').html('<p class="text-danger">Error al cargar los Pokémon.</p>');
            }
        });
    }

    function enviar_al_backend(data) {
        $.ajax({
            url: './public/config/conexion.php', // Endpoint en el backend PHP
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (respuesta) {
                console.log('Datos enviados al backend:', respuesta);
            },
            error: function () {
                console.error('Error al enviar los datos al backend');
            }
        });
    }

    cargar_pokemon();
});
